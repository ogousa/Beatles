angular.module('modalController', [])
.controller('ModalController', ModalController);

ModalController.$inject = ['$scope', '$modalInstance'];

function ModalController($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close();
    };
}

