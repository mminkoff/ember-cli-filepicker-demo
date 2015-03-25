import Ember from 'ember';
// import DS from 'ember-data';
// import filepicker from 'ember-cli-filepicker';
// import InkFilepickerImage from '../models/ink-filepicker-image';

export default Ember.ArrayController.extend({
  errors: [],

  imageOptions: {
    mimetypes: ['image/*'],
    services: ['COMPUTER', 'IMAGE_SEARCH', 'WEBCAM', 'FACEBOOK', 'GMAIL', 'BOX', 'DROPBOX', 'FLICKR', 'PICASA', 'INSTAGRAM']
  },

  textOptions: {
    mimetypes: ['text/plain'],
    services: ['BOX', 'COMPUTER', 'DROPBOX', 'EVERNOTE', 'FTP', 'GITHUB', 'GOOGLE_DRIVE', 'SKYDRIVE', 'WEBDAV', 'GMAIL', 'URL']
  },

  actions: {
    pickWithFilepicker: function() {
      this.set('openPicker',true);
    },

    fileSelected: function(InkBlob){
      var _this = this;
      var newImg;

      newImg = this.store.createRecord('InkFilepickerImage', {ready: false});
      newImg.imageReceived(InkBlob);
      this.get('model').pushObject(newImg);
      this.set('selectedImage', newImg);
      this.send('filepickerClosed');

      filepicker.stat(InkBlob,
        {width: true, height: true},
        function (metadata) {
          newImg.sizeReceived(metadata);
          newImg.set('ready', true);
        },
        function (FPError) {
          // unless dialog closed by user
          if (FPError.code !== 101) {
            _this.get('errors').pushObject(FPError.toString());
          }
        }
      );
    },

    filepickerError: function (FPError) {
      // unless dialog closed by user
      if (FPError.code !== 101) {
        this.get('errors').pushObject(FPError.toString());
      }
    },

    filepickerClosed: function () {
      this.set('openPicker',false);
    },

    clearErrors: function () {
      this.get('errors').clear();
    },

    setSelected: function (newSelection) {
      this.set('selectedImage', newSelection);
    }
  },

  showTable: (function () {
    return this.get('model').any( function (item) {
      return item.get('ready');
    });
  }).property('model.@each.ready')
});
