import { layers, input, model } from '@tensorflow/tfjs';
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

export const createDecoder = (layersOptions) => {
  const lastIndex = layersOptions.length - 1;
  const inputLayer = input({ shape: layersOptions[lastIndex].units });
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

export const createAutoencoder = (layersOptions) => {
  const { encoder, inputLayer } = createEncoder(layersOptions);
  const { decoder } = createDecoder(layersOptions);
  const autoencoder = model({
    inputs: inputLayer,
    outputs: decoder.apply(encoder.apply(inputLayer)),
    name: 'autoencoder',
  });
  autoencoder.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
  autoencoder.summary();
  return { autoencoder, encoder, decoder };
};

export const createDenseLayer = ({ units, act }) =>
  layers.dense({ units, activation: act });

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

export const trainModel = ({ nn, trainData, testData, epochs, batchSize }) => {
  const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  const container = { name: 'Model Training' };
  const fitCallbacks = show.fitCallbacks(container, metrics);

  return nn.fit(trainData, trainData, {
    batchSize,
    validationData: [testData, testData],
    epochs,
    shuffle: true,
    callbacks: fitCallbacks,
    // callbacks: {
    //   onEpochEnd: (epoch, log) => {
    //     console.log('epoch', epoch, 'log', log);
    //   },
    // },
  });
};
