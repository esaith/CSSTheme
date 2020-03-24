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

    if (settingColors(userEvent)) {
      if (!baseColors) {
        baseColors = JSON.parse(JSON.stringify(userEvent.VALUE[0]));
      } else {
        setBaseColors(userEvent.VALUE[0]);
        setColorsToIds(userEvent.VALUE);
      }
    } else if (mouseEvent(userEvent)) {
      switch (userEvent.TYPE) {
        case EVENT_TYPE.MOUSEOVER:
          highlight(userEvent);
          break;
        case EVENT_TYPE.MOUSEOUT:
          unhighlight(userEvent);
          break;
        default:
          console.log("Unable to read mouse event", userEvent);
      }
    }
  };

  function settingColors(userEvent) {
    return userEvent.EVENT === EVENTS.ALL;
  }

  function mouseEvent(userEvent) {
    return userEvent.TYPE === EVENT_TYPE.MOUSEOVER || userEvent.TYPE === EVENT_TYPE.MOUSEOUT;
  }

  function setColorsToIds(categories) {
    for (const category of categories) {

      if (category.id === "mainColors")
        continue;

      for (const element of category.elements) {
        if (!element.Value)
          continue;

        for (let property of element.Property) {
          var isBefore = property.indexOf('-before') > -1;
          var isAfter = property.indexOf('-after') > -1;

          if (isBefore) property = property.replace('-before', '');
          if (isAfter) property = property.replace('-after', '');

          let index = property.lastIndexOf("-");
          let elementAttrValue = property.substring(0, index);
          const cssProperty = property.substring(index + 1);
          const hex = element.Value;

          const htmlElements = document.querySelectorAll("[theme-id='" + elementAttrValue + "']");
          for (const htmlElement of htmlElements) {
            if (isBefore) updatePsuedoElement(htmlElement, "before", cssProperty, hex);
            if (isAfter) updatePsuedoElement(htmlElement, "after", cssProperty, hex);

            if (!isBefore && !isAfter)
              htmlElement.style[cssProperty] = hex;
          }
        }
      }
    }
  }

  function updatePsuedoElement(element, psudeo, cssProperty, hex) {
    var path = getParentPathToRoot(element, "");
    removeOldRule(path + '::' + psudeo);
    document.styleSheets[0].insertRule(path + ':' + psudeo + ' { ' + camelCaseToDash(cssProperty) + ': ' + hex + ' }');
  }

  function camelCaseToDash(cssProperty) {
    var result = "";
    for (let char of cssProperty) {
      if (char === char.toUpperCase()) {
        result += '-' + char.toLowerCase();
      } else {
        result += char;
      }
    }

    return result;
  }

  function removeOldRule(path) {
    let index = Array.from(document.styleSheets[0].cssRules).findIndex((rule) => rule.selectorText == path);
    if (index > -1)
      document.styleSheets[0].deleteRule(index);
  }

  function getParentPathToRoot(element, path) {
    if (element.tagName !== 'BODY') {
      path = (element.classList.length > 0 ? "." + element.classList[0] : '') + " " + path;
      return getParentPathToRoot(element.parentNode, path);
    }
    else {
      return path.trim();
    }
  }

  function highlight(event) {
    baseHighlight('add', event);
  }

  function unhighlight(event) {
    baseHighlight('remove', event);
  }

  function baseHighlight(addRemove, event) {
    for (const property of event.VALUE.Property) {
      if (isSpecificId(property)) {
        let index = property.lastIndexOf("-");
        let elementAttrValue = property.substring(0, index);

        const elements = document.querySelectorAll("[theme-id='" + elementAttrValue + "']");
        for (let element of elements) {
          if (withinSvg(element)) element = getToParentSvg(element);
          addRemoveHighlight(element, addRemove);
        }
      } else {
        var elements = document.getElementsByTagName("*");
        for (var element of elements) {
          var tagName = element.tagName.toLowerCase();
          var isLot = element.hasAttribute("data-lotId");

          if (!tagIgnored(tagName, isLot)) {
            var computedStyle = window.getComputedStyle(element, null);
            var bgColor = rgbToHex(computedStyle.getPropertyValue("background")).toLowerCase();
            var bgColorColor = rgbToHex(computedStyle.getPropertyValue("background-color")).toLowerCase();
            var fillColor = rgbToHex(computedStyle.getPropertyValue("fill")).toLowerCase();
            var strokeColor = rgbToHex(computedStyle.getPropertyValue("stroke")).toLowerCase();
            var colorColor = rgbToHex(computedStyle.getPropertyValue("color")).toLowerCase();
            var color = event.VALUE.Value.toLowerCase();

            switch (color) {
              case bgColor:
              case bgColorColor:
              case strokeColor:
              case fillColor:
              case colorColor:
                addRemoveHighlight(element, addRemove)
              default:
            }
          }
        }
      }
    }
  }

  function isSpecificId(property) {
    return property.indexOf("-") > -1;
  }

  function tagIgnored(tagName, isLot) {
    return tagName != "html" && tagName != "head" && tagName != "style"
      && tagName != "script" && tagName != "meta" && !isLot
  }

  function addRemoveHighlight(element, addRemove) {
    if (addRemove === 'add')
      element.classList.add('high-light-option');
    else
      element.classList.remove('high-light-option');
  }

  function withinSvg(element) {
    return element.tagName.indexOf('path') > -1
      || element.tagName.indexOf('rect') > -1
      || element.tagName.indexOf('g') > -1
      || element.tagName.indexOf('polygon') > -1
      || element.tagName.indexOf('line') > -1;
  }

  function getToParentSvg(element) {
    if (element.tagName !== 'svg') {
      return getToParentSvg(element.parentNode);
    } else {
      return element;
    }
  }


  function setBaseColors(newMainColors) {
    var elements = document.getElementsByTagName("*");
    for (var element of elements) {
      var tagName = element.tagName.toLowerCase();
      var isLot = element.hasAttribute("data-lotId");

      if (!tagIgnored(tagName, isLot)) {
        var computedStyle = window.getComputedStyle(element, null);
        var bgColor = rgbToHex(computedStyle.getPropertyValue("background")).toLowerCase();
        var bgColorColor = rgbToHex(computedStyle.getPropertyValue("background-color")).toLowerCase();
        var fillColor = rgbToHex(computedStyle.getPropertyValue("fill")).toLowerCase();
        var strokeColor = rgbToHex(computedStyle.getPropertyValue("stroke")).toLowerCase();
        var colorColor = rgbToHex(computedStyle.getPropertyValue("color")).toLowerCase();

        for (let i = 0; i < newMainColors.elements.length; ++i) {
          var newColor = newMainColors.elements[i].Value.toLowerCase();
          var currentColor = baseColors.elements[i].Value.toLowerCase();

          if (newColor !== currentColor) {
            switch (currentColor) {
              case bgColor:
                element.style.background = newColor;
                break;
              case bgColorColor:
                element.style.backgroundColor = newColor;
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
