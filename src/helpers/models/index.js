import { layers, input, model, tidy, browser } from '@tensorflow/tfjs';
import { show } from '@tensorflow/tfjs-vis';

export const createEncoder = (layersOptions) => {
  const inputLayer = input({ shape: [28, 28, 1] });
  const flattenImg = layers.flatten().apply(inputLayer);
  const stackOfLayers = createStackOfLayers(
    flattenImg,
    layersOptions,
    0,
    (index) => index + 1
  );
  const encoder = model({
    inputs: inputLayer,
    outputs: stackOfLayers,
    name: 'encoder',
  });
  return { inputLayer, encoder };
};

export const createClassifier = (layersOptions) => {
  const inputLayer = input({ shape: [28, 28, 1] });
  const flattenImg = layers.flatten().apply(inputLayer);
  const stackOfLayers = createStackOfLayers(
    flattenImg,
    layersOptions,
    0,
    (index) => index + 1
  );
  const classificationLayer = layers
    .dense({ units: 10, activation: 'softmax' })
    .apply(stackOfLayers);
  const classifier = model({
    inputs: inputLayer,
    outputs: classificationLayer,
    name: 'classifier',
  });
  classifier.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });
  return { classifier, inputLayer };
};

export const createDecoder = (layersOptions) => {
  const lastIndex = layersOptions.length - 1;
  const inputLayer = input({ shape: Number(layersOptions[lastIndex].units) });
  const stackOfLayers = createStackOfLayers(
    inputLayer,
    layersOptions,
    lastIndex - 1,
    (index) => index - 1
  );
  const flattenDecoded = layers
    .dense({ units: 28 * 28, activation: 'relu' })
    .apply(stackOfLayers);
  const decoderLayers = layers
    .reshape({ targetShape: [28, 28, 1] })
    .apply(flattenDecoded);
  const decoder = model({
    inputs: inputLayer,
    outputs: decoderLayers,
    name: 'decoder',
  });
  return { decoder, inputLayer };
};

/**
 * TODO delete comments
 */
export const createAutoencoder = (layersOptions) => {
  const { encoder, inputLayer } = createEncoder(layersOptions);
  const { decoder } = createDecoder(layersOptions);
  const autoencoder = model({
    inputs: inputLayer,
    outputs: decoder.apply(encoder.apply(inputLayer)),
    name: 'autoencoder',
  });
  console.log('encoder');
  encoder.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
  encoder.summary();
  console.log('decoder');
  decoder.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
  decoder.summary();
  console.log('autoencoder', autoencoder);
  autoencoder.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
  autoencoder.summary();
  // console.log('autoencoder', autoencoder.layers);
  // console.log('decoder', decoder.layers);
  // console.log('encoder', encoder.layers);
  return { autoencoder, encoder, decoder };
};

export const createDenseLayer = ({ units, act }) => {
  const layer = layers.dense({
    units: Number(units),
    activation: act,
  });
  // console.log(layer.getWeights());
  return layer;
};

export const createStackOfLayers = (
  inputLayer,
  layersOptions,
  index,
  getNewIndex
) => {
  const layerOptions = layersOptions[index];
  if (layerOptions && Object.values(layerOptions).length) {
    const layer = createDenseLayer(layerOptions).apply(inputLayer);
    const newIndex = getNewIndex(index);
    return createStackOfLayers(layer, layersOptions, newIndex, getNewIndex);
  }
  return inputLayer;
};

export const trainModel = ({
  nn,
  trainData,
  testData,
  epochs,
  batchSize,
  stopTraining,
}) => {
  if (Number.isNaN(Number(epochs)) || Number.isNaN(Number(batchSize))) {
    throw Error('Количество эпох и размер партии должны быть числом');
  }
  const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  const container = { name: 'Model Training' };
  const fitCallbacks = show.fitCallbacks(container, metrics);

  return nn.fit(trainData, trainData, {
    batchSize: Number(batchSize),
    validationData: [testData, testData],
    epochs: Number(epochs),
    shuffle: true,
    callbacks: [
      {
        onEpochEnd() {
          stopTraining(nn);
        },
      },
      fitCallbacks,
    ],
  });
};

export const trainClassifier = ({
  nn,
  trainLabels,
  testLabels,
  trainImage,
  testImage,
  stopTraining,
}) => {
  const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  const container = { name: 'Model Training' };
  const fitCallbacks = show.fitCallbacks(container, metrics);

  return nn.fit(trainImage, trainLabels, {
    batchSize: 256,
    validationData: [testImage, testLabels],
    epochs: 10,
    shuffle: true,
    callbacks: [
      {
        onEpochEnd() {
          stopTraining(nn);
        },
      },
      fitCallbacks,
    ],
  });
};

export async function doPrediction(currentModel, data) {
  const preds = currentModel.predict(data);
  return preds;
}

export async function display(
  examples,
  container,
  controledLabels,
  predictedLables
) {
  // Количество изображений, которое нужно вывести на экран
  const preparedControledLabels = await getArrayOfLabels(controledLabels);
  console.log('preparedControlLabels', preparedControledLabels);
  // console.log('')
  const preparedPredictedLabels = predictedLables
    ? await getArrayOfLabels(predictedLables)
    : [];
  const numExamples = examples.shape[0];
  // Create a canvas element to render each example
  for (let i = 0; i < numExamples; i += 1) {
    const imageTensor = tidy(() =>
      // Reshape the image to 28x28 px
      examples.slice([i, 0], [1, examples.shape[1]]).reshape([28, 28, 1])
    );
    const isEqual = preparedPredictedLabels[i] === preparedControledLabels[i];
    // eslint-disable-next-line
    const backgroundLabelColor = predictedLables
      ? isEqual
        ? '#93e793'
        : '#ffbfbf'
      : '#fff';
    const div = document.createElement('div');
    div.style = 'display: inline-block';
    container.appendChild(div);
    const label = document.createElement('div');
    label.style = `display: flex; align-items: center; justify-content: center; background-color: ${backgroundLabelColor}`;
    // eslint-disable-next-line
    label.innerHTML = predictedLables
      ? isEqual
        ? preparedPredictedLabels[i]
        : `${preparedPredictedLabels[i]} (${preparedControledLabels[i]})`
      : preparedControledLabels[i];
    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    canvas.style = 'margin: 4px; margin-bottom: 0px;';
    // eslint-disable-next-line
    await browser.toPixels(imageTensor.clipByValue(0, 1), canvas);
    div.appendChild(canvas);
    div.appendChild(label);
    imageTensor.dispose();
  }
}
async function getArrayOfLabels(tensor) {
  const arrays = await tensor.array();
  return arrays.map((array) => array.indexOf(Math.max(...array)));
}

export async function drawPixels(tensor, container) {
  const simpleImageTensor = tidy(() =>
    tensor
      .slice([0, 0], [1, tensor.shape[1]])
      .clipByValue(0, 1)
      .reshape([tensor.shape[1]])
  );
  tensor.dispose();
  const arrayOfPixels = await simpleImageTensor.array();
  drapPixel(container, arrayOfPixels);
  console.log('array', arrayOfPixels);
}

const drapPixel = (container, pixels) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  pixels.forEach((pixel, i) => {
    const r = Math.round(pixel * 255);
    const g = Math.round(pixel * 255);
    const b = Math.round(pixel * 255);
    const a = 255;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a}`;
    ctx.fillRect(i * 10, 0, 10, 10);
  });
  container.appendChild(canvas);
};
