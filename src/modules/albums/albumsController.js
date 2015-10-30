angular.module('albumsController', [])
.controller('AlbumsController', AlbumsController);

AlbumsController.$inject = ['$scope', '$state', 'albumsInfo'];

function AlbumsController($scope, $state, albumsInfo) {
    $scope.albums = albumsInfo.albums;
    songId = -1;

    $scope.onAlbum = function(id) {
    	$state.go('app.album', {id: id});
    }
}
