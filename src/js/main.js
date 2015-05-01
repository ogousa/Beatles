/**
 * Main AngularJS Web Application
 */
var app = angular.module('BeatlesApp', ['ngRoute', 'ui.bootstrap']);
var songId = -1;

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
    .when("/album/:id", {templateUrl: "partials/album.html", controller: "albumController"})
    .when("/song/:id", {templateUrl: "partials/song.html", controller: "songController"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', ['$anchorScroll', '$location', '$scope', 'anchorSmoothScroll',
  function ($anchorScroll, $location, $scope, anchorSmoothScroll) {
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
]);

app.controller('carouselController', ['$scope',
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

app.controller('diskController', ['$scope', 'albumsInfo',
    function($scope, albumsInfo) {
        $scope.albums = albumsInfo.albums;
        songId = -1;
    }
]);

app.controller('songController', function($scope, albumsInfo, $modal, $filter, $document) {
    $scope.albums = albumsInfo.albums;
    $scope.all = allSongs();

    // Register a body reference to use later
    $scope.bodyRef = angular.element($document[0].body);

    function allSongs() {
        var $a = []; 
        var n = 0;
        for(var i = 0; i < $scope.albums.length; i++)
        {
            for(var j = 0; j < $scope.albums[i]['songs'].length; j++) 
            {
                $a.push({num: n++, id: (i+1) + "-" + (j + 1), name: $scope.albums[i]['songs'][j]});
            }
        }
        return $a;
    }
    
    $scope.setSong = function(index) {

        $scope.songId = $scope.all[index].id;
        $scope.open('lg', 'partials/song.html');
        return;
    }

    $scope.open = function (size, path) {
        $scope.bodyRef.addClass('bodyFixed');    // add our overflow hidden class on opening
        var modalInstance = $modal.open( {templateUrl: path, controller: 'ModalInstanceCtrl', size: size, scope: $scope} );

        modalInstance.result.then(
            function() {
                // Remove it on closing
                $scope.bodyRef.removeClass('bodyFixed');
            }, 
            function () {
                // Remove it on dismissal
                $scope.bodyRef.removeClass('bodyFixed');
            }
        );
    }


    $scope.singleModel = 1;
    $scope.radioModel = 'left';

    $scope.checkModel = {
        left: true,
        right: false
      };

    var orderBy = $filter('orderBy');
    $scope.order = function(predicate, reverse) {
        $scope.all = orderBy($scope.all, predicate);
    };

});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
        $scope.bodyRef.removeClass('bodyFixed'); // Remove it on closing
        $modalInstance.close();
    };

    $scope.cancel = function () {
        bodyRef.removeClass('bodyFixed'); // Remove it on closing
        $modalInstance.dismiss('cancel');
    };
});

app.controller('albumController', function($scope, $routeParams, albumsInfo, $location, $anchorScroll, anchorSmoothScroll) {
    $scope.albumId = parseInt($routeParams.id); // get the first part of id (album)
    $scope.songs  = albumsInfo.albums[$scope.albumId-1].songs;
    $scope.image  = albumsInfo.albums[$scope.albumId-1].image;
    $scope.title  = albumsInfo.albums[$scope.albumId-1].title;
    $scope.date   = albumsInfo.albums[$scope.albumId-1].date;

    $scope.setSong = function(index) {
        songId = $scope.albumId + "-" + index; 

    //  $scope.gotoAnchor("songText"); 
        $scope.gotoElement("songText"); 
    }


    $scope.getSongPath = function() {
        return (songId == -1)? null : 'partials/songs/s_' + songId + '.html';
    }
    
    $scope.gotoAnchor = function(x) {
      var newHash = x;
      if($location.hash() !== newHash) 
      {
        $location.hash(x);  // set the $location.hash to newHash and $anchorScroll will automatically scroll to it
      } 
      else 
      {
        $anchorScroll();    // call $anchorScroll() explicitly, since $location.hash hasn't changed
      }
    };

    $scope.gotoElement = function (eID) {
        // set the location.hash to the id of the element you wish to scroll to.
        $location.hash(eID);
        // call $anchorScroll()
        anchorSmoothScroll.scrollTo(eID);
    };

});

app.service('anchorSmoothScroll', function(){
    this.scrollTo = function(eID) {
        // This scrolling function is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        var yOffset = -70;  // my settings (ogo)
        var startY = currentYPosition();
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
            for( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } 
            return;
        }
        for( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) 
                return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) 
                return document.body.scrollTop;
            return 0;
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
    
});


app.factory('albumsInfo', function() {  
    return {albums: [
    {image: "images/albums/PleasePleaseMe.jpg", title: "Please Please Me", date: "22 March 1963", id: "#/album/1", 
        songs: [
            "I Saw Her Standing There", 
            "Misery", 
            "Anna (Go to Him)", 
            "Chains",  
            "Boys", 
            "Ask Me Why",
            "Please Please Me", 
            "Love Me Do", 
            "P.S. I Love You", 
            "Baby it's You", 
            "Do You Want to Know a Secret ?", 
            "A Taste of Honey", 
            "There's a Place", 
            "Twist and Shout"]
    },
    {image: "images/albums/WithTheBeatles.jpg", title: "With The Beatles", date: "22 November 1963", id: "#/album/2",
        songs: [
            "It Won't Be Long",  
            "All I've Got to Do",  
            "All My Loving",  
            "Don't Bother Me",  
            "Little Child",  
            "Till There Was You",  
            "Please Mister Postman",  
            "Roll Over Beethoven",  
            "Hold Me Tight",  
            "You Really Got a Hold on Me",  
            "I Wanna Be Your Man",  
            "Devil in Her Heart",  
            "Not a Second Time",  
            "Money (That's What I Want)"] 
    },
    {image: "images/albums/HardDay'sNight.jpg", title: "A Hard Day's Night", date: "26 June 1964", id: "#/album/3",
        songs: [
            "A Hard Day's Night",  
            "I Should Have Known Better",  
            "If I Fell",  
            "I'm Happy Just To Dance With You",  
            "And I Love Her",  
            "Tell Me Why",  
            "Can't Buy Me Love",  
            "Any Time At All",  
            "I'll Cry Instead",  
            "Things We Said Today",  
            "When I Get Home",  
            "You Can't Do That",  
            "I'll Be Back"]
    },
    {image: "images/albums/BeatlesForSale.jpg", title: "Beatles For Sale", date: "4 December 1964", id: "#/album/4",
        songs: [
            "No Reply",  
            "I'm A Loser",  
            "Baby's In Black",  
            "Rock And Roll Music",  
            "I'll Follow The Sun",  
            "Mr. Moonlight",  
            "Kansas City/Hey Hey Hey Hey",  
            "Eight Days A Week",  
            "Words Of Love",  
            "Honey Don't",  
            "Every Little Thing",  
            "I Don't Want To Spoil The Party",  
            "What You're Doing",  
            "Everybody's Trying To Be My Baby"]
    },
    {image: "images/albums/Help.jpg", title: "Help!", date: "6 August 1965", id: "#/album/5", 
        songs: [
            "Help!",  
            "The Night Before",  
            "You've Got To Hide Your Love Away",  
            "I Need You",  
            "Another Girl",  
            "You're Gonna Lose That Girl",  
            "Ticket To Ride",  
            "Act Naturally",  
            "It's Only Love",  
            "You Like Me Too Much",  
            "Tell Me What You See",  
            "I've Just Seen a Face",  
            "Yesterday",  
            "Dizzy Miss Lizzy"]
    },
    {image: "images/albums/RubberSoul.jpg", title: "Rubber Soul", date: "3 December 1965", id: "#/album/6",
        songs: [
            "Drive My Car",  
            "Norwegian Wood (This Bird Has Flown)",  
            "You Won't See Me",  
            "Nowhere Man",  
            "Think For Yourself",  
            "The Word",  
            "Michelle",  
            "What Goes On?",  
            "Girl",  
            "I'm Looking Thorough You",  
            "In My Life",  
            "Wait",  
            "If I Needed Someone",  
            "Run For Your Life"]
    },
    {image: "images/albums/Revolver.jpg", title: "Revolver", date: "5 August 1966", id: "#/album/7",
        songs: [
            "Taxman",  
            "Eleanor Rigby",  
            "I'm Only Sleeping",  
            "Love You To",  
            "Here, There and Everywhere",  
            "Yellow Submarine",  
            "She Said She Said",  
            "Good Day Sunshine",  
            "And Your Bird Can Sing",  
            "For No One",  
            "Doctor Robert",  
            "I Want To Tell You",  
            "Got To Get You Into My Life",  
            "Tomorrow Never Knows"]
    },
    {image: "images/albums/Sgt.Pepper'sLonelyHeartsClubBand.jpg", title: "Sgt. Pepper's Lonely Hearts Club Band", date: "1 June 1967", id: "#/album/8",
        songs: [
            "Sgt Pepper's Lonely Heart's Club Band",  
            "With a Little Help From My Friends",  
            "Lucy In The Sky With Diamonds",  
            "Getting Better",  
            "Fixing A Hole",  
            "She's Leaving Home",  
            "Being For The Benefit Of Mr. Kite!",  
            "Within You Without You",  
            "When I'm Sixty-Four",  
            "Lovely Rita",  
            "Good Morning Good Morning",  
            "Sgt. Pepper's Lonely Heart's Club Band (reprise)",  
            "A Day In The Life"]
    },
    {image: "images/albums/MagicalMysteryTour.jpg", title: "Magical Mystery Tour", date: "27 November 1967", id: "#/album/9",
        songs: [
            "Magical Mystery Tour",  
            "The Fool On The Hill",  
            "Flying",  
            "Blue Jay Way",  
            "Your Mother Should Know",  
            "I Am The Walrus",  
            "Hello Goodbye",  
            "Strawberry Fields Forever",  
            "Penny Lane",  
            "Baby, You're A Rich Man",  
            "All You Need Is Love"]
    },
    {image: "images/albums/TheBeatles.jpg", title: "The Beatles", date: "22 November 1968", id: "#/album/10",
        songs: [
            "Back In The USSR",  
            "Dear Prudence",  
            "Glass Onion",  
            "Ob-La-Di, Ob-La-Da",  
            "Wild Honey Pie",  
            "The Continuing Story Of Bungalow Bill",  
            "While My Guitar Gently Weeps",  
            "Happiness Is A Warm Gun",  
            "Martha My Dear",  
            "I'm So Tired",  
            "Blackbird",  
            "Piggies",  
            "Rocky Raccoon",  
            "Don't Pass Me By",  
            "Why Don't We Do It In The Road?",  
            "I Will",  
            "Julia",  
            "Birthday",  
            "Yer Blues",  
            "Mother Nature's Son",  
            "Everybody's Got Something To Hide Except For Me And My Monkey",  
            "Sexy Sadie",  
            "Helter Skelter",  
            "Long Long Long",  
            "Revolution 1",  
            "Honey Pie",  
            "Savoy Truffle",  
            "Cry Baby Cry",  
            "Revolution 9",  
            "Good Night"]
    },
    {image: "images/albums/YellowSubmarine.jpg", title: "Yellow Submarine", date: "17 January 1969", id: "#/album/11",
        songs: [
            "Yellow Submarine",  
            "Only a Northern Song",  
            "All Together Now",  
            "Hey Bulldog",  
            "It's All Too Much",  
            "All You Need is Love",  
            "Pepperland",  
            "Medley: Sea of Time & Sea of Holes",  
            "Sea of Monsters",  
            "March of Meanies",  
            "Pepperland Laid Waste",  
            "Yellow Submarine in Pepperland"]
    },
    {image: "images/albums/AbbeyRoad.jpg", title: "Abbey Road", date: "26 September 1969", id: "#/album/12",
        songs: [
            "Come Together",   
            "Something",   
            "Maxwell's Silver Hammer",   
            "Oh! Darling",   
            "Octopus's Garden",   
            "I Want You",   
            "Here Comes the Sun",   
            "Because",   
            "You Never Give Me Your Money",   
            "Sun King",   
            "Mean Mr. Mustard",   
            "Polythene Pam",   
            "She Came in Through the Bathroom Window",   
            "Golden Slumbers",   
            "Carry That Weight",   
            "The End",   
            "Her Majesty"]
    },
    {image: "images/albums/LetItBe.jpg", title: "Let It Be", date: "8 May 1970", id: "#/album/13",
        songs: [
            "Two of Us",  
            "Dig a Pony",  
            "Across the Universe",  
            "I Me Mine",  
            "Dig It",  
            "Let It Be",  
            "Maggie Mae",  
            "I've Got a Feeling",  
            "One After 909",  
            "The Long and Winding Road",  
            "For You Blue",  
            "Get Back"]
    }
  ]};
});
