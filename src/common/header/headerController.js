angular.module('headerController', [])
.controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$state', 'goto'];

function HeaderCtrl($scope, $state, goto) {

	// set focus on the current item in menu after page refresh
	$scope.$on('$includeContentLoaded', function() {
		var headerId = $state.current.url;
		if(headerId == 'album/{id:int}')
			return;

		angular.element(document.querySelector('#' + headerId)).focus();
	})

	$scope.$on('$stateChangeSuccess', function() {
		goto("fast", "top");
	});

	// close dropdown menu
	$scope.onMenuClick = function() {
		angular.element(document.querySelector('#menu')).collapse('hide');
	}
}
