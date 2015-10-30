angular.module('smoothScroll', [])
.service('anchorSmoothScroll', anchorSmoothScroll);
function anchorSmoothScroll() {
    this.scrollTo = function(eID) {
        // This scrolling function is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        var yOffset = -70;  // my settings (ogo)
        var startY = (self.pageYOffset)? self.pageYOffset : 0;
        var stopY = elmYPosition(eID) + yOffset;

        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if(distance < 100) {
            scrollTo(0, stopY); 
            return;
        }
        var speed = Math.round(distance / 60);
        if(speed >= 40) 
            speed = 40;

        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if(stopY > startY) {
            for(var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; 
                if (leapY > stopY) 
                    leapY = stopY; 
                timer++;
            } 
            return;
        }
        for(var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; 
            if (leapY < stopY) 
                leapY = stopY; 
            timer++;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } 
            return y;
        }
    };
};