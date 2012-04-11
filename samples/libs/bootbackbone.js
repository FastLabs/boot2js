define('backbone', ['../backbone/backbone'], function() {
    console.log('backbone loaded');
    _.noConflict();
    $.noConflict();
    return Backbone.noConflict();
});