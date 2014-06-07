var app = app || {};

$(function () {
    'use strict';
    app.ShowView = Backbone.View.extend({
        tagName : 'li',
        events: {
        },
        initialize: function() {
            this.tpl = _.template($('#tpl-show-view').text());
        },
        render: function renderPicView() {
            var titleSize = "";
            var titleLength = this.model.get('title').length;
            if (titleLength > 26) {
                titleSize = "smaller";
            }

            var image_prefix = "css/images/";
            var image_suffix = ".png";
            var image = [
                image_prefix,
                replaceDiacritics(this.model.get('channel').replace(/[^A-Za-z0-9]/,'').toLowerCase()),
                image_suffix
            ].join('');

            var out = this.tpl({
                image: image,
                channel: this.model.get('channel'),
                titleSize : titleSize,
                title : this.model.get('title'),
                time : this.model.get('time'),
                description: this.model.get('description')
            });
            $(this.el).html(out);
            return this;
        }
    });
});