var ColorTheme = (function () {
  var baseColors, colors, init, loadColors, submit, url;

  baseColors = {
    woodlandestates: {
      majorcolor1: "#ffffff",
      majorcolor2: "#46bfda",

      minorcolor1: "#232831",
      minorcolor2: "#dde6e9",
      minorcolor3: "#303643",

      detailcolor1: "#b3b3b3",
      detailcolor2: "#5f6471",
      detailcolor3: "#32a0b8",
      detailcolor4: "#282d38",
      detailcolor5: "#191e26",
      lotmapBackgroundColor: "#bed981"
    },
    bracelo: {
      majorcolor1: "#ffffff",
      majorcolor2: "#46bfda",

      minorcolor1: "#232831",
      minorcolor2: "#dde6e9",
      minorcolor3: "#303643",

      detailcolor1: "#b3b3b3",
      detailcolor2: "#5f6471",
      detailcolor3: "#32a0b8",
      detailcolor4: "#282d38",
      detailcolor5: "#191e26",
      lotmapBackgroundColor: "#bed981"
    }
  }

  var colors = colors || { }

  submit = function () {
    Object.keys(baseColors["woodlandestates"]).forEach(function (key, index) {
      colors[key] = document.getElementById(key).value
      if (colors[key].indexOf("#") < 0)
        colors[key] = "#" + colors[key]
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      url = tabs[0].url;
      var index = url.indexOf(".")
      if (index < 0) return;
      var community = url.substring(0, index)
      var colorObj = { baseColors: baseColors[community], colors: colors}

      chrome.tabs.sendMessage(tabs[0].id, colorObj, function (response) {
      })
    });

    chrome.storage.local.set(colors, function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function () {
        status.textContent = '';
      }, 750);
    });
  }

  loadColors = function (colors) {
    Object.keys(colors).forEach(function (key, value) {
      document.getElementById(key).value = colors[key];
      document.getElementById(key).style.backgroundColor = colors[key];
    });


    submit()
  }

  init = function () {
    chrome.storage.local.get(colors, function (result) {
      if (result) {
        colors = result
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options retrieved.';
        setTimeout(function () {
          status.textContent = '';
        }, 750);
      } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          url = tabs[0].url;
          var index = url.indexOf(".")
          if (index < 0) return;
          var community = url.substring(0, index)
          colors = baseColors[community]
        });
      }
      loadColors(colors)
    });
  }

  reset = function () {
    colors = baseColors;
    loadColors(colors)
  }

  return {
    init: init,
    reset: reset,
    submit: submit
  };
})();

document.addEventListener('DOMContentLoaded', function () {

  ColorTheme.init();

  document.querySelector('#btnReset').addEventListener('mouseup', function () {
    ColorTheme.reset();
  });

  document.querySelector('#btnSubmit').addEventListener('mouseup', function () {
    ColorTheme.submit();
  });
});

