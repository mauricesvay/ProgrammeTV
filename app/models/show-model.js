var app = app || {};

(function () {
    'use strict';
    app.ShowModel = Backbone.Model.extend({
        defaults: {
            title: '',
            time: '',
            channel: '',
            description: ''
        }
    });
})();