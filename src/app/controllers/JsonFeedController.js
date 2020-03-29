const Feed = require('rss-to-json');
const cheerio = require('cheerio');

//  Controller to read rss feed and return structure Json
class JsonFeedController {
    async feedRead(req, res) {
        try {
            if (!req.headers.url) {
                res.status(400).json({ message: 'Request without feed url' });
            }

            const { url } = req.headers;

            const feedReaderPromise = (url) => {
                return new Promise((resolve, reject) => {
                    Feed.load(url, function (err, { items }) {
                        if (!err) {
                            let feedItems = [];

                            for (let item of items) {
                                let obj = {};
                                obj.title = item.title;
                                obj.link = item.link;
                                obj.description = [];

                                const desc = item.description;
                                const $ = cheerio.load(desc);

                                const content = $('body');
                                content.children().each((i, elem) => {
                                    if ($(elem).text().length > 2) {
                                        if ($(elem).hasClass('foto')) {
                                            obj.description.push({
                                                type: 'image',
                                                content: $(elem).find('img').attr('src')
                                            });
                                        }

                                        if (elem.tagName == 'p') {
                                            obj.description.push({
                                                type: 'text',
                                                content: $(elem).text()
                                            });
                                        }

                                        if ($(elem).hasClass('saibamais')) {
                                            let links = [];
                                            $(elem).find('ul').each((i, li) => {
                                                $(li).find('a').each((i, a) => {
                                                    links.push($(a).attr('href'));
                                                });
                                            });
                                            obj.description.push({
                                                type: 'links',
                                                content: links
                                            });
                                        }
                                    }
                                });
                                feedItems.push({ item: obj });
                            }

                            resolve({ feed: feedItems });
                        } else {
                            reject(err);
                        }
                    });
                });
            }

            const feedJson = await feedReaderPromise(url);
            res.status(200).json(feedJson);
        } catch (error) {
            res.json(error);
        }
    };
}

module.exports = new JsonFeedController();
