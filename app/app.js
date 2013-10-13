var app = app || {};

$(function () {
    'use strict';

    //Use CORS proxy
    $.ajaxPrefilter(function(options) {
        options.url = "http://furious-stream-4406.herokuapp.com?src=" + encodeURIComponent(options.url);
    });

    app.cache = new Burry.Store('ProgrammeTV');
    app.dispatcher = _.clone(Backbone.Events);

    app.shows = new app.ShowCollection();
    app.showsView = new app.ShowCollectionView({model: app.shows});
    app.appView = new app.AppView();
});