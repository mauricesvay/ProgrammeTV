var app = app || {};

$(function () {
	'use strict';
	app.ShowView = Backbone.View.extend({
		tagName : 'li',
		events: {
		},
		render: function renderPicView() {
			var titleSize = "";
			var titleLength = this.model.get('title').length;
			if (titleLength > 26) {
				titleSize = "smaller";
			}
			$(this.el).html(
				"<span class='channel'><img src='css/images/" + this.model.get('channel').replace(/[^A-Za-z0-9]/,'').toLowerCase() + ".png' alt='" + this.model.get('channel') + "' width='100' height='100'></span> " +
				"<div class='info'><strong class='title " + titleSize + "'>" + this.model.get('title') + "</strong> " +
				"<span class='time'>" + this.model.get('time') + "</span> " +
				"<div class='description'>" + /*this.model.get('description')*/'' + "</div></div>"
			);
		}
	});
});