var RCRApp = angular.module('RCRApp', []);
RCRApp.service("filterProvider", function($http, $window, $rootScope, restProvider, genericSetting, perDimensionSetting, breadcrumbServiceProvider) {
    $rootScope.package = {
        name: 'testmodule'
    };
    var inputRequest = {
        "Metadata": {
            //"ip": $window.ipProvider.PromiseValue,
            "userId": $window.loggedinUserId,
            "clientType": "Web Application",
            "version": "1.0"
        },
        "request": {
            "paginationInfo": {
                "pagesize": "",
                "pageNumber": ""
            },
            "criteriaList": ""
        },
        "user": {
            "userId": "",
            "email": "",
            "firstName": "",
            "lastName": "",
            "ntId": $window.loggedinUserId
        }
    };

    //var pagesize = parseInt(genericSetting.getGenericConstants().pagesize);    both commented lines have an error as undefined constructor 
    var pageNumber = 0;

    this.resetPageDetails = function() {
        pagesize = parseInt(genericSetting.getGenericConstants().pagesize);
        pageNumber = 0;
    };

    this.getPageNumber = function() {
        return pageNumber;
    };

    this.setPageNumber = function(value) {
        pageNumber = value;
    };

    var selectedView = "";

    this.getSelectedView = function() {
        return selectedView;
    };

    var selectedFilter = "";

    this.getSelectedFilter = function() {
        return selectedFilter;
    };

    var busy = false;

    function getAllRCR(filterSelected, viewSelected) {
        selectedView = viewSelected;
        selectedFilter = filterSelected;
        inputRequest.request.criteriaList = filterSelected;
        inputRequest.request.paginationInfo.pageNumber = pageNumber;
        inputRequest.request.paginationInfo.pagesize = pagesize;
        var RCRObj = "";
        if (viewSelected == genericSetting.getGenericConstants().rcr_myrequests) {

        } else if (viewSelected == genericSetting.getGenericConstants().rcr_favorites) {
            RCRObj = restProvider.getREST_OBJECT().GET_FAV_RCR;
            RCRObj.data = inputRequest;
        } else if (viewSelected == genericSetting.getGenericConstants().rcr_allrequests) {
            RCRObj = restProvider.getREST_OBJECT().GET_ALL_RCR;
            RCRObj.data = inputRequest;
        }
        return $http(RCRObj);
    };

    RCRApp.service("breadcrumbServiceProvider", function($http, $window, $rootScope, genericSetting, perDimensionSetting, restProvider, $q, inputRequest, createRequestProvider) {


        var dropdownListForNew = pushBreadServiceCrumbSection(perDimensionSetting.getDimensionConstants().breadcrumbServiceSection);

        this.getDropdownListForNew = function() {
            return dropdownListForNew;
        };

        var linksectionFromTmf = {
            "name": "Go To Reports",
            "image": ""
        };

        this.getLinksectionFromTmf = function() {
            return linksectionFromTmf;
        };

        var buttonsectionFromTmf = {
            "name": "New",
            "image": "/cg510_rcr_commonbd/Core/image/add.png"
        };

        this.getButtonsectionFromTmf = function() {
            return buttonsectionFromTmf;
        };

        var openSectionFromTmf = [{
            "id": "1",
            "templateUrl": "request.html",
            "controller": "requestController"
        }];


        this.getOpenSectionFromTmf = function() {
            return openSectionFromTmf;
        };

        function pushBreadCrumbServiceSection(modeConfig) {
            var BreadcrumbServiceSectionDimension = modeConfig;
            var MainKey = [];
            var MainValue = "";
            var BreadcrumbServiceSection = [];
            for (var k in BreadcrumbServiceSectionDimension) MainKey.push(k);
            for (var i = 0; i < MainKey.length; i++) {
                MainValue = BreadcrumbServiceSectionDimension[MainKey[i]];
                BreadcrumbSection.push(MainValue);
            };
            return BreadcrumbServiceSection;
        };

        var Requestor = {
            "displayName": $window.fullName,
            "userId": $window.loggedinUserId,
            "email": $window.emailId,
            "firstName": $window.firstName,
            "lastName": $window.lastName,
            "ntId": $window.loggedinUserId,
            "region": "",
            "roles": []
        };

        var request = {
            "assessmentType": "",
            "assessmentSubType": "",
            "ntId": "",
        };

        function getRCRID(value) {
            request.assessmentType = value.AssessmentType;
            request.assessmentSubType = value.AssessmentSubType;
            request.ntId = Requestor.ntId;
            var Obj = restProvider.getREST_OBJECT().GET_RCR_ID;
            Obj.data = request;
            return $http(Obj);
        };
        var projectNameList = []; // RnD Project Names
        var formulaList = []; //Formula List

        this.callRestQueryForID = function(value) {
            var deferred = $q.defer();
            getRCRID(value).success(function(response) {
                if (response.IdResponse.status.code == "0") {
                    deferred.resolve(response.IdResponse);
                }
                //			else{
                //				
                //			}
                getProjectName();
            });
            return deferred.promise;
        };

        function getProjectName() {
            createRequestProvider.callRestQueryForRnDProject().then(function(response) {
                for (var i = 0; i < response.UIResponse.projectNames.length; i++) {
                    projectNameList.push(response.UIResponse.projectNames[i].value);
                }
            });
        }

        this.calRestQueryForProjectName = function() {
            getProjectName();
        };

        this.getRnDProjectName = function() {
            return projectNameList;
        };

        this.getFormulaDetails = function() {
            return formulaList;
        };

        this.setCAList = function(value) {
            createRequestProvider.setCAList(value);
        };

        this.setLeadReviewer = function(value) {
            createRequestProvider.setLeadReviewer(value);
        };


    });

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
            return createRequestProvider.getSomething();
            return inputRequest.getSomething();
            return $q.getSomething();
        }
    };
    /*
        var tmfConstants = {
            "generic": genericSetting.getGenericConstants(),
            "dimension": perDimensionSetting.getDimensionConstants()
        };
    */

    this.getTmfConstants = function() {
        return tmfConstants;
    };

});