describe('myserv', function() {
    var myserv, httpBackend;
    beforeEach(function() {
        module('mdl');
        inject(function($httpBackend, _myserv_) {
            myserv = _myserv_;
            httpBackend = $httpBackend;
        });
    });

    afterEach(function() {

        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    it('ServiceTest', function() {

        var returnData = {};
        httpBackend.expectGET("http://qa.dfoundry.io/cg510_rcr_source/Core/services/filterProvider.js").respond(returnData);

        var returnedPromise = myserv.get(1);
        var result;
        returnedPromise.then(function(response) {
            result = response.data;

        });

        httpBackend.flush();
        expect(result).toEqual(returnData);
    });
});