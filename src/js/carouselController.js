angular.module('carouselController', [])
.controller('MyCarouselController', ['$scope',  
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