import { MNIST_DATA_URL } from 'constants/api';
import {
  MNIST_IMAGE_SIZE,
  NUM_MNIST_DATASET_ELEMENTS,
  NUM_MNIST_TRAIN_ELEMENTS,
  NUM_MNIST_TEST_ELEMENTS,
} from 'constants/data';
import { util, tensor2d, tidy } from '@tensorflow/tfjs';

export const fetchMNISTData = () => {
  const img = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  return new Promise((resolve) => {
    img.crossOrigin = '';
    img.onload = () => {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;

      const datasetBytesBuffer = new ArrayBuffer(
        NUM_MNIST_DATASET_ELEMENTS * MNIST_IMAGE_SIZE * 4
      );

      const chunkSize = 5000;
      canvas.width = img.width;
      canvas.height = chunkSize;

      for (let i = 0; i < NUM_MNIST_DATASET_ELEMENTS / chunkSize; i += 1) {
        const datasetBytesView = new Float32Array(
          datasetBytesBuffer,
          i * MNIST_IMAGE_SIZE * chunkSize * 4,
          MNIST_IMAGE_SIZE * chunkSize
        );
        ctx.drawImage(
          img,
          0,
          i * chunkSize,
          img.width,
          chunkSize,
          0,
          0,
          img.width,
          chunkSize
        );

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let j = 0; j < imageData.data.length / 4; j += 1) {
          // All channels hold an equal value since the image is grayscale, so
          // just read the red channel.
          datasetBytesView[j] = imageData.data[j * 4] / 255;
        }
      }
      // this.datasetImages = new Float32Array(datasetBytesBuffer);

      resolve(new Float32Array(datasetBytesBuffer));
    };
    img.src = MNIST_DATA_URL;
  });
};

/**
 * Create shuffled indices into the train/test set for when we select a
 * random dataset element for training / validation.
 */
export const getIndices = () => {
  const trainIndices = util.createShuffledIndices(NUM_MNIST_TRAIN_ELEMENTS);
  const testIndices = util.createShuffledIndices(NUM_MNIST_TEST_ELEMENTS);
  return { trainIndices, testIndices };
};

/**
 * Slice the the images and labels into train and test sets.
 */
export const getTrainTestData = (data) => {
  const trainImages = data.slice(
    0,
    MNIST_IMAGE_SIZE * NUM_MNIST_TRAIN_ELEMENTS
  );
  const testImages = data.slice(MNIST_IMAGE_SIZE * NUM_MNIST_TRAIN_ELEMENTS);
  return { trainImages, testImages };
};

export const getDataBatch = ({
  batchSize,
  testImages,
  testIndices,
  initIndex,
}) => {
  let shuffledTestIndex = initIndex;
  const dataBatch = tidy(() => {
    const data = nextBatch(+batchSize, testImages, () => {
      shuffledTestIndex = (shuffledTestIndex + 1) % testIndices.length;
      return testIndices[shuffledTestIndex];
    });
    return data.reshape([+batchSize, 28, 28, 1]);
  });
  return {
    batch: dataBatch,
    shuffledTestIndex,
  };
};

const nextBatch = (batchSize, data, getIndex) => {
  const batchImagesArray = new Float32Array(batchSize * MNIST_IMAGE_SIZE);

  for (let i = 0; i < batchSize; i += 1) {
    const idx = getIndex();
    const image = data.slice(
      idx * MNIST_IMAGE_SIZE,
      idx * MNIST_IMAGE_SIZE + MNIST_IMAGE_SIZE
    );
    batchImagesArray.set(image, i * MNIST_IMAGE_SIZE);
  }
  return tensor2d(batchImagesArray, [batchSize, MNIST_IMAGE_SIZE]);
};
