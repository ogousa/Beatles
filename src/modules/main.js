/**
 * Main AngularJS Web Application
 */
angular.module('app', [
    'oc.lazyLoad', 
    'ui.router', 
    'ui.bootstrap', 
    'ngAnimate', 
    'smoothScroll', 
    'goto'
])
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        debug:false,
        events:false
    });

    $urlRouterProvider.otherwise('home');

    $stateProvider
        .state('app',{
            url: '/',
            templateUrl: 'modules/main.html',
            controller: 'HeaderCtrl',
            resolve: {
                loadMyServices: function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name: 'discography',
                        files: ['common/services/discography/discography.js']
                    }),
                    $ocLazyLoad.load({
                        name: 'HeaderCtrl',
                        files: ['common/header/headerController.js']
                    }),
                    $ocLazyLoad.load({
                        name: 'findText',
                        files: ['common/filters/findText/findText.js']
                    }),
                    $ocLazyLoad.load({
                        name: 'modalController',
                        files: ['common/modal/modalController.js']
                    })
                }
            }
        })

            .state('app.home',{
                url: 'home',
                deepStateRedirect: true,
                sticky: true,
                views: {
                    'home': {
                        controller: 'HomeController',
                        templateUrl: 'modules/home/home.html'
                    }
                },
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'HomeController',
                            files: ['modules/home/homeController.js', 'modules/home/carouselController.js']
                        })
                    }
                }
            })

            .state('app.albums', {
                url: 'albums',
                deepStateRedirect: true,
                sticky: true,
                views: {
                    'albums': {
                        controller: 'AlbumsController',
                        templateUrl: 'modules/albums/albums.html'
                    }
                },
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'AlbumsController',
                            files: ['modules/albums/albumsController.js']
                        })
                    }
                }
            })   

            .state('app.album', {
                url: 'album/{id:int}',
                deepStateRedirect: true,
                sticky: true,
                views: {
                    'album': {
                        controller: 'AlbumController',
                        templateUrl: 'modules/albums/album.html'
                    }
                },
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'AlbumController',
                            files: ['modules/albums/albumController.js']
                        })
                    }
                }
            })   

            .state('app.songs', {
                url: 'songs',
                deepStateRedirect: true,
                sticky: true,
                views: {
                    'songs': {
                        controller: 'SongController',
                        templateUrl: 'modules/songs/songs.html'
                    }
                },
                resolve: {
                    loadMyFiles:function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'SongController',
                            files: ['modules/songs/songController.js']
                        })
                    }
                }
            })   
            
            .state('app.about', {
                url: 'about',
                deepStateRedirect: true,
                sticky: true,
                views: {
                    'about': {
                        templateUrl: 'modules/about/about.html'
                    }
                }
            })
    }
])
.config(['$compileProvider', function ($compileProvider) {
    // to improve performance disable appending scope to elements, making scopes inaccessible from the console.
    $compileProvider.debugInfoEnabled(false); 
}])
.run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$state = $state;
}]);

