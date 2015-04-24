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

function runAlbums($scope){
  $scope.albums = [
    {image: "images/albums/PleasePleaseMe.jpg", title: "Please Please Me", date: "22 March 1963", id: "01"},
    {image: "images/albums/WithTheBeatles.jpg", title: "With The Beatles", date: "22 November 1963", id: "02"},
    {image: "images/albums/HardDay'sNight.jpg", title: "A Hard Day's Night", date: "26 June 1964", id: "03"},
    {image: "images/albums/BeatlesForSale.jpg", title: "Beatles For Sale", date: "4 December 1964", id: "04"},
    {image: "images/albums/Help.jpg", title: "Help!", date: "6 August 1965", id: "05"},
    {image: "images/albums/RubberSoul.jpg", title: "Rubber Soul", date: "3 December 1965", id: "06"},
    {image: "images/albums/Revolver.jpg", title: "Revolver", date: "5 August 1966", id: "07"},
    {image: "images/albums/Sgt.Pepper'sLonelyHeartsClubBand.jpg", title: "Sgt. Pepper's Lonely Hearts Club Band", date: "1 June 1967", id: "08"},
    {image: "images/albums/MagicalMysteryTour.jpg", title: "Magical Mystery Tour", date: "27 November 1967", id: "09"},
    {image: "images/albums/TheBeatles.jpg", title: "The Beatles", date: "22 November 1968", id: "10"},
    {image: "images/albums/YellowSubmarine.jpg", title: "Yellow Submarine", date: "17 January 1969", id: "11"},
    {image: "images/albums/AbbeyRoad.jpg", title: "Abbey Road", date: "26 September 1969", id: "12"},
    {image: "images/albums/LetItBe.jpg", title: "Let It Be", date: "8 May 1970", id: "13"},
  ];
}
