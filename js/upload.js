'use strict';

window.upload = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var notice = document.querySelector('.notice');
  var fileChooser = notice.querySelector('.upload input[type=file]');

  var photoContainer = document.querySelector('.form__photo-container');
  var imgUpload = photoContainer.querySelector('.form__photo-container .upload');
  var imgChooser = imgUpload.querySelector('input[type=file]');
  var preview = document.querySelector('.notice__preview img');
  var imgPin = document.querySelector('.pin__main img');
  var formPhoto = document.querySelector('.form__photo');

  var onLoadFile = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (file && matches) {
      window.utils.loadFile(file, function (reader) {
        imgPin.src = preview.src = reader.result;
      });
    }
  };

  var previewFiles = function (files) {
    var emptyCells = document.querySelectorAll('.form__photo:empty');

    files.forEach(function (file, index) {
      window.utils.loadFile(file, function (reader) {
        var div = document.createElement('div');
        var img = document.createElement('img');

        div.classList.add('delete-photo');
        img.classList.add('user-photo');
        img.src = reader.result;

        formPhoto.appendChild(img);
        formPhoto.appendChild(div);
        emptyCells[index].appendChild(img);
        emptyCells[index].appendChild(div);

        var removePreview = function () {
          files = files.filter(function (element) {
            return element.div !== img;
          });

          emptyCells[index].removeChild(img);
          emptyCells[index].removeChild(div);
        };

        div.addEventListener('click', removePreview);
      });
    });


  };

  fileChooser.addEventListener('change', onLoadFile);
  imgChooser.addEventListener('change', function () {
    previewFiles(Array.from(imgChooser.files));
  });

})();
