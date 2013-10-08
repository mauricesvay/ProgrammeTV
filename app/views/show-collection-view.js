var app = app || {};

$(function () {
    'use strict';
    app.ShowCollectionView = Backbone.View.extend({
        el : $('.shows'),
        initialize: function() {
            var _this = this;
        },
        render: function renderShowCollectionView() {
            var _this = this;
            $(this.el).empty();
            this.model.each(function(item){
                var itemView = new app.ShowView({model:item});
                itemView.render();
                $(_this.el).append(itemView.el);
            });
        }
    });
});