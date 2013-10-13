var app = app || {};

$(function () {
    'use strict';
    app.AppView = Backbone.View.extend({
        el: $('body'),
        className : 'app-view',
        events: {
            'click .reload' : 'checkForUpdate'
        },
        initialize : function() {
            var _this = this;
            app.dispatcher.on('current', function(date){
                _this.date = date;
                _this.render();
            });
            app.dispatcher.on('loading:start', function(){
                _this.loadingStart();
            });
            app.dispatcher.on('loading:end', function(){
                _this.loadingEnd();
            });
            this.refresh();
        },
        render: function(date) {
            $('.header .title').text(
                //@FIXME : use timezone
                moment(this.date).lang("fr").format("dddd DD MMMM")
            );
        },
        loadingStart: function() {
            $('.loading').show();
            $('.action').hide();
        },
        loadingEnd: function() {
            $('.loading').hide();
            $('.action').show();
        },
        /**
         * Load feed and display
         */
        refresh: function() {
            var _this = this;
            app.shows.fetch({
                cache: true,
                success: function(response) {
                    _this.checkForUpdate();
                },
                error: _this.refreshError
            });
        },
        /**
         * Check for available update
         */
        checkForUpdate: function() {
            var _this = this;
            app.dispatcher.trigger('loading:start');
            //Outdated cache ?
            //@FIXME : use timezone
            var scheduleDate = moment(this.date).valueOf();
            var today = moment({hour: 0, minute: 0}).valueOf();
            if (scheduleDate < today) {
                setTimeout(function(){
                    app.shows.fetch({
                        cache: false,
                        success: function(){
                            app.dispatcher.trigger('loading:end');
                        },
                        error: _this.refreshError
                    });
                }, 1000);
            } else {
                setTimeout(function(){
                    app.dispatcher.trigger('loading:end');
                }, 1000);
            }
        },
        /**
         * Loading error
         */
        refreshError: function(){
            app.dispatcher.trigger('loading:end');
            console.log('Erreur de chargement');
        }
    });
});