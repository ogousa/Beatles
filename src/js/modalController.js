angular.module('modalController', [])
.controller('ModalController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close();
        };
    }
]);

