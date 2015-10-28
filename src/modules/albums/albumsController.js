angular.module('albumsController', [])
.controller('AlbumsController', AlbumsController);

AlbumsController.$inject = ['$scope', '$state', 'albumsInfo', 'goto'];

function AlbumsController($scope, $state, albumsInfo, goto) {
    $scope.albums = albumsInfo.albums;
    songId = -1;

    goto("fast", "top");

    $scope.onAlbum = function(id) {
    	$state.go('app.album', {id: id});
    }
}
