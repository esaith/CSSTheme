var ColorTheme = (function() {
  var baseColors, colors;
  var mainColors = {
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

    lotmapBackgroundColor: "#bed981",
    highlightColor1: "#39a0b6",
    shadowcolor1: "#000000",
    errorColor1: "#d35b5b",
    errorColor2: "#f7d6d6"
  };

  (mainColors.contentColor = mainColors.majorcolor1),
    (mainColors.highlightColor2 = mainColors.majorcolor2);
  mainColors.specsColor1 = mainColors.majorcolor1;
  mainColors.specsColor2 = mainColors.majorcolor2;

  baseColors = {
    mainColors: mainColors,
    treasureMapColors: {
      "treasureMapBtnOpen-backgroundColor": mainColors.minorcolor1,
      "treasureMapBtnClose-backgroundColor": mainColors.minorcolor3,
      "leftBarClosed-color": mainColors.highlightColor2,
      "leftBarClosed-backgroundColor": mainColors.detailcolor4,
      "leftBarOpen-color": mainColors.contentColor,
      "leftBarOpen-backgroundColor": mainColors.detailColor4,
      "leftBarOpenMiniPage-backgroundColor": mainColors.minorcolor3,
      "registration-color": mainColors.contentColor,
      "registration-backgroundColor": mainColors.majorcolor2,
      "registrationIcon-backgroundColor": mainColors.detailcolor3,
      "salesRep-color": mainColors.majorcolor1,
      "treasureMapPageNotVisitedEye-filter": mainColors.detailcolor3,
      "treasureMapPageNotVisited-color": mainColors.majorcolor2,
      "treasureMapPageIconShadow-filter": mainColors.detailcolor4,
      "treasureMapPageVisited-color": mainColors.majorcolor1
    },
    globalHudColors: {
      "globalHudClosed-backgroundColor": mainColors.majorcolor1,
      "globalHudOpen-backgroundColor": mainColors.majorcolor1,
      "globalHudClosedIcon-backgroundColor": mainColors.majorcolor2,
      "globalHudOpenPieSlice-backgroundColor": mainColors.minorcolor2
    },
    filterMenuColors: {
      "filterslider-left-backgroundColor": mainColors.detailColor4,
      "filterslider-right-backgroundColor": mainColors.minorcolor3,
      "filterslider-borderBottomColor": mainColors.minorcolor3,
      "filterslider-label-color": mainColors.specsColor1,
      "filterslider-value-color": mainColors.specsColor2,
      "filterslider-bar-backgroundColor": mainColors.detailcolor5
    },
    filterMenuFloorplans: {
      "filterslider-floorplans-header-backgroundColor": mainColors.detailcolor4,
      "filterslider-floorplans-header-backgroundColor": mainColors.contentColor,
      "filterslider-floorplans-header-borderBottomColor":
        mainColors.minorcolor3,
      "filterslider-floorplans-neighborhood-color": mainColors.contentColor,
      "filterslider-floorplans-neighborhood-backgroundColor":
        mainColors.majorcolor2,
      "filterslider-floorplans-neighborhood-option-color":
        mainColors.minorcolor1,
      "filterslider-floorplans-neighborhood-option-backgroundColor":
        mainColors.majorcolor1,
      "filterslider-floorplans-neighborhood-selected-color":
        mainColors.contentColor
    },
    dropDownColor: {
      "dropdown-control-color": mainColors.majorcolor2,
      "dropdown-controlColor-active": mainColors.detailcolor3,
      "dropdown-placeholder-color": mainColors.majorcolor1,
      "dropdown-icon-backgroundColor": mainColors.detailcolor3,
      "dropdown-list-color": mainColors.detailcolor4,
      "dropdown-list-color-hover": mainColors.minorcolor2,
      "dropdown-borderColor": mainColors.minorcolor3
    },
    cardsColor: {
      "card-label-color": mainColors.contentColor,
      "card-value-color": mainColors.contentColor,
      "card-backgroundColor": mainColors.minorcolor1,
      "card-image-backgroundColor": mainColors.majorcolor1
    },
    cardFloorplansColor: {
      "card-floorplan-title-color": mainColors.majorcolor1,
      "card-floorplan-title-backgroundColor": mainColors.minorcolor1,
      "card-floorplan-backgroundColor": mainColors.detailcolor4,
      "card-floorplan-specLabel-color": mainColors.specsColor1,
      "card-floorplan-specValue-color": mainColors.specsColor2,
      "card-floorplan-specborderColor": mainColors.minorcolor3
    },
    swipeNavColor: {
      "swipeNav-backgroundColor": mainColors.majorcolor2,
      "swipeNav-3dBackgroundShadow-backgroundColor": mainColors.detailcolor3,
      "swipeNav-middleBorderColor": mainColors.highlightColor1
    },
    radialTextMenuColor: {
      "rtmenu-quarter-circle-fill": "rgba(0,0,0,.3)",
      "rtmenu-category-backgroundColor": mainColors.majorcolor1,
      "rtmenu-category-item-color": "#000",
      "rtmenu-category-item-color-hover": mainColors.majorcolor1,
      "rtmenu-category-item-backgroundColor": mainColors.majorcolor1,
      "rtmenu-category-item-backgroundColor-hover": mainColors.detailcolor1,
      "rtmenu-category-item-backgroundColor-disabled": mainColors.majorcolor1,
      "rtmenu-category-itemCircle-fill": "#dadada",
      "rtmenu-category-itemCircle-fill-hover": mainColors.detailcolor1,
      "rtmenu-category-itemCircle-stroke": "white",
      "rtmenu-category-itemCircle-stroke-hover": "white"
    },
    floorplanSpecsColor: {
      "floorplan-specs-titleShadow-color": mainColors.shadowcolor1,
      "floorplan-specs-color": mainColors.specsColor1,
      "floorplan-specs-infoShadow-color": mainColors.shadowcolor1,
      "floorplan-specs-infoValue-color": mainColors.specsColor2,
      "floorplan-specs-info-borderColor": mainColors.detailColor3
    },
    completeRegistration: {
      "completeRegistrationButton-backgroundColor": mainColors.majorcolor2
    },
    energyEfficiency: {
      "energyEfficiency-color": mainColors.majorcolor1,
      "energyEfficiency-hotspot-pulse-borderColor": mainColors.majorcolor1,
      "energyEfficiency-hotspot-pulse-backgroundColor":
        mainColors.highlightColor2,
      "energyEfficiency-sideMenu-color": mainColors.contentColor,
      "energyEfficiency-sideMenu-categoryIndex-color": mainColors.contentColor,
      "energyEfficiency-sideMenu-categoryIndex-backgroundColor":
        mainColors.minorcolor1,
      "energyEfficiency-sideMenu-categoryIndex-color-selected":
        mainColors.contentColor,
      "energyEfficiency-sideMenu-categoryIndex-backgroundColor-selected":
        mainColors.highlightColor1,
      "energyEfficiency-sideMenu-content-color": mainColors.detailColor4,
      "energyEfficiency-sideMenu-content-backgroundColor":
        mainColors.majorcolor1
    },
    locationColors: {
      "location-mapMode-backgroundColor": mainColors.majorcolor1,
      "location-markerInfo-header-backgroundColor": mainColors.minorcolor1,
      "location-markerInfo-color": mainColors.contentColor,
      "location-markerInfo-backgroundColor": mainColors.detailcolor4,
      "location-markerInfo-favButton-backgroundColor": mainColors.majorcolor2,
      "location-markerInfo-favButton-tail-backgroundColor":
        mainColors.detailcolor3,
      "location-addMarkerForm-header-color": mainColors.minorcolor1,
      "location-addMarkerForm-header-backgroundColor": mainColors.minorcolor1,
      "location-addMarkerForm-color": mainColors.contentColor,
      "location-addMarkerForm-backgroundColor": mainColors.detailcolor4,
      "location-addMarkerForm-label-color": mainColors.contentColor,
      "location-addMarkerForm-input-color": mainColors.minorcolor1,
      "location-addMarkerForm-input-backgroundColor": mainColors.majorcolor1,
      "location-addMarkerForm-input-placeholder-color": mainColors.minorcolor1,
      "location-addMarkerForm-submitBtn-color": mainColors.contentColor,
      "location-addMarkerForm-submitBtn-backgroundColor":
        mainColors.highlightColor2,
      "location-addMarkerForm-bottomArrow-color": mainColors.detailColor4,
      "location-addMarkerBtn-backgroundColor": mainColors.majorcolor1,
      "location-communityMap-color": mainColors.contentColor,
      "location-communityMap-textShadowColor": mainColors.shadowcolor1,
      "location-communityMap-borderBottomColor": mainColors.contentColor,
      "location-offlineMessage-color": mainColors.majorcolor1,
      "location-offlineMessage-color-hover": mainColors.minorcolor1
    },
    scrollBarColors: {
      "scroll-bar-track-backgroundColor": "#b3b3b3",
      "scroll-bar-thumb-backgroundColor": "#757575"
    },
    authColors: {
      "loginForm-backgroundColor": mainColors.detailColor4,
      "loginForm-header-color": mainColors.contentColor,
      "loginForm-header-backgroundColor": mainColors.minorcolor1,
      "loginForm-submitBtn-color": mainColors.majorcolor1,
      "loginForm-submitBtn-backgroundColor": mainColors.majorcolor2,
      "loginForm-input-color": mainColors.majorcolor1,
      "loginForm-input-placeHolderColor": mainColors.majorcolor1,
      "loginForm-input-borderBottomColor": mainColors.majorcolor2,
      "loginForm-input-invalid-backgroundColor": mainColors.errorColor2,
      "loginForm-input-invalid-borderColor": mainColors.errorColor1
    },
    furniture: {
      "furnitureMenu-category-content-popout-color": mainColors.detailColor4,
      "furnitureMenu-backgroundColor": mainColors.detailcolor4,
      "furnitureMenu-group-textAnnotation-color": mainColors.detailColor4,
      "furnitureMenu-category-content-popout-backgroundColor":
        mainColors.majorcolor1,
      "furnitureMenu-category-content-popout-arrow-color":
        mainColors.majorcolor1,
      "furnitureMenu-category-content-popout-borderColor":
        mainColors.minorcolor2
    },
    lotmap: {
      "lotmap-backgroundColor": "#fff",
      "lotmap-favorite-color": "#129bdb",
      "lotmap-fullMap-color": mainColors.contentColor,
      "lotmap-fullMap-backgroundColor": mainColors.minorcolor1,
      "lotmap-lotDetails-color": mainColors.contentColor,
      "lotmap-lotDetails-backgroundColor": mainColors.minorcolor1,
      "lotmap-lotDetails-title-color": mainColors.contentColor,
      "lotmap-lotDetails-title-backgroundColor": mainColors.minorcolor1,
      "lotmap-lotDetails-field-borderColor": mainColors.minorcolor3,
      "lotmap-lotDetails-field-backgroundColor": mainColors.detailcolor4,
      "lotmap-lotDetails-field-label-color": mainColors.majorcolor2,
      "lotmap-lotDetails-field-value-color": mainColors.contentColor,
      "lotmap-lotDetails-managementMap-borderColor": mainColors.minorcolor3,
      "lotmap-filterOptions-color": mainColors.contentColor,
      "lotmap-filterOptions-backgroundColor": mainColors.detailcolor4,
      "lotmap-filterOptions-header-bottomBorder": mainColors.minorcolor3,
      "lotmap-status-topBorderColor": mainColors.minorcolor1,
      "lotmap-status-color": mainColors.contentColor,
      "lotmap-selectedLot-stroke": mainColors.highlightColor1,
      "lotmap-selectedLot-fill": mainColors.highlightColor1
    },
    brochureColors: {
      "brochure-color": mainColors.contentColor,
      "brochure-backgroundColor": mainColors.majorcolor2,
      "brochure-cardRow-title-color": mainColors.contentColor,
      "brochure-cardRow-title-backgroundColor": mainColors.minorcolor1,
      "brochure-cardRow-elevation-color": mainColors.contentColor,
      "brochure-cardRow-elevation-backgroundColor": mainColors.minorcolor1,
      "brochure-cardRow-elevation-info-backgroundColor":
        mainColors.detailcolor4,
      "brochure-cardRow-elevation-info-label-color": mainColors.specsColor1,
      "brochure-cardRow-elevation-info-value-color": mainColors.specsColor2
    },
    snapBack: {
      "snapback-backgroundColor": mainColors.minorcolor1,
      "snapback-middleSpacer-color": mainColors.majorcolor1,
      "snapback-link-color": mainColors.majorcolor2,
      "snapback-link-backgroundColor": mainColors.majorcolor1,
      "snapback-link-bottomBorderColor": mainColors.detailcolor1
    },
    userProfileColors: {
      "userProfile-column-color": mainColors.contentColor,
      "userProfile-column-backgroundColor": mainColors.detailcolor4,
      "userProfile-column-header-backgroundColor": mainColors.minorcolor1,
      "userProfile-icon-backgroundColor": mainColors.highlightColor2,
      "userProfile-input-color": mainColors.minorcolor1,
      "userProfile-input-placeholder": mainColors.minorcolor1,
      "userProfile-input-backgroundColor": mainColors.majorcolor1,
      "userProfile-registerBtn-color": mainColors.contentColor,
      "userProfile-registerBtn-backgroundColor": mainColors.highlightColor2,
      "userProfile-autoComplete-color": mainColors.contentColor,
      "userProfile-autoComplete-backgroundColor": mainColors.minorcolor3
    }
  };

  function submit() {
    for (const categoryId in colors) {
      for (const propertyId in colors[categoryId]) {
        const ele = document.getElementById(propertyId);
        if (ele) {
          let hex = ele.value;
          if (hex.indexOf("#") < 0) {
            hex = "#" + hex;
            ele.value = hex;
            ele.style.backgroundColor = hex;
          }

          colors[categoryId][propertyId] = hex;
        }
      }
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, colors, function(response) {});
    });

    chrome.storage.local.set(colors, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);
    });
  }

  function loadColors(_colors) {
    for (const categoryId in _colors) {
      for (const propertyId in colors[categoryId]) {
        const ele = document.getElementById(propertyId);
        if (ele) {
          const hex = _colors[categoryId][propertyId];
          if (hex[0] !== "#") hex = "#" + hex;

          ele.value = hex;
          ele.style.backgroundColor = hex;
        }
      }
    }

    submit();
  }

  function init() {
    chrome.storage.local.get(colors, function(result) {
      colors = result || colors;

      for (const categoryId in colors)
        if (typeof colors[categoryId] !== "object") delete colors[categoryId];

      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options retrieved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);

      if (!colors || !colors.treasureMapColors) reset();
      loadColors(colors);
    });
  }

  function reset() {
    colors = JSON.parse(JSON.stringify(baseColors));
    loadColors(colors);
  }

  return {
    init: init,
    reset: reset,
    submit: submit
  };
})();

document.addEventListener("DOMContentLoaded", function() {
  ColorTheme.init();

  document.querySelector("#btnReset").addEventListener("mouseup", function() {
    ColorTheme.reset();
  });

  document.querySelector("#btnSubmit").addEventListener("mouseup", function() {
    ColorTheme.submit();
  });

  const tabs = [
    "mainColors",
    "treasureMap",
    "globalHud",
    "filterMenu",
    "filterMenuFloorplans",
    "dropDown",
    "cards",
    "cardsFloorplans",
    "swipeNav",
    "radialTextMenu",
    "floorplan",
    "registration",
    "energyEfficiency",
    "location",
    "scrollBar",
    "auth",
    "furniture",
    "lotmap",
    "brochure",
    "snapBack",
    "userProfile"
  ];

  const elements = {};

  for (const tab of tabs) {
    elements[tab] = {
      tab: document.querySelector("#" + tab + "Tab"),
      content: document.querySelector("#" + tab + "TabContent")
    };

    if (!elements[tab].tab) {
      console.error("Unable to find tab " + tab + " element");
      continue;
    }

    if (!elements[tab].content) {
      console.error("Unable to find tab content " + tab + " element");
      continue;
    }

    elements[tab].tab.addEventListener("mouseup", function() {
      toggleTabs(tab);
    });
  }

  toggleTabs("mainColors");

  function toggleTabs(baseTabName) {
    for (const tab of tabs) {
      if (elements[tab] && elements[tab].tab) {
        elements[tab].tab.classList.remove("selected");
        elements[tab].content.classList.remove("selected");
      }
    }

    if (elements[baseTabName] && elements[baseTabName].tab) {
      elements[baseTabName].tab.classList.add("selected");
      elements[baseTabName].content.classList.add("selected");
    } else {
      console.log("Unable to find index: ", baseTabName);
    }
  }
});
