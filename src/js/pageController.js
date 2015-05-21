angular.module('pageController', [])
.controller('PageController', PageController);

PageController.$inject = ['$scope', '$location', '$anchorScroll', 'anchorSmoothScroll'];

function PageController($scope, $location, $anchorScroll, anchorSmoothScroll) {
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
