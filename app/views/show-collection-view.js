var app = app || {};

$(function () {
    'use strict';
    app.ShowCollectionView = Backbone.View.extend({
        el : $('.shows'),
        initialize: function() {
            var _this = this;
            this.listenTo(this.model, 'sync', this.render);
        },
        render: function renderShowCollectionView() {
            var _this = this;
            $(this.el).empty();
            this.model.each(function(item){
                var itemView = new app.ShowView({model:item});
                itemView.render();
                //@TODO : group append operations
                $(_this.el).append(itemView.el);
            });
            return this;
        }
    });
});