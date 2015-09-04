'use strict';
$(document).ready(function(){

    var findBootstrapEnvironment = function() {
        var envs = ['xs', 'sm', 'md', 'lg'];

        var el = $('<div>');
        el.appendTo($('body'));

        for (var i = envs.length - 1; i >= 0; i--) {
            var env = envs[i];

            el.addClass('hidden-'+env);
            if (el.is(':hidden')) {
                el.remove();
                return env
            }
        };
    }

    var panels = function(){
      var ho = 45;
      var h = $(window).height() - ho;
      
      $('#side, #content').css({
          'height': h+'px',
          'top': ho+'px'
      });

      $('.ps-scroller')
          .perfectScrollbar();

    }



    panels();
    $(window).resize(function(){
        panels();
    });

    setTimeout(function(){
      $('.github-btn-con').removeClass('hide');
      $('.github-btn-con').css("margin-top","8px");
    }, 1200);

    var env = findBootstrapEnvironment();

    // Start as collapsed for small devices
    if(env === 'xs' || env === 'sm'){
        $("#side").toggleClass('do-collapse');
    }

    $('a.collapser').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#side").toggleClass('do-collapse');
        if($("#side").hasClass('do-collapse')){
            //$("#side").width('40px');
            $("#content").innerWidth(($(window).width()-41)+'px');
            if(env === 'xs' || env === 'sm'){
                $("#side").css('z-index', '1');
                //$("#content").css('left', '');
            }
            //console.info($("#content").width(), $(window).width()-41);
        } else {
            $("#side").width('');
            $("#content").width('');
            if(env === 'xs' || env === 'sm'){
                $("#side").css('z-index', '3');
                //$("#content").css('left', '260px');
            }
        }
    });
    
});

/**
 * @ngdoc overview
 * @name anyandgoApp
 * @description
 * # anyandgoApp
 *
 * Main module of the application.
 */
angular
  .module('anyandgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ])
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    //$locationProvider.html5Mode(true).hashPrefix('!');
    //$cookies.lang = "en-us";
    /*
    $routeProvider
      .when('/', {
        templateUrl: '/scripts/admin/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      }); */
  }).run(function ($rootScope, $location, $route, $timeout, $http, $cookies, $anchorScroll) {

    /*
    */

    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.config.app_path = $location.path();
    $rootScope.layout = {};
    $rootScope.layout.loading = false;
      
    //$anchorScroll.yOffset = 50;

    $rootScope.gotoAnchor = function(x) {
      var newHash = x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash(x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    }; 

    if(!navigator.userAgent.match(/Zombie/)) {

    $rootScope.$on('$routeChangeStart', function () {
        console.log('$routeChangeStart');
        //show loading gif
        $timeout(function(){
          $rootScope.layout.loading = true;          
        });
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        console.log('$routeChangeSuccess');
        //hide loading gif
        $timeout(function(){
          $rootScope.layout.loading = false;
        }, 200);
    });
    $rootScope.$on('$routeChangeError', function () {

        //hide loading gif
        console.log('error');
        $rootScope.layout.loading = false;

    });

    }

  });

