angular.module('albumsController', [])
.controller('AlbumsController', AlbumsController);

AlbumsController.$inject = ['$scope', 'albumsInfo', 'goto'];

function AlbumsController($scope, albumsInfo, goto) {
    $scope.albums = albumsInfo.albums;
    songId = -1;

    goto("fast", "top");
}
