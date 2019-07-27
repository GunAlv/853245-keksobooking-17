'use strict';

(function () {
  var SUCCESS_REQUEST = 200;

  var createRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_REQUEST) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      createRequest('https://js.dump.academy/keksobooking/data', 'GET', onLoad, onError);
    },

    save: function (onLoad, onError, data) {
      createRequest('https://js.dump.academy/keksobooking/', 'POST', onLoad, onError, data);
    }
  };
})();
