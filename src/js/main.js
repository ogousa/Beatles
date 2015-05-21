/**
 * Main AngularJS Web Application
 */
angular.module('BeatlesApp', [
    'ngRoute', 
    'ui.bootstrap', 
    'discography', 
    'smoothScroll', 
    'ngAnimate', 
    'findText', 
    'carouselController', 
    'pageController', 
    'albumController', 
    'albumsController', 
    'songController',
    'modalController'
    ])
.config(['$routeProvider', 
    function ($routeProvider) {
        $routeProvider
        .when("/",          {templateUrl: "partials/home.html",     controller: "PageController"})
        .when("/home",      {templateUrl: "partials/home.html",     controller: "PageController"})
        .when("/about",     {templateUrl: "partials/about.html",    controller: "PageController"})
        .when("/albums",    {templateUrl: "partials/albums.html",   controller: "AlbumsController"})
        .when("/songs",     {templateUrl: "partials/songs.html",    controller: "SongController"})
        .when("/song",      {templateUrl: "partials/song.html",     controller: "SongController"})
        .when("/album/:id", {templateUrl: "partials/album.html",    controller: "AlbumController"})
        // else 404
        .otherwise("/",     {templateUrl: "partials/home.html",     controller: "PageController"});
    }
]);
