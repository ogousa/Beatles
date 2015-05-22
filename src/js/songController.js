angular.module('songController', [])
.controller('SongController', SongController);

SongController.$inject = ['$scope', 'albumsInfo', '$modal', '$filter', 'goto'];

function SongController($scope, albumsInfo, $modal, $filter, goto) {
    $scope.albums = albumsInfo.albums;
    $scope.all = allSongs();
    $scope.resultList = angular.copy($scope.all);

    goto("fast", "top");

    function allSongs() {
        var $a = []; 
        var n = 0;
        for(var i = 0; i < $scope.albums.length; i++)
        {
            for(var j = 0; j < $scope.albums[i]['songs'].length; j++) 
            {
                $a.push({num: n++, id: (i+1) + "-" + (j + 1), name: $scope.albums[i]['songs'][j]});
            }
        }
        return $a;
    }
    
    $scope.setSong = function(id) {

        $scope.songId = id;
        $scope.open('lg', 'partials/song.html');
    }

    $scope.open = function (size, path) {
        var modalInstance = $modal.open( {templateUrl: path, controller: 'ModalController', size: size, scope: $scope} );
    }

    $scope.singleModel = 1;
    $scope.radioModel = 'left';

    $scope.checkModel = {
        left: true,
        right: false
      };

    var orderBy = $filter('orderBy');
    var order = "num";  // default, can be "name"
    $scope.order = function(predicate, reverse) {
        order = predicate;
        $scope.resultList = orderBy($scope.all, predicate);
        $scope.searchText = "";
    };

    $scope.searchText = "";
    $scope.search = function(text) {
        $scope.resultList = $filter('findText')($scope.all, text);
        $scope.resultList = orderBy($scope.resultList, order);
    };
}
