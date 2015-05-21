angular.module('albumsController', [])
.controller('AlbumsController', ['$scope', 'albumsInfo',
    function($scope, albumsInfo) {
        $scope.albums = albumsInfo.albums;
        songId = -1;
    }
]);

