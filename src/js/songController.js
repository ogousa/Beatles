angular.module('songController', [])
.controller('SongController', ['$scope', 'albumsInfo', '$modal', '$filter', '$document', 
    function($scope, albumsInfo, $modal, $filter, $document) {
        $scope.albums = albumsInfo.albums;
        $scope.all = allSongs();
        $scope.resultList = angular.copy($scope.all);

        // Register a body reference to use later
        $scope.bodyRef = angular.element($document[0].body);

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
            return;
        }

        $scope.open = function (size, path) {
            $scope.bodyRef.addClass('bodyFixed');    // add our overflow hidden class on opening
            var modalInstance = $modal.open( {templateUrl: path, controller: 'ModalInstanceController', size: size, scope: $scope} );

            modalInstance.result.then(
                function() {
                    // Remove it on closing
                    $scope.bodyRef.removeClass('bodyFixed');
                }, 
                function () {
                    // Remove it on dismissal
                    $scope.bodyRef.removeClass('bodyFixed');
                }
            );
        }


        $scope.singleModel = 1;
        $scope.radioModel = 'left';

        $scope.checkModel = {
            left: true,
            right: false
          };

        var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse) {
            $scope.resultList = orderBy($scope.all, predicate);
            $scope.searchText = "";
        };

        $scope.searchText = "";
        $scope.search = function(text) {
            $scope.resultList = $filter('findText')($scope.all, text);
        };

    }
]);
