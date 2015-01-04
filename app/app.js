var app = app || {};

$(function () {
    'use strict';

    //Use CORS proxy
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://furious-stream-4406.herokuapp.com/' + options.url;
        }
    });

    app.cache = new Burry.Store('ProgrammeTV');
    app.dispatcher = _.clone(Backbone.Events);

    app.shows = new app.ShowCollection();
    app.showsView = new app.ShowCollectionView({model: app.shows});
    app.appView = new app.AppView();
});
