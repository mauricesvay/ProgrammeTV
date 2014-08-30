var app = app || {};

(function () {
    'use strict';

    app.ShowCollection = Backbone.Collection.extend({
        model: app.ShowModel,
        url: 'http://www.telez.fr/programmeTv/flux-rss',

        sync : function(method, model, options) {
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
        },

        parse: function(response, options) {
            var out = [];
            var whitelist = [
                'arte',
                'bfmtv',
                'canal',
                'd17',
                'd8',
                'france2',
                'france3',
                'france4',
                'france5',
                'franceo',
                'gulli',
                'itele',
                'lcp',
                'm6',
                'nrj12',
                'nt1',
                'tf1',
                'tmc',
                'w9'
            ];

            var xml = $.parseXML($.trim(response));
            var feed = new FeedParser();
            feed.parse(xml);

            app.dispatcher.trigger('current', feed.date);

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
            var filter = document.createElement("div");
            for (var i=0, l=feed.items.length; i<l; i++) {
                item        = feed.items[i];

                channel     = $.trim(item.title).toLowerCase().replace(/[^a-zA-Z0-9]/,'');
                if ( -1 === whitelist.indexOf(channel) ) {
                    continue;
                }

                //prevent image loading
                description = item.description.substr(item.description.indexOf('<div class="enclosures">')).replace(/src=/g,'data-src=');
                filter.innerHTML = description;
                description = filter.textContent || filter.innerText || "";

                time        = new Date(item.date);

                title       = $.trim(item.description.substr(0, item.description.indexOf('<br/>')));
                filter.innerHTML = title;
                title = filter.textContent || filter.innerText || "";

                console.log(channel);

                out.push({
                    description: description,
                    title: title,
                    channel: channel,
                    time: time.getHours() + ':' + time.getMinutes()
                });
            }

            return out;
        }
    });

})();
