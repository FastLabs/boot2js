define('FutureModule', ['query', 'underscore', 'backbone'], function ($, _, Backbone) {
    console.log('future model');
    var Future = Backbone.Model.extend({
        defaults:{
            currency:'GBP'
        },
        doIt:function () {
            console.log('hello wolrd');
        }
    });

    return Future;
});

define('FutureView', ['query', 'underscore', 'backbone'], function ($, _, Backbone) {
    console.log('future view initialized');

    var view = Backbone.View.extend( {
        template : $('#first_template'),

        initialize:function () {
            this.el = $('#search_container');
            console.log('future view initialized');
            this.model.on('change:currency', this.render, this);

        },

        render:function () {
            this.el.text(_.template(this.template.html(), {currency: this.model.get('currency')}) );
        }

    });
    return view;
});
//require(['query','text!../templates/searchview.html'], function () {
//    console.log('templates loaded');
//});