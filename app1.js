var app = angular.module('mdl', []);
/// <reference path="http://qa.dfoundry.io/cg510_rcr_source/Core/services/filterProvider.js" />
app.service('myserv', function($http) {

    this.get = function() {
        var result = $http.get("http://qa.dfoundry.io/cg510_rcr_source/Core/services/filterProvider.js");
        return result;
    };

    this.get = function(id) {
        var result = $http.get("http://qa.dfoundry.io/cg510_rcr_source/Core/services/filterProvider.js");
        return result;
    };


});