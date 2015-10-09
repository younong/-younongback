define(['common/directives'], function (directives) {
    directives.directive('pagination', function () {
        return {
            restrict: 'E',
            template: '',
            replace: true,
            link: function (scope, element, attrs) {
                scope.$watch('numPages', function (value) {
                    scope.pages = [];
                    for (var i = 1; i <= value; i++) {
                        scope.pages.push(i);
                    }
                    if (scope.currentPage > value) {
                        scope.selectPage(value);
                    }
                });
                scope.isActive = function (page) {
                    return scope.currentPage === page;
                };
                scope.selectPage = function (page) {
                    if (!scope.isActive(page)) {
                        scope.currentPage = page;
                        scope.onSelectPage(page);
                    }
                };
                scope.selectPrevious = function () {
                    if (!scope.noPrevious()) {
                        scope.selectPage(scope.currentPage - 1);
                    }
                };
                scope.selectNext = function () {
                    if (!scope.noNext()) {
                        scope.selectPage(scope.currentPage + 1);
                    }
                };
                scope.noPrevious = function () {
                    return scope.currentPage == 1;
                };
                scope.noNext = function () {
                    return scope.currentPage == scope.numPages;
                };

            }
        };
    });
});
