var RCRApp = angular.module('RCRApp', [])
RCRApp.service("breadcrumbServiceProvider", function($http, $window, $rootScope, genericSetting, perDimensionSetting, restProvider, $q, inputRequest, createRequestProvider) {

    this.callRestQuery = function(selectedFilter, selectedView) {
        if (!busy) {
            busy = true;
            breadcrumbServiceProvider.calRestQueryForProjectName();

            getAllRCR(selectedFilter, selectedView).success(function(response) {
                busy = false;
                //window.bala = response;
                selectedFilter = "";
                selectedView = "";
                $rootScope.$broadcast('applyFilter', {
                    data: response,
                });
            });
            pageNumber += 1;
        }
    };
    return {
        useDependency: function() {
            return $http.getSomething();
            return $window.getSomething();
            return breadcrumbServiceProvider.getSomething();
            return genericSetting.getSomething();
            return perDimensionSetting.getSomething();
            return $rootScope.getSomething();
            return restProvider.getSomething();
        }
    };
});