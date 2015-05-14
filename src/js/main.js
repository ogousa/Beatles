/**
 * Main AngularJS Web Application
 */
var app = angular.module('BeatlesApp', [
    'ngRoute', 
    'ui.bootstrap', 
    'discography', 
    'smoothScroll', 
    'ngAnimate', 
    'findText', 
    'carouselController', 
    'albumController', 
    'songController'
    ]);

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

app.controller('DiskController', ['$scope', 'albumsInfo',
    function($scope, albumsInfo) {
        $scope.albums = albumsInfo.albums;
        songId = -1;
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






