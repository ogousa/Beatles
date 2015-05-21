angular.module('albumsController', [])
.controller('AlbumsController', AlbumsController);

AlbumsController.$inject = ['$scope', 'albumsInfo'];

function AlbumsController($scope, albumsInfo) {
    $scope.albums = albumsInfo.albums;
    songId = -1;
}
