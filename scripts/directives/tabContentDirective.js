(function () {

    angular.module('csstheme').directive('tabContent', tabContentDirective);

    function tabContentDirective() {
        return {
            templateUrl: '/scripts/views/tabContent.html',
            scope: {
                tab: '='
            },
            link: link
        };

        function link(scope, element) {
            scope.mouseOver = function (prop) {
                scope.$emit('mouse-over', prop)
            }

            scope.mouseOut = function (prop) {
                scope.$emit('mouse-out', prop)
            }

        }
    }
})();