angular.module('pageController', [])
.controller('PageController', PageController);

PageController.$inject = ['$scope', 'goto'];

function PageController($scope, goto) {
    $scope.gotoTop = function() {
        goto("fast", "top");
    }
    $scope.gotoId = function(id) {
        goto("fast", id);
    }
}
