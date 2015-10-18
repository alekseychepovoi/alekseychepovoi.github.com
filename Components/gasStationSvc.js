angular.module('GasStation').factory('GasStationSvc', function ($http) {
    var rootApi = 'http://api.openchargemap.io/v2/poi/?output=json';

    return {
        getAllGasStations: getAllGasStations
    };

    // distance defaults to Miles
    function getAllGasStations(latitude, longitude, distance) {
        return $http.get(rootApi + '&latitude=' + latitude + '&longitude=' + longitude + '&distance=' + distance)
            .then($http.getDataFromResult);
    }
});