import { MNIST_DATA_URL, MNIST_LABELS_URL } from 'constants/api';
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

export const fetchMNISTLabels = () =>
  fetch(MNIST_LABELS_URL)
    .then((response) => response.arrayBuffer())
    .then((buffer) => new Uint8Array(buffer));

/**
 * Create shuffled indices into the train/test set for when we select a
 * random dataset element for training / validation.
 */
export const getIndices = () => {
  const trainIndices = util.createShuffledIndices(NUM_MNIST_TRAIN_ELEMENTS);
  const testIndices = util.createShuffledIndices(NUM_MNIST_TEST_ELEMENTS);
  return { trainIndices, testIndices };
};

export const getTrainTestLabels = (labels) => {
  const NUM_CLASSES = 10;
  const lastTrainLableIndex = NUM_CLASSES * NUM_MNIST_TRAIN_ELEMENTS;
  const trainLabels = labels.slice(0, lastTrainLableIndex);
  const testLabels = labels.slice(lastTrainLableIndex);
  return { trainLabels, testLabels };
};
/**
 * Slice the the images into train and test sets.
 */
export const getTrainTestImages = (data) => {
  const lastTrainImageIndex = MNIST_IMAGE_SIZE * NUM_MNIST_TRAIN_ELEMENTS;
  const trainImages = data.slice(0, lastTrainImageIndex);
  const testImages = data.slice(lastTrainImageIndex);
  return { trainImages, testImages };
};

export const getDataBatch = ({
  batchSize,
  images,
  indices,
  initIndex,
  labels,
}) => {
  if (Number.isNaN(Number(batchSize))) {
    throw Error('Размер партии должен быть числом');
  }
  let index = initIndex;
  const dataBatch = tidy(() => {
    const { data, labels: selectedLabels } = nextBatch(
      Number(batchSize),
      [images, labels],
      () => {
        index = (index + 1) % indices.length;
        return indices[index];
      }
    );
    return {
      data: data.reshape([Number(batchSize), 28, 28, 1]),
      labels: selectedLabels,
    };
  });
  return {
    batch: dataBatch,
    lastIndex: index,
  };
};

const nextBatch = (batchSize, [data, labels], getIndex) => {
  const NUM_CLASSES = 10;
  const batchImagesArray = new Float32Array(batchSize * MNIST_IMAGE_SIZE);
  const batchLabelsArray = new Uint8Array(batchSize * NUM_CLASSES);

  for (let i = 0; i < batchSize; i += 1) {
    const idx = getIndex();
    const image = data.slice(
      idx * MNIST_IMAGE_SIZE,
      idx * MNIST_IMAGE_SIZE + MNIST_IMAGE_SIZE
    );
    const label = labels.slice(
      idx * NUM_CLASSES,
      idx * NUM_CLASSES + NUM_CLASSES
    );
    batchLabelsArray.set(label, i * NUM_CLASSES);
    batchImagesArray.set(image, i * MNIST_IMAGE_SIZE);
  }
  return {
    data: tensor2d(batchImagesArray, [batchSize, MNIST_IMAGE_SIZE]),
    labels: tensor2d(batchLabelsArray, [batchSize, NUM_CLASSES]),
  };
};
