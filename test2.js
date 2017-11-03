describe('service', function() {
    beforeEach(module('RCRApp'), function(selectedFilter, selectedView) {});
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
        });
    });
    it('breadcrumbServiceProvider should get executed', inject(function(breadcrumbServiceProvider) {
        expect(breadcrumbServiceProvider.useDependency()).toBe('mockReturnValue');
    }));
});