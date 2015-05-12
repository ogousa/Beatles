/**
 * Main AngularJS Web Application
 */
var app = angular.module('BeatlesApp', ['ngRoute', 'ui.bootstrap', 'discography', 'smoothScroll', 'ngAnimate']);
var songId = -1;

/**
 * Configure the Routes
 */
app.config(['$routeProvider', 
    function ($routeProvider) {
        $routeProvider
        // Home
        .when("/",          {templateUrl: "partials/home.html",     controller: "PageController"})
        .when("/home",      {templateUrl: "partials/home.html",     controller: "PageController"})
        // Pages
        .when("/albums",    {templateUrl: "partials/albums.html",   controller: "PageController"})
        .when("/songs",     {templateUrl: "partials/songs.html",    controller: "PageController"})
        .when("/about",     {templateUrl: "partials/about.html",    controller: "PageController"})
        .when("/album/:id", {templateUrl: "partials/album.html",    controller: "AlbumController"})
        .when("/song",      {templateUrl: "partials/song.html",     controller: "SongController"})
        // else 404
        .otherwise("/404",  {templateUrl: "partials/404.html",      controller: "PageController"});
    }
]);

/**
 * Controls all other Pages
 */
app.controller('PageController', ['$anchorScroll', '$location', '$scope', 'anchorSmoothScroll',
    function ($anchorScroll, $location, $scope, anchorSmoothScroll) {
        $scope.gotoAnchor = function(x) {
            var newHash = x;
            if ($location.hash() !== newHash) {
                // set the $location.hash to newHash and $anchorScroll will automatically scroll to it
                $location.hash(x);
            } else {
                // call $anchorScroll() explicitly, since $location.hash hasn't changed
                $anchorScroll();
            }
        };

        $scope.gotoElement = function (eID){
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash(eID);
     
            // call $anchorScroll()
            anchorSmoothScroll.scrollTo(eID);
        };
    }
]);

app.controller('MyCarouselController', ['$scope',  
    function($scope) {
      $scope.myInterval = 4000;
      $scope.slides = [
        {image: 'images/John.png', caption: "JOHN", id: "john"},
        {image: 'images/Paul.png', caption: "PAUL", id: "paul"},
        {image: 'images/George.png', caption: "GEORGE", id: "george"},
        {image: 'images/Ringo.png', caption: "RINGO", id: "ringo"}
      ];
    }
]);

app.controller('DiskController', ['$scope', 'albumsInfo',
    function($scope, albumsInfo) {
        $scope.albums = albumsInfo.albums;
        songId = -1;
    }
]);

app.controller('SongController', ['$scope', 'albumsInfo', '$modal', '$filter', '$document', 
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
        
        $scope.setSong = function(index) {

            $scope.songId = $scope.all[index].id;
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
        };

        $scope.searchText = "";
        $scope.search = function(text) {
            $scope.resultList = $filter('findText')($scope.all, text);
        };

    }
]);

app.controller('ModalInstanceController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        $scope.ok = function () {
            $scope.bodyRef.removeClass('bodyFixed'); // Remove it on closing
            $modalInstance.close();
        };

        $scope.cancel = function () {
            bodyRef.removeClass('bodyFixed'); // Remove it on closing
            $modalInstance.dismiss('cancel');
        };
    }
]);

app.controller('AlbumController', ['$scope', '$routeParams', 'albumsInfo', '$location', '$anchorScroll', 'anchorSmoothScroll', 
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

app.filter('findText', function() {
  return function(source, text) {
    
    text = text.toLowerCase();
    var out = [];
    for (var i = 0; i < source.length; i++) {
      if(source[i].name.toLowerCase().indexOf(text) != -1)
         out.push(source[i]);
    }
    return out;
  };
})




