angular.module('homeController', [])
.controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'goto'];

function HomeController($scope, goto) {
    $scope.gotoTop = function() {
        goto("fast", "top");
    }
    $scope.gotoId = function(id) {
        goto("fast", id);
    }
}
