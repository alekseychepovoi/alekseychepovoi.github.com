angular.module('GasStation').controller('GasStationCtrl', function ($scope, $window, GasStationSvc) {
    var vm = this;

    vm.filterParams = {
        latitude: 40.71451,
        longitude: -74.00639,
        distance: 50,
        zoom: 10
    };
    vm.mapParams = angular.copy(vm.filterParams);
    vm.markersOptions = [];
    vm.mapOptions = getMapOptions();
    vm.filterItems = filterItems;
    vm.showInfoForAllItems = false;

    filterItems();

    function filterItems() {
        vm.mapParams = angular.copy(vm.filterParams);
        GasStationSvc.getAllGasStations(vm.filterParams.latitude, vm.filterParams.longitude, vm.filterParams.distance).then(function (data) {
            updateMarkerOptions(data);
            vm.mapOptions = getMapOptions();
            vm.numberOfStations = vm.markersOptions.length;
        });
    }

    function getMapOptions() {
       return '{center: [' + vm.filterParams.latitude + ', ' + vm.filterParams.longitude + '], zoom: ' + vm.filterParams.zoom + ', mapTypeId: google.maps.MapTypeId.ROADMAP}';
    }

    function updateMarkerOptions(initData) {
        vm.markersOptions = [];
        initData.forEach(function (item) {
            vm.markersOptions.push({
                latitude: item.AddressInfo.Latitude,
                longitude: item.AddressInfo.Longitude,
                info: getStationInfo(item),
                showInfo: false
            });
        });
    }

    function getStationInfo(station) {
        var info = '';

        if(station.OperatorInfo) {
            info += 'Operator: ' + station.OperatorInfo.Title;
        }
        if(station.AddressInfo) {
            info += '<br />' + 'Address: ' + station.AddressInfo.AddressLine1;
        }
        return info;
    }
});