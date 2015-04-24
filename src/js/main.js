/**
 * Main AngularJS Web Application
 */
var app = angular.module('BeatlesApp', ['ngRoute', 'ui.bootstrap']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    .when("/home", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/albums", {templateUrl: "partials/albums.html", controller: "PageCtrl"})
    .when("/songs", {templateUrl: "partials/songs.html", controller: "PageCtrl"})
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', ['$anchorScroll', '$location', '$scope',
  function ($anchorScroll, $location, $scope) {
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
  }
]);

function runCarousel($scope){
  $scope.myInterval = 4000;
  $scope.slides = [
    {image: 'images/John.png', caption: "JOHN", id: "john"},
    {image: 'images/Paul.png', caption: "PAUL", id: "paul"},
    {image: 'images/George.png', caption: "GEORGE", id: "george"},
    {image: 'images/Ringo.png', caption: "RINGO", id: "ringo"}
  ];
}