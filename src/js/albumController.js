angular.module('albumController', [])
.controller('AlbumController', ['$scope', '$routeParams', 'albumsInfo', '$location', '$anchorScroll', 'anchorSmoothScroll', 
    function($scope, $routeParams, albumsInfo, $location, $anchorScroll, anchorSmoothScroll) {
        $scope.albumId = parseInt($routeParams.id); // get the first part of id (album)
        $scope.songs  = albumsInfo.albums[$scope.albumId-1].songs;
        $scope.image  = albumsInfo.albums[$scope.albumId-1].image;
        $scope.title  = albumsInfo.albums[$scope.albumId-1].title;
        $scope.date   = albumsInfo.albums[$scope.albumId-1].date;

        $scope.setSong = function(index) {
            songId = $scope.albumId + "-" + index; 

        //  $scope.gotoAnchor("songText"); 
            $scope.gotoElement("songText"); 
        }

        $scope.getSongPath = function() {
            return (songId == -1)? null : 'partials/songs/s_' + songId + '.html';
        }
        
        $scope.gotoAnchor = function(x) {
          var newHash = x;
          if($location.hash() !== newHash) 
          {
            $location.hash(x);  // set the $location.hash to newHash and $anchorScroll will automatically scroll to it
          } 
          else 
          {
            $anchorScroll();    // call $anchorScroll() explicitly, since $location.hash hasn't changed
          }
        };

        $scope.gotoElement = function (eID) {
            // set the location.hash to the id of the element you wish to scroll to.
            $location.hash(eID);
            // call $anchorScroll()
            anchorSmoothScroll.scrollTo(eID);
        };
    }
]);
