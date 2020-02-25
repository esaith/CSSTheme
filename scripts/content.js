var colorModule = (function() {
  applyColors = function(userDefinedColors) {
    for (const categoryId in userDefinedColors) {
      for (const elementId in userDefinedColors[categoryId]) {
        let index = elementId.lastIndexOf("-");
        let id = elementId.substring(0, index);
        const prop = elementId.substring(index + 1);
        const hex = userDefinedColors.treasureMapColors[elementId];
        const ele = document.querySelector("[theme-id='" + id + "']");
        if (ele) ele.style[prop] = hex;
      }
    }
  };

  return {
    applyColors: applyColors
  };
})();

chrome.runtime.onMessage.addListener(function(
  userDefinedColors
) {
  colorModule.applyColors(userDefinedColors);
});
