describe('service', function() {
    beforeEach(module('RCRApp'), function() {});
    beforeEach(function() {
        Dependency = {
            getSomething: function() {
                return 'mockReturnValue';
            }
        };
        module(function($provide) {
            $provide.value('breadcrumbServiceProvider', Dependency);
            $provide.value('$http', Dependency);
            $provide.value('$window', Dependency);
            $provide.value('restProvider', Dependency);
            $provide.value('genericSetting', Dependency);
            $provide.value('perDimensionSetting', Dependency);
            $provide.value('createRequestProvider', Dependency);
            $provide.value('inputRequest', Dependency);
            $provide.value('$q', Dependency);
        });
    });
    it('should return value from dependency', inject(function(filterProvider) {
        expect(filterProvider.useDependency()).toBe('mockReturnValue');
    }));
    it('breadcrumb code should get executed', inject(function(breadcrumbServiceProvider) {
        expect(breadcrumbServiceProvider.useDependency()).toBe('mockReturnValue');
    }));
});