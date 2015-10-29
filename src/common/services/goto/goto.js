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
	        anchorSmoothScroll.scrollTo(x);
		}
	};
}
