var app = app || {};

$(function () {
    'use strict';
    app.AppView = Backbone.View.extend({
        el: $('body'),
        className : 'app-view',
        events: {
            'click .reload' : 'refresh'
        },
        initialize : function() {
            var _this = this;
            app.dispatcher.on('current', function(date){
                _this.date = date;
                _this.render();
            });
            this.refresh();
        },
        render: function(date) {
            $('.header .title').text(
                moment(this.date).lang("fr").format("dddd DD MMMM")
            );
            $('.header')
                .removeClass('loading')
                .removeClass('reload')
                .addClass('title');
        },
        /**
         * Load feed and display
         */
        refresh: function() {
            var _this = this;
            $('.header')
                .removeClass('reload')
                .removeClass('title')
                .addClass('loading');
            app.shows.fetch({
                cache: true,
                success: function(response) {
                    $('div.reload').hide();
                    $('.header')
                        .removeClass('loading')
                        .removeClass('reload')
                        .addClass('title');
                    app.showsView.render();
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
            //Outdated cache ?
            var scheduleDate = moment(this.date).valueOf();
            var today = moment({hour: 0, minute: 0}).valueOf();
            if (scheduleDate < today) {
                app.shows.fetch({
                    cache:false,
                    success: function(response) {
                        app.showsView.render();
                    },
                    error: _this.refreshError
                });
            }
        },
        /**
         * Loading error
         */
        refreshError: function(){
            $('div.reload').show();
            $('.header')
                .removeClass('loading')
                .removeClass('title')
                .addClass('reload');
            alert('Erreur de chargement');
        }
    });
});