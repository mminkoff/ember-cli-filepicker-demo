import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  imageReceived: function (InkBlob) {
    this.set('imageUrl', InkBlob.url);
    this.set('filename', InkBlob.filename);
    this.set('size', Math.round((InkBlob.size / 1024 + 0.00001) * 100) / 100);
  },

  sizeReceived: function (metadata) {
    this.set('width', metadata.width);
    this.set('height', metadata.height);
  },

  // computed properties to get converted images
  thumbImageUrl: (function () {
    // tack on conversion properties for small image
    var params = {};
    params = this.addWidth(params, 50);
    params = this.addHeight(params, 50);
    return this.buildUrl(this.get('imageUrl'), params);
  }).property('imageUrl'),

  mediumImageUrl: (function () {
    // tack on conversion properties for cacheable
    // medium image watermarked with Ink's logo
    var params = {};
    params = this.addHeight(params, 150);
    params = this.addWatermark(params);
    return this.buildUrl(this.get('imageUrl'), params);
  }).property('imageUrl'),

  // the width to use for a mediumImage
  // so it holds its place before the image itself is loaded
  mediumWidth: (function () {
    return Math.round(this.get('width') * 150 / this.get('height'));
  }).property('width'),

  buildUrl: function (originalUrl, params) {
    params.rotate = 'exif';
    params.cache = true;
    return originalUrl + '/convert?' + Ember.$.param(params);
  },

  addWidth: function (params, width) {
    params.w = width;
    return params;
  },

  addHeight: function (params, height) {
    params.h = height;
    return params;
  },

  addWatermark: function (params, watermarkUrl) {
    params.watermark = watermarkUrl ||  'https://www.filepicker.io/api/file/9IphiAATxeAnAbHJDhe3';
    params.waterposition = 'bottom,right';
    return params;
  }
});
