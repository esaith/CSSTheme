(function () {
    angular.module('csstheme', ['color.picker'])
        .config(function ($provide) {
            $provide.decorator('ColorPickerOptions', function ($delegate) {
                // https://www.npmjs.com/package/angularjs-color-picker
                var options = angular.copy($delegate);

                options.required = false;
                options.format = 'hexString';
                options.alpha = false;

                return options;
            });
        });
})();
