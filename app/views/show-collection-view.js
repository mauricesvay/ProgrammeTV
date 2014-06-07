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
            var fragment = document.createDocumentFragment();

            $(this.el).empty();
            this.model.each(function(item){
                var itemView = new app.ShowView({model:item});
                itemView.render();
                fragment.appendChild(itemView.el);
            });
            this.$el.html(fragment);
            return this;
        }
    });
});