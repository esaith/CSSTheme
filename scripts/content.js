var colorModule = (function() {
  let OGColors = null;

  applyColors = function(userDefinedColors) {
    if (!OGColors) {
      OGColors = JSON.parse(JSON.stringify(userDefinedColors.mainColors));
    } else {
      setBaseColors(userDefinedColors.mainColors);

      for (const categoryId in userDefinedColors) {
        if (categoryId !== "mainColors") {
          for (const elementId in userDefinedColors[categoryId]) {
            let index = elementId.lastIndexOf("-");
            let id = elementId.substring(0, index);
            const prop = elementId.substring(index + 1);
            const hex = userDefinedColors[categoryId][elementId];
            const elements = document.querySelectorAll("[theme-id='" + id + "']");
            for (const element of elements) {
              element.style[prop] = hex;
            }
          }
        }
      }
    }
  };

  function setBaseColors(mainColors) {
    var elements = document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; ++i) {
      var tagName = elements[i].tagName.toLowerCase();
      var isLot = elements[i].hasAttribute("data-lotId");

      var computedStyle = window.getComputedStyle(elements[i], null);
      var bgColor = rgbToHex(
        computedStyle.getPropertyValue("background")
      ).toLowerCase();
      var bgColorColor = rgbToHex(
        computedStyle.getPropertyValue("background-color")
      ).toLowerCase();
      var fillColor = rgbToHex(
        computedStyle.getPropertyValue("fill")
      ).toLowerCase();
      var strokeColor = rgbToHex(
        computedStyle.getPropertyValue("stroke")
      ).toLowerCase();
      var colorColor = rgbToHex(
        computedStyle.getPropertyValue("color")
      ).toLowerCase();

      if (
        tagName != "html" &&
        tagName != "head" &&
        tagName != "style" &&
        tagName != "script" &&
        tagName != "meta" &&
        !isLot
      ) {
        for (const propertyId in mainColors) {
          var color = mainColors[propertyId].toLowerCase();
          if (color !== OGColors[propertyId].toLowerCase()) {
            switch (OGColors[propertyId]) {
              case bgColor:
                elements[i].style.background = color;
                console.log("Updated background: ", color, elements[i]);
                break;
              case bgColorColor:
                elements[i].style.backgroundColor = color;
                console.log("Updated backgroundColor: ", color, elements[i]);
                break;
              case strokeColor:
                elements[i].style.stroke = color;
                break;
              case fillColor:
                elements[i].style.fill = color;
                break;
              case colorColor:
                elements[i].style.color = color;
                break;
              default:
            }
          }
        }
      }
    }

    for (const propertyId in mainColors) {
      OGColors[propertyId] = mainColors[propertyId].toLowerCase();
    }
  }

  function rgbToHex(value) {
    if (value.indexOf("rgba(0, 0, 0, 0)") > -1) return "";
    var val = value.split(",");
    if (val.length < 3) return value;

    var r = val[0].substr(val[0].indexOf("(") + 1).trim();
    var g = val[1].trim();
    var b;
    if (val.length == 3) b = val[2].substr(0, val[2].indexOf(")")).trim();
    // else opacity is included. Let's ignore and just grab 3rd index in array
    else b = val[2].trim();

    var rgb = b | (g << 8) | (r << 16);
    return "#" + (0x1000000 + rgb).toString(16).slice(1);
  }

  return {
    applyColors: applyColors
  };
})();

chrome.runtime.onMessage.addListener(function(userDefinedColors) {
  colorModule.applyColors(userDefinedColors);
});
