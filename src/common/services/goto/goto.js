angular.module('goto', [])
.factory('goto', goto);

goto.$inject = ['$location', '$anchorScroll', 'anchorSmoothScroll'];

function goto($location, $anchorScroll, anchorSmoothScroll) {
	return function(how, x) {

		if(how == "fast")
		{
			var newHash = x;
			if($location.hash() !== newHash) 
			{
				$location.hash(x);  // set the $location.hash to newHash and $anchorScroll will automatically scroll to it
			} 
			else 
			{
				$anchorScroll();    // call $anchorScroll() explicitly, since $location.hash hasn't changed
			}
		}
		else if(how == "slow")
		{
	        // set the location.hash to the id of the element you wish to scroll to.
	        $location.hash(x);
	        anchorSmoothScroll.scrollTo(x);
		}
	};
}
