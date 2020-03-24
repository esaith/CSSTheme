var MediaLabColorModule = (function () {
  // We need to know both the current color and the new color of base colors
  // This allows us to pin point the current base colors on the page and update those
  // All other specific colors will be found by element attribute

  let baseColors = null;

  const EVENTS = {
    ALL: 0,
    SINGLE: 1,
  };

  const EVENT_TYPE = {
    MOUSEOUT: 0,
    MOUSEOVER: 1
  };

  applyColors = function (userEvent) {
    // { EVENT: EVENTS.SINGLE, TYPE: EVENT_TYPE.MOUSEOVER, VALUE: property }
    if (userEvent.EVENT === EVENTS.ALL) {
      if (!baseColors) {
        baseColors = JSON.parse(JSON.stringify(userEvent.VALUE[0]));
      } else {
        setBaseColors(userEvent.VALUE[0]);

        for (const category of userEvent.VALUE) {

          if (category.id === "mainColors")
            continue;

          for (const segment of category.properties) {
            let index = segment.Property.lastIndexOf("-");
            let elementAttrValue = segment.Property.substring(0, index);
            const cssProperty = segment.Property.substring(index + 1);
            const hex = segment.Value;

            if (cssProperty !== 'color'
              && cssProperty !== 'backgroundColor'
              && cssProperty !== 'filter'
              && cssProperty !== 'borderBottomColor'
            ) {
              console.log('Color update may not work: ' + cssProperty);
            }
            else {
              const elements = document.querySelectorAll("[theme-id='" + elementAttrValue + "']");
              for (const element of elements) {
                element.style[cssProperty] = hex;
              }
            }
          }
        }
      }
    } else {// EVENT.SINGLE
      if (userEvent.TYPE === EVENT_TYPE.MOUSEOVER) {
        highlight(userEvent);
      } else {
        unhighlight(userEvent);
      }
    }
  };

  function highlight(event) {
    if (event.VALUE.Property.indexOf("-") > -1) {
      // specific element
      let index = event.VALUE.Property.lastIndexOf("-");
      let elementAttrValue = event.VALUE.Property.substring(0, index);

      const elements = document.querySelectorAll("[theme-id='" + elementAttrValue + "']");
      for (const element of elements) {
        element.classList.add('high-light-option');
      }
    } else {
      // Main Color
    }
  }

  function unhighlight(event) {
    if (event.VALUE.Property.indexOf("-") > -1) {
      // specific element
      let index = event.VALUE.Property.lastIndexOf("-");
      let elementAttrValue = event.VALUE.Property.substring(0, index);

      const elements = document.querySelectorAll("[theme-id='" + elementAttrValue + "']");
      for (const element of elements) {
        element.classList.remove('high-light-option');
      }
    } else {
      // Main Color
    }
  }

  function setBaseColors(newMainColors) {
    var elements = document.getElementsByTagName("*");
    for (var element of elements) {
      var tagName = element.tagName.toLowerCase();
      var isLot = element.hasAttribute("data-lotId");

      var computedStyle = window.getComputedStyle(element, null);
      var bgColor = rgbToHex(computedStyle.getPropertyValue("background")).toLowerCase();
      var bgColorColor = rgbToHex(computedStyle.getPropertyValue("background-color")).toLowerCase();
      var fillColor = rgbToHex(computedStyle.getPropertyValue("fill")).toLowerCase();
      var strokeColor = rgbToHex(computedStyle.getPropertyValue("stroke")).toLowerCase();
      var colorColor = rgbToHex(computedStyle.getPropertyValue("color")).toLowerCase();

      if (tagName != "html" && tagName != "head" && tagName != "style"
        && tagName != "script" && tagName != "meta" && !isLot
      ) {
        for (let i = 0; i < newMainColors.properties.length; ++i) {
          var newColor = newMainColors.properties[i].Value.toLowerCase();
          var currentColor = baseColors.properties[i].Value.toLowerCase();

          if (newColor !== currentColor) {
            switch (currentColor) {
              case bgColor:
                element.style.background = newColor;
                console.log("Updated background: ", newColor, element);
                break;
              case bgColorColor:
                element.style.backgroundColor = newColor;
                console.log("Updated backgroundColor: ", newColor, element);
                break;
              case strokeColor:
                element.style.stroke = newColor;
                break;
              case fillColor:
                element.style.fill = newColor;
                break;
              case colorColor:
                element.style.color = newColor;
                break;
              default:
            }
          }

        }
      }
    }

    baseColors = JSON.parse(JSON.stringify(newMainColors));
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

chrome.runtime.onMessage.addListener(function (userEvent) {
  MediaLabColorModule.applyColors(userEvent);
});
