describe('Filters', function() {
    beforeEach(module('MyApp'));
    describe('reverse', function() {
        var reverse;
        beforeEach(inject(function($filter) {
            reverse = $filter('reverse', {});
        }));
        it('should reverse a string', function() {
            expect(reverse('nira')).toBe('arin');
            expect(reverse('mod')).toBe('dom');
        });
    });
});