var app = app || {};

(function () {
	'use strict';

	app.ShowCollection = Backbone.Collection.extend({
		model: app.ShowModel,
        url: 'http://www.zap-programme.fr/rss/rss.php?bouquet=2',

		parse: function(response, options) {
			var out = [];

			var xml = $.parseXML($.trim(response));
            app.feed.parse(xml);

            app.dispatcher.trigger('current', app.feed.date);

            var item;
            var title;
            var description;
            var frag = document.createDocumentFragment();
            var part = document.createElement('BODY');
            frag.appendChild(part);
            var channel;
            var time;
            var titlePart;
            var models = [];
            for (var i=0, l=app.feed.items.length; i<l; i++) {
                item        = app.feed.items[i];

                //prevent image loading
                description = item.description.replace(/src=/g,'data-src=');
                channel     = $.trim(item.title.substr(0, item.title.indexOf(':')));
                titlePart   = $.trim(item.title.substr(item.title.indexOf(':') + 1));
                time        = titlePart.substr(0, titlePart.indexOf(' '));
                title       = $.trim(titlePart.substr(titlePart.indexOf(' ')));
                out.push({
                    description: description,
                    title: title,
                    channel: channel,
                    time: time
                });
            }

            return out;
		}
	});

})();