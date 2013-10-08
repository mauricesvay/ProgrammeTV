var app = app || {};

(function () {
	'use strict';

	app.ShowOfflineCollection = Backbone.Collection.extend({
		model: app.ShowModel,
        localStorage: new Backbone.LocalStorage("ProgrammeTV")
	});

})();