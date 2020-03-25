(function () {
    angular.module('csstheme').controller('mainController', ['$scope', mainController]);

    function mainController($scope) {
        var baseMainColors, mainColors, backupOriginalColors;
        $scope.vm = {
            status: ''
        };

        $scope.selectedCategory = "";

        function init() {
            backupOriginalColors = JSON.parse(JSON.stringify($scope.categories));
            chrome.storage.local.get('saved-colors', (result) => {
                if (!chrome.runtime.lastError) {
                    if (result && Object.keys(result).length > 0) {
                        $scope.categories = result['saved-colors'];
                    }

                    if ($scope.categories['saved-colors'])
                        $scope.categories = $scope.categories['saved-colors'];

                    $scope.vm.status = "Options retrieved.";
                    $scope.selectCategory($scope.categories[0]);
                    setTimeout(() => {
                        $scope.vm.status = "";
                        $scope.submit();
                    }, 750);
                }
            });
        }

        const EVENTS = {
            ALL: 0,
            SINGLE: 1,
        };

        const EVENT_TYPE = {
            MOUSEOUT: 0,
            MOUSEOVER: 1
        };

        $scope.$on('mouse-over', function (event, property) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id,
                    {
                        EVENT: EVENTS.SINGLE,
                        TYPE: EVENT_TYPE.MOUSEOVER,
                        VALUE: property
                    });
            });
        });

        $scope.$on('mouse-out', function (event, property) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (!chrome.runtime.lastError) {
                    chrome.tabs.sendMessage(tabs[0].id,
                        {
                            EVENT: EVENTS.SINGLE,
                            TYPE: EVENT_TYPE.MOUSEOUT,
                            VALUE: property
                        });
                }
            });
        });

        $scope.selectCategory = function (category) {
            $scope.selectedCategory = category;
        }

        $scope.submit = function () {
            $scope.$evalAsync(function () {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    if (!chrome.runtime.lastError) {
                        chrome.tabs.sendMessage(tabs[0].id, { EVENT: EVENTS.ALL, VALUE: $scope.categories });
                    }
                });

                chrome.storage.local.set({ "saved-colors": $scope.categories }, function () {
                    if (!chrome.runtime.lastError) {
                        $scope.vm.status = "Options saved.";
                        setTimeout(() => {
                            $scope.vm.status = "";
                        }, 750);
                    }
                });
            });
        };

        $scope.reset = function () {
            $scope.categories = JSON.parse(JSON.stringify(backupOriginalColors));
            $scope.submit();
        };

        baseMainColors = {
            majorcolor1: "#FFFFFF",
            majorcolor2: "#46BFDA",

            minorcolor1: "#232831",
            minorcolor2: "#DDE6E9",
            minorcolor3: "#303643",

            detailcolor1: "#B3B3B3",
            detailcolor2: "#5F6471",
            detailcolor3: "#32A0B8",
            detailcolor4: "#282D38",
            detailcolor5: "#191E26",

            lotmapBackgroundColor: "#BED981",
            highlightColor1: "#39A0B6",
            shadowcolor1: "#000000",
            errorColor1: "#D35B5B",
            errorColor2: "#F7D6D6"
        };

        baseMainColors.contentColor = baseMainColors.majorcolor1;
        baseMainColors.highlightColor2 = baseMainColors.majorcolor2;
        baseMainColors.specsColor1 = baseMainColors.majorcolor1;
        baseMainColors.specsColor2 = baseMainColors.majorcolor2;

        $scope.categories = [];
        mainColors = {
            title: "Main Colors",
            id: "mainColors",
            elements: [
                { Name: 'Major Color 1', Property: ['majorcolor1'], Value: baseMainColors.majorcolor1 },
                { Name: 'Major Color 2', Property: ['majorcolor2'], Value: baseMainColors.majorcolor2 },
                { Name: 'Minor Color 1', Property: ['minorcolor1'], Value: baseMainColors.minorcolor1 },
                { Name: 'Minor Color 2', Property: ['minorcolor2'], Value: baseMainColors.minorcolor2 },
                { Name: 'Minor Color 3', Property: ['minorcolor3'], Value: baseMainColors.minorcolor3 },
                { Name: 'Detail Color 1', Property: ['detailcolor1'], Value: baseMainColors.detailcolor1 },
                { Name: 'Detail Color 2', Property: ['detailcolor2'], Value: baseMainColors.detailcolor2 },
                { Name: 'Detail Color 3', Property: ['detailcolor3'], Value: baseMainColors.detailcolor3 },
                { Name: 'Detail Color 4', Property: ['detailcolor4'], Value: baseMainColors.detailcolor4 },
                { Name: 'Detail Color 5', Property: ['detailcolor5'], Value: baseMainColors.detailcolor5 }
            ]
        };

        $scope.categories.push(mainColors);
        const treasureMap = {
            title: "Treasure Map",
            id: "treasureMap",
            elements: [
                {
                    Name: 'Open Treasure Map Button - Background Color', Property: ['treasureMapBtnOpen-backgroundColor']
                },
                {
                    Name: 'Left Bar Closed - Color', Property: ['leftBarClosed-color']
                },
                {
                    Name: 'Left Bar Closed - Background Color', Property: ['leftBarClosed-backgroundColor']
                },
                {
                    Name: 'Left Bar Open Background Colors', Property: ['leftBarOpen-backgroundColor']
                },
                {
                    Name: 'Left Bar Open - Small Items - Color', Property: ['leftBarOpenMiniPage-color']
                },
                {
                    Name: 'Left Bar Open - Small Items - Background Color', Property: ['leftBarOpenMiniPage-backgroundColor']
                },
                {
                    Name: 'Left Bar Open Registration Button Color', Property: ['registration-color']
                },
                {
                    Name: 'Left Bar Open Registration Button BackgroundColor', Property: ['registration-backgroundColor']
                },
                {
                    Name: 'Left Bar Open Registration Button Icon BackgroundColor', Property: ['registrationIcon-backgroundColor', 'registrationIcon-borderColor']
                },
                {
                    Name: 'Close Treasure Map Button - Background Color', Property: ['treasureMapBtnClose-backgroundColor']
                },
                {
                    Name: 'Left Bar Open Sales Rep Color', Property: ['salesRep-color']
                },
                // {
                //     Name: 'Treasure Map Not Visited Eye', Property: ['treasureMapPageNotVisitedEye-filter']
                // },
                // {
                //     Name: 'Treasure Map Not Visited Color', Property: ['treasureMapPageNotVisited-color']
                // },
                // {
                //     Name: 'Treasure Map Not Visited Eye Shadow', Property: ['treasureMapPageIconShadow-filter']
                // },
                // {
                //     Name: 'Treasure Map Visited Title Color', Property: ['treasureMapPageVisited-color']
                // }
            ]
        };
        $scope.categories.push(treasureMap);

        const floorplan = {
            title: "Floor Plan",
            id: "floorplan",
            elements: [
                { Name: 'Floorplan Specs - Title Color', Property: ['floorplanSpecsModal-color'] },
                { Name: 'Floorplan Specs - Title Shadow Color', Property: ['floorplanSpecsTitle-textShadow'] },
                { Name: 'Floorplan Specs - Border Color', Property: ['floorplanSpecsBorder-borderColor'] },
                { Name: 'Floorplan Specs - Specs Value Color', Property: ['floorplanSpecValue-color'] },
                { Name: 'Floorplan Specs - Specs Label Color', Property: ['floorplanSpec-color'] },
                { Name: 'Floorplan Specs - Specs Text Shadow Color', Property: ['floorplanSpec-textShadow'] },
            ]
        };
        $scope.categories.push(floorplan);

        const lotmap = {
            title: "Lot Map",
            id: "lotmap",
            elements: [
                { Name: 'Background Color', Property: ['lotmap-backgroundColor'] },
                { Name: '"View Full Map" Button - Color', Property: ['lotmap-fullMapButton-color'] },
                { Name: '"View Full Map" Button - Background Color', Property: ['lotmap-fullMapButton-backgroundColor'] },
                { Name: 'Favorite Color', Property: ['lotmap-favorite-color'] },
                // { Name: 'Lot details color', Property: ['lotmap-lotDetails-color'] },
                // { Name: 'Lot details background color', Property: ['lotmap-lotDetails-backgroundColor'] },
                // { Name: 'Lot details title color', Property: ['lotmap-lotDetails-title-color'] },
                // { Name: 'Lot details title background color', Property: ['lotmap-lotDetails-title-backgroundColor'] },
                // { Name: 'Lot details field border color', Property: ['lotmap-lotDetails-field-borderColor'] },
                // { Name: 'Lot details field background color', Property: ['lotmap-lotDetails-field-backgroundColor'] },
                // { Name: 'Lot details field label color', Property: ['lotmap-lotDetails-field-label-color'] },
                // { Name: 'Lot details field value color', Property: ['lotmap-lotDetails-field-value-color'] },
                // { Name: 'Lot details Management Map borderColor', Property: ['lotmap-lotDetails-managementMap-borderColor'] },
                // { Name: 'Lot Filter Color', Property: ['lotmap-filterOptions-color'] },
                // { Name: 'Lot Filter background Color', Property: ['lotmap-filterOptions-backgroundColor'] },
                // { Name: 'Lot Filter header bottom border color', Property: ['lotmap-filterOptions-header-bottomBorder'] },
                // { Name: 'Lot Map Status top border color', Property: ['lotmap-status-topBorderColor'] },
                // { Name: 'Lot Map Status text color', Property: ['lotmap-status-color'] },
                // { Name: 'Lot Map Status selected lot stroke color', Property: ['lotmap-selectedLot-stroke'] },
                // { Name: 'Lot Map Status selected lot fill color', Property: ['lotmap-selectedLot-fill'] },
            ]
        };
        $scope.categories.push(lotmap);

        const globalHud = {
            title: "Global Hud",
            id: "globalHud",
            elements: [
                {
                    Name: 'Global Hud MiniCircle - Background Color', Property: ['globalHudClosed-backgroundColor']
                },
                // {
                //     Name: 'Global Hud Open Background Color', Property: ['globalHudOpen-backgroundColor']
                // },
                {
                    Name: 'Global Hud - X color', Property: ['globalHudClosedIcon-backgroundColor', 'globalHudClosedIcon-backgroundColor-before', 'globalHudClosedIcon-backgroundColor-after']
                },
                {
                    Name: 'Global Hud Open Pie Slice Background Color', Property: ['globalHudOpenPieSlice-backgroundColor', 'globalHudOpenPieSlice-fill']
                }
            ]
        };
        $scope.categories.push(globalHud);

        const filterMenu = {
            title: "Filters",
            id: "filterMenu",
            elements: [
                { Name: 'Filter Slider Left Background', Property: ['filterslider-left-backgroundColor'] },
                { Name: 'Filter Slider Right Background', Property: ['filterslider-right-backgroundColor'] },
                { Name: 'Filter Slider border bottom color', Property: ['filterslider-borderBottomColor'] },
                { Name: 'Filter Slider label color', Property: ['filterslider-label-color'] },
                { Name: 'Filter Slider value color', Property: ['filterslider-value-color'] },
                { Name: 'Filter Slider bar background color', Property: ['filterslider-bar-backgroundColor'] }
            ]
        };
        $scope.categories.push(filterMenu);

        const filterMenuFloorplans = {
            title: "Filter Menu (Floorplans)",
            id: "filterMenuFloorplansTab",
            elements: [
                { Name: 'Floorplans Filter Header Color', Property: ['filterslider-floorplans-header-color'] },
                { Name: 'Floorplans Filter Header Background Color', Property: ['filterslider-floorplans-header-backgroundColor'] },
                { Name: 'Floorplans Filter bottom border Color', Property: ['filterslider-floorplans-header-borderBottomColor'] },
                { Name: 'Floorplans Filter Neighborhood color', Property: ['filterslider-floorplans-neighborhood-color'] },
                { Name: 'Floorplans Filter Neighborhood background color', Property: ['filterslider-floorplans-neighborhood-backgroundColor'] },
                { Name: 'Floorplans Filter Neighborhood Option color', Property: ['filterslider-floorplans-neighborhood-option-color'] },
                { Name: 'Floorplans Filter Neighborhood Option background color', Property: ['filterslider-floorplans-neighborhood-option-backgroundColor'] },
                { Name: 'Floorplans Filter Neighborhood Select color', Property: ['filterslider-floorplans-neighborhood-selected-color'] },
            ]
        };
        $scope.categories.push(filterMenuFloorplans);

        const dropDownTab = {
            title: "Drop Down",
            id: "dropDownTab",
            elements: [
                { Name: 'Dropdown Color', Property: ['dropdown-control-color'] },
                { Name: 'Dropdown Color - Active', Property: ['dropdown-controlColor-active'] },
                { Name: 'Dropdown placeholder color', Property: ['dropdown-placeholder-color'] },
                { Name: 'Dropdown icon background color', Property: ['dropdown-icon-backgroundColor'] },
                { Name: 'Dropdown list color', Property: ['dropdown-list-color'] },
                { Name: 'Dropdown list color - hover', Property: ['dropdown-list-color-hover'] },
                { Name: 'Dropdown borderColor', Property: ['dropdown-borderColor'] },
            ]
        };
        $scope.categories.push(dropDownTab);

        const cardsTab = {
            title: "Card (General)",
            id: "cards",
            elements: [
                { Name: 'Cards label color', Property: ['card-label-color'] },
                { Name: 'Cards value color', Property: ['card-value-color'] },
                { Name: 'Cards background color', Property: ['card-backgroundColor'] },
                { Name: 'Cards image background color', Property: ['card-image-backgroundColor'] },
            ]
        };
        $scope.categories.push(cardsTab);

        const cardsFloorplans = {
            title: "Cards (Floor Plans)",
            id: "cardsFloorplans",
            elements: [
                { Name: 'Floorplans Cards title color', Property: ['card-floorplan-title-color'] },
                { Name: 'Floorplans Cards title background color', Property: ['card-floorplan-title-backgroundColor'] },
                { Name: 'Floorplans Cards background color', Property: ['card-floorplan-backgroundColor'] },
                { Name: 'Floorplans Cards specification label color', Property: ['card-floorplan-specLabel-color'] },
                { Name: 'Floorplans Cards specification value color', Property: ['card-floorplan-specValue-color'] }
            ]
        };
        $scope.categories.push(cardsFloorplans);

        const swipeNav = {
            title: "Swipe Navigation",
            id: "swipeNav",
            elements: [
                { Name: 'Swipe background color', Property: ['swipeNav-backgroundColor'] },
                { Name: 'Swipe background tail color', Property: ['swipeNav-3dBackgroundShadow-backgroundColor'] },
                { Name: 'Swipe border color', Property: ['swipeNav-middleBorderColor'] }
            ]
        };
        $scope.categories.push(swipeNav);

        const radialTextMenu = {
            title: "Radial Text Menu",
            id: "radialTextMenu",
            elements: [
                { Name: 'Radial Text Menu quarter circle fill', Property: ['rtmenu-quarter-circle-fill'] },
                { Name: 'Radial Text Menu category color', Property: ['rtmenu-category-color'] },
                { Name: 'Radial Text Menu category background color', Property: ['rtmenu-category-backgroundColor'] },
                { Name: 'Radial Text Menu item color', Property: ['rtmenu-category-item-color'] },
                { Name: 'Radial Text Menu item color hover', Property: ['rtmenu-category-item-color-hover'] },
                { Name: 'Radial Text Menu item background color', Property: ['rtmenu-category-item-backgroundColor'] },
                { Name: 'Radial Text Menu item background color hover', Property: ['rtmenu-category-item-backgroundColor-hover'] },
                { Name: 'Radial Text Menu item background color disabled', Property: ['rtmenu-category-item-backgroundColor-disabled'] },
                { Name: 'Radial Text Menu item circle fill', Property: ['rtmenu-category-itemCircle-fill'] },
                { Name: 'Radial Text Menu item circle fill hover', Property: ['rtmenu-category-itemCircle-fill-hover'] },
                { Name: 'Radial Text Menu item circle stroke', Property: ['rtmenu-category-itemCircle-stroke'] },
                { Name: 'Radial Text Menu item circle stroke hover', Property: ['rtmenu-category-itemCircle-stroke-hover'] },
            ]
        };
        $scope.categories.push(radialTextMenu);

        const energyEfficiency = {
            title: "Energy Efficiency",
            id: "energyEfficiency",
            elements: [
                { Name: 'Color', Property: ['energyEfficiency-color'] },
                { Name: 'Hotspot Pulse Border', Property: ['energyEfficiency-hotspot-pulse-borderColor'] },
                { Name: 'Hotspot Pulse background color', Property: ['energyEfficiency-hotspot-pulse-backgroundColor'] },
                { Name: 'Side Menu Color', Property: ['energyEfficiency-sideMenu-color'] },
                { Name: 'Side Menu Index Color', Property: ['energyEfficiency-sideMenu-categoryIndex-color'] },
                { Name: 'Side Menu Index background color', Property: ['energyEfficiency-sideMenu-categoryIndex-backgroundColor'] },
                { Name: 'Side Menu Index color', Property: ['energyEfficiency-sideMenu-categoryIndex-color-selected'] },
                { Name: 'Side Menu Index background color - selected', Property: ['energyEfficiency-sideMenu-categoryIndex-backgroundColor-selected'] },
                { Name: 'Side Menu Content Color', Property: ['energyEfficiency-sideMenu-content-color'] },
                { Name: 'Side Menu Content Background Color', Property: ['energyEfficiency-sideMenu-content-backgroundColor'] },
            ]
        };
        $scope.categories.push(energyEfficiency);

        const location = {
            title: "Location",
            id: "location",
            elements: [
                { Name: 'Map Mode background color', Property: ['location-mapMode-backgroundColor'] },
                { Name: 'Marker Info header background color', Property: ['location-markerInfo-header-backgroundColor'] },
                { Name: 'Marker Info color(location-markerInfo-color)', Property: ['location-markerInfo-color'] },
                { Name: 'Marker Info background color', Property: ['location-markerInfo-backgroundColor'] },
                { Name: 'Marker Info favorite background color', Property: ['location-markerInfo-favButton-backgroundColor'] },
                { Name: 'Marker Info favorite tail background color', Property: ['location-markerInfo-favButton-tail-backgroundColor'] },
                { Name: 'Add Marker Header color', Property: ['location-addMarkerForm-header-color'] },
                { Name: 'Add Marker Header background color', Property: ['location-addMarkerForm-header-backgroundColor'] },
                { Name: 'Add Marker color', Property: ['location-addMarkerForm-color'] },
                { Name: 'Add Marker background color', Property: ['location-addMarkerForm-backgroundColor'] },
                { Name: 'Add Marker label color', Property: ['location-addMarkerForm-label-color'] },
                { Name: 'Add Marker input color', Property: ['location-addMarkerForm-input-color'] },
                { Name: 'Add Marker input background color', Property: ['location-addMarkerForm-input-backgroundColor'] },
                { Name: 'Add Marker placeholder color', Property: ['location-addMarkerForm-input-placeholder-color'] },
                { Name: 'Add Marker submit button color', Property: ['location-addMarkerForm-submitBtn-color'] },
                { Name: 'Add Marker submit button background color', Property: ['location-addMarkerForm-submitBtn-backgroundColor'] },
                { Name: 'Add Marker bottom arrow color', Property: ['location-addMarkerForm-bottomArrow-color'] },
                { Name: 'Add Marker submit button backgroundColor', Property: ['location-addMarkerBtn-backgroundColor'] },
                { Name: 'Community Map color', Property: ['location-communityMap-color'] },
                { Name: 'Community Map text shadow color', Property: ['location-communityMap-textShadowColor'] },
                { Name: 'Community Map border bottom color', Property: ['location-communityMap-borderBottomColor'] },
                { Name: 'Community Offline Color', Property: ['location-offlineMessage-color'] },
                { Name: 'Community Offline Color - hover', Property: ['location-offlineMessage-color-hover'] }
            ]
        };
        $scope.categories.push(location);

        const registration = {
            title: "Registration",
            id: "registration",
            elements: [
                { Name: 'Complete Registration background Color', Property: ['completeRegistrationButton-backgroundColor'] }
            ]
        };
        $scope.categories.push(registration);

        const scrollBar = {
            title: "Scroll bar",
            id: "scrollBar",
            elements: [
                { Name: 'Track bar Background Color', Property: ['scroll-bar-track-backgroundColor'] },
                { Name: 'Thumb Background Color', Property: ['scroll-bar-thumb-backgroundColor'] }
            ]
        };
        $scope.categories.push(scrollBar);

        const auth = {
            title: "Auth",
            id: "auth",
            elements: [
                { Name: 'Login Form Background color', Property: ['loginForm-backgroundColor'] },
                { Name: 'Login Form header color', Property: ['loginForm-header-color'] },
                { Name: 'Login Form header background color', Property: ['loginForm-header-backgroundColor'] },
                { Name: 'Login Form Submit Button color', Property: ['loginForm-submitBtn-color'] },
                { Name: 'Login Form Submit Button background color', Property: ['loginForm-submitBtn-backgroundColor'] },
                { Name: 'Login Form input color', Property: ['loginForm-input-color'] },
                { Name: 'Login Form input placeholder color', Property: ['loginForm-input-placeHolderColor'] },
                { Name: 'Login Form input background color', Property: ['loginForm-input-borderBottomColor'] },
                { Name: 'Login Form invalid background color', Property: ['loginForm-input-invalid-backgroundColor'] },
                { Name: 'Login Form invalid border color', Property: ['loginForm-input-invalid-borderColor'] }
            ]
        };
        $scope.categories.push(auth);

        const furniture = {
            title: "Furniture",
            id: "furniture",
            elements: [
                { Name: 'Category content color', Property: ['furnitureMenu-category-content-popout-color'] },
                { Name: 'Background Color', Property: ['furnitureMenu-backgroundColor'] },
                { Name: 'Group Text Annotation Color', Property: ['furnitureMenu-group-textAnnotation-color'] },
                { Name: 'Category content popoput background color', Property: ['furnitureMenu-category-content-popout-backgroundColor'] },
                { Name: 'Category content popoput arrow color', Property: ['furnitureMenu-category-content-popout-arrow-color'] },
                { Name: 'Category content popoput border color', Property: ['furnitureMenu-category-content-popout-borderColor'] }
            ]
        };
        $scope.categories.push(furniture);

        const brochure = {
            title: "Brochure",
            id: "brochure",
            elements: [
                { Name: 'Color', Property: ['brochure-color'] },
                { Name: 'Background Color', Property: ['brochure-backgroundColor'] },
                { Name: 'Card Row Title Color', Property: ['brochure-cardRow-title-color'] },
                { Name: 'Card Row Title background Color', Property: ['brochure-cardRow-title-backgroundColor'] },
                { Name: 'Card Row Elevation Color', Property: ['brochure-cardRow-elevation-color'] },
                { Name: 'Card Row Elevation background color', Property: ['brochure-cardRow-elevation-backgroundColor'] },
                { Name: 'Card Row Info background color', Property: ['brochure-cardRow-elevation-info-backgroundColor'] },
                { Name: 'Card Row Info label color', Property: ['brochure-cardRow-elevation-info-label-color'] },
                { Name: 'Card Row Info value color', Property: ['brochure-cardRow-elevation-info-value-color'] }
            ]
        };
        $scope.categories.push(brochure);

        const snapback = {
            title: "Snap Back",
            id: "snapback",
            elements: [
                { Name: 'Background Color', Property: ['snapback-backgroundColor'] },
                { Name: 'Middle spacer color', Property: ['snapback-middleSpacer-color'] },
                { Name: 'Link Color', Property: ['snapback-link-color'] },
                { Name: 'Background Color', Property: ['snapback-link-backgroundColor'] },
                { Name: 'Bottom Border', Property: ['snapback-link-bottomBorderColor'] }
            ]
        };
        $scope.categories.push(snapback);

        const userprofile = {
            title: "User Profile",
            id: "userprofile",
            elements: [
                { Name: 'Column Color', Property: 'Column background color' },
                { Name: 'Column header background color', Property: ['userProfile-column-header-backgroundColor'] },
                { Name: 'Column icon background color', Property: ['userProfile-icon-backgroundColor'] },
                { Name: 'Column input color', Property: ['userProfile-input-color'] },
                { Name: 'Column input placeholder color', Property: ['userProfile-input-placeholder'] },
                { Name: 'Column input background color', Property: ['userProfile-input-backgroundColor'] },
                { Name: 'Register Button Color', Property: ['userProfile-registerBtn-color'] },
                { Name: 'Register Button background Color', Property: ['userProfile-registerBtn-backgroundColor'] },
                { Name: 'Auto Complete Color', Property: ['userProfile-autoComplete-color'] },
                { Name: 'Auto Complete background Color', Property: ['userProfile-autoComplete-backgroundColor'] },
            ]
        };
        $scope.categories.push(userprofile);

        init();
    }

})();