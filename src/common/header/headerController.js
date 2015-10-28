angular.module('headerController', [])
.controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$state'];

function HeaderCtrl($scope, $state) {

	// set focus on the current item in menu after page refresh
	$scope.$on('$includeContentLoaded', function() {
		var headerId = $state.current.url;
		if(headerId == 'album/{id:int}')
			return;

		angular.element(document.querySelector('#' + headerId)).focus();
	})
}
