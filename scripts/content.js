var colorModule = (function () {
  var baseColors, colors, rgbToHex, saveOptions, init;

  baseColors = { };

  colors = {};

  init = function () {
    Object.keys(baseColors).forEach(function (key, index) {
      colors[key] = baseColors[key];
    });
  }



  rgbToHex = function (value) {
    var val = value.split(",")
    if (val.length < 3)
      return value

    var r = val[0].substr(val[0].indexOf("(") + 1).trim()
    var g = val[1].trim()
    var b
    if (val.length == 3)
      b = val[2].substr(0, val[2].indexOf(")")).trim()
    else  // else opacity is included. Let's ignore and just grab 3rd index in array
      b = val[2].trim()

    var rgb = b | (g << 8) | (r << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
  }


  saveOptions = function (userDefinedColors) {

    baseColors = userDefinedColors.baseColors;
    colors = userDefinedColors.colors;

    var savedColors = {}  // Save the colors for now. Once all elements have been changed -then- replace the colors assoc. array
    // Otherwise any elements that have the same color beyond the first may or may not get their color changed to the appropriate color

    var elements = document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; ++i) {
      var tagName = elements[i].tagName.toLowerCase()
      var isLot = elements[i].hasAttribute("data-lotId")

      var computedStyle = window.getComputedStyle(elements[i], null)
      var bgColor = rgbToHex(computedStyle.getPropertyValue("background")).toLowerCase()
      var bgColorColor = rgbToHex(computedStyle.getPropertyValue("background-color")).toLowerCase()
      var fillColor = rgbToHex(computedStyle.getPropertyValue("fill")).toLowerCase()
      var strokeColor = rgbToHex(computedStyle.getPropertyValue("stroke")).toLowerCase()
      var colorColor = rgbToHex(computedStyle.getPropertyValue("color")).toLowerCase()


      if (tagName != "html" && tagName != "head" && tagName != "style" && tagName != "script" && tagName != "meta" && !isLot) {
        Object.keys(colors).forEach(function (key, index) {
          var userDefinedValue = colors[key].toLowerCase()
          var defaultDefinedValue = baseColors[key].toLowerCase();

          if (bgColor === userDefinedValue || bgColor === defaultDefinedValue) {
            var color = userDefinedColors[key];
            elements[i].style.background = color;
            savedColors[key] = color;
          }
          if (bgColorColor === userDefinedValue || bgColorColor === defaultDefinedValue) {
            var color = userDefinedColors[key];
            elements[i].style.backgroundColor = color;
            savedColors[key] = color;
          }
          if (strokeColor == userDefinedValue || strokeColor === defaultDefinedValue) {
            var color = userDefinedColors[key];
            elements[i].style.stroke = color;
            savedColors[key] = color;
          }
          if (fillColor == userDefinedValue || fillColor === defaultDefinedValue) {
            var color = userDefinedColors[key];
            elements[i].style.fill = color;
            savedColors[key] = color;
          }
          if (colorColor == userDefinedValue || color === defaultDefinedValue) {
            var color = userDefinedColors[key];
            elements[i].style.color = color;
            savedColors[key] = color;
          }
        });
      }
    }


    Object.keys(savedColors).forEach(function (key, index) {
      colors[key] = savedColors[key];
    });
  }

  init();

  return {
    saveOptions: saveOptions,
  };

})();

chrome.runtime.onMessage.addListener(function (userDefinedColors, sender, sendResponse) {
  colorModule.saveOptions(userDefinedColors);
})