var app = app || {};

$(function () {
    'use strict';

    //Use CORS proxy
    $.ajaxPrefilter(function(options) {
        options.url = "http://furious-stream-4406.herokuapp.com?src=" + encodeURIComponent(options.url);
    });

    app.cache = new Burry.Store('ProgrammeTV');

    //Custom Backbone sync
    Backbone.sync = function(method, model, options) {
        options || (options = {});

        switch (method) {
            case 'create':
                break;

            case 'update':
                break;

            case 'delete':
                break;

            case 'read':
                var data = app.cache.get('feed');
                if (options.cache && data) {
                    if (options.success) {
                        options.success(data);
                    }
                } else {
                    $.ajax({
                        method: 'get',
                        dataType : 'text',
                        url : model.url,
                        success : function(data, status, xhr) {
                            app.cache.flush();
                            if (options.success) {
                                app.cache.set('feed', data);
                                options.success(data);
                            }
                        },
                        error : function() {
                            if (options.error) {
                                options.error();
                            }
                        }
                    });
                }
                break;
        }
    };

    app.feed = new FeedParser();
    app.dispatcher = _.clone(Backbone.Events);

    app.shows = new app.ShowCollection();
    app.showsView = new app.ShowCollectionView({model: app.shows});
    app.appView = new app.AppView();
});