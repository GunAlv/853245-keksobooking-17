'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          window.data = xhr.response;
          onLoad(window.data.slice());
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.open('GET', url);
      xhr.send();
    }
  };
})();
