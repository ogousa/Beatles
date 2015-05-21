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
    'albumsController', 
    'songController',
    'modalController'
    ]);

var songId = -1;

/**
 * Configure the Routes
 */
app.config(['$routeProvider', 
    function ($routeProvider) {
        $routeProvider
        .when("/",          {templateUrl: "partials/home.html",     controller: "PageController"})
        .when("/home",      {templateUrl: "partials/home.html",     controller: "PageController"})
        .when("/albums",    {templateUrl: "partials/albums.html",   controller: "AlbumsController"})
        .when("/songs",     {templateUrl: "partials/songs.html",    controller: "SongController"})
        .when("/about",     {templateUrl: "partials/about.html",    controller: "PageController"})
        .when("/album/:id", {templateUrl: "partials/album.html",    controller: "AlbumController"})
        .when("/song",      {templateUrl: "partials/song.html",     controller: "SongController"})
        // else 404
        .otherwise("/",     {templateUrl: "partials/home.html",     controller: "PageController"});
    }
]);

/**
 * Controls all other Pages
 */
app.controller('PageController', ['$scope', '$location', '$anchorScroll', 'anchorSmoothScroll',
    function ($scope, $location, $anchorScroll, anchorSmoothScroll) {
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







