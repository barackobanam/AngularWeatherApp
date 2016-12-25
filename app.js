var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);

weatherApp.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: 'pages/home.html',
        controller : 'homeController'
    })

    .when('/forecast',{
        templateUrl : 'pages/forecast.html',
        controller : 'forecastController'
    })

    .when('/forecast/:days',{
        templateUrl : 'pages/forecast.html',
        controller : 'forecastController'
    });
});

weatherApp.service('cityService',function(){
    this.city = 'Ha Noi';
});


weatherApp.controller('homeController',['$scope','$location','cityService',function($scope,$location,cityService){
    $scope.city = cityService.city;

    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    });

    $scope.submit = function(){
        $location.path('/forecast');
    }
}]);

weatherApp.controller('forecastController',['$scope','$http','$routeParams','cityService',function($scope,$http,$routeParams,cityService){
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;
    $scope.weatherResult  = [];
    $http.get('http://api.openweathermap.org/data/2.5/forecast/daily',{
        params:{
            q:$scope.city,
            mode:'json',
            appid:'d939d9dcbba2a4d294b730a05d17ff85',
            cnt:$scope.days,
            units:'metric',
            lang:'vi'
        }

    }).success(function(data){
        $scope.weatherResult = data;
        console.log($scope.weatherResult);
    });

    $scope.convertTodate = function(dt){
        return new Date(dt * 1000);
    }


}]);

weatherApp.directive('weatherResult',function(){
    return {
        templateUrl : 'templates/weather.html',
        replace:true,
        scope:{
            weatherObj : '=',
            convertDateFunction : '&',
            formatDate : '@'
        }
    }
})