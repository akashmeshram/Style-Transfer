import { EventEmitter } from 'events';
import { contentImageId, styleImageId, canvasId } from './config';

class Machine extends EventEmitter {
  constructor() {
    super();

    this.predictionModel = null;
    this.transformModel = null;
    this.style = document.getElementById(styleImageId);
    this.content = document.getElementById(contentImageId);
    this.canvas = document.getElementById(canvasId);
    this.contentBlending = 1.0;

    this.loadModels();
  }

  async loadModels() {
    this.emit('models-loading');
    this.predictionModel = await tf.loadGraphModel('models/prediction/model.json');
    this.transformModel = await tf.loadGraphModel('models/transform/model.json');
    this.emit('models-loaded');
  }

  async applyStyle() {
    await tf.nextFrame();
    const styleBottleneck = await this.runStylePredict();
    const stylizedImage = await this.runStyleTransform(styleBottleneck);
    this.displayOutput(stylizedImage)
    styleBottleneck.dispose(); 
    stylizedImage.dispose();
  }

  async runStylePredict() {
    this.emit('style-loading');
    await tf.nextFrame();
    const bottleneck = await tf.tidy(() => {
      return this.predictionModel.predict(tf.browser.fromPixels(this.style).toFloat().div(tf.scalar(255)).expandDims());
    })
    return (this.contentBlending !== 1.0) ? await this.blendContentStyle(bottleneck) : bottleneck;
  }

  async blendContentStyle(styleBottleneck) {
    this.emit('style-blending');
    await tf.nextFrame();
    const contentBottleneck  = await tf.tidy(() => {
      return this.predictionModel.predict(tf.browser.fromPixels(this.content).toFloat().div(tf.scalar(255)).expandDims());
    })
    const styleBottleneckBlended = await tf.tidy(() => {
      const styleBottleneckScaled = tf.mul(styleBottleneck, tf.scalar(this.contentBlending));
      const contentBottleneckScaled = tf.mul(contentBottleneck , tf.scalar(1.0-this.contentBlending));
      return tf.add(styleBottleneckScaled, contentBottleneckScaled)
    })
    styleBottleneck.dispose();
    contentBottleneck.dispose();
    return styleBottleneckBlended;
  }

  async runStyleTransform(styleBottleneck) {
    this.emit('style-transforming');
    await tf.nextFrame();
    const stylized = await tf.tidy(() => {
      return this.transformModel.predict([tf.browser.fromPixels(this.content).toFloat().div(tf.scalar(255)).expandDims(), styleBottleneck]).squeeze();
    })
    return stylized;
  }

  async displayOutput(image) {
    this.emit('style-complete');
    await tf.browser.toPixels(image, this.canvas);
  }

  set styleStrength(val) {
    this.contentBlending = val;
  }

  set styleImage(imgId) {
    this.style = document.getElementById(imgId);
  }
}

export default Machine;