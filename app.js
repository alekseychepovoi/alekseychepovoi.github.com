angular.module('GasStation', [
    'ngRoute',
    'GoogleMapsNative'
]).config(function($locationProvider, $routeProvider, $provide) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $provide.decorator('$http', function ($delegate) {
        $delegate.getDataFromResult = function (result) {
            return result.data;
        };

        return $delegate;
    });

    $routeProvider
        .when('/', {
            templateUrl: '/Components/gasStation.html',
            controller: 'GasStationCtrl',
            controllerAs: 'vm'
        })
});