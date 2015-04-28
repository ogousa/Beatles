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
    .when("/album/:id", {templateUrl: "partials/album.html", controller: "albumController"})
    .when("/song/:id", {templateUrl: "partials/song.html", controller: "songController"})
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
  }
]);

app.controller('albumController', ['$scope', '$routeParams', 'albumsInfo',
  function($scope, $routeParams, albumsInfo) {
    $scope.albumId = parseInt($routeParams.id); // get the first part of id (album)
    $scope.songId = $routeParams.id;            // get the song id (album-song)
    $scope.songs  = albumsInfo.albums[$scope.albumId-1].songs;
    $scope.image  = albumsInfo.albums[$scope.albumId-1].image;
    $scope.title  = albumsInfo.albums[$scope.albumId-1].title;
    $scope.date   = albumsInfo.albums[$scope.albumId-1].date;
    $scope.setSong = function(index) {
      $scope.songId = $scope.albumId + "-" + index;  
    }
  }
]);

app.factory('albumsInfo', function() {  
    return {albums: [
    {image: "images/albums/PleasePleaseMe.jpg", title: "Please Please Me", date: "22 March 1963", id: "#/album/1", 
        songs: [
            "I Saw Her Standing There", 
            "Misery", "Anna (Go to Him)", 
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
