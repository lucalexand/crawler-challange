const Feed = require('rss-to-json');
const cheerio = require('cheerio');

//  Controller to read rss feed and return structure Json
class JsonFeedController {
    async feedRead(req, res) {
        if (!req.headers.url) {
            res.status(400).json({ message: 'Request without feed url' });
        }

        const { url } = req.headers;

        await Feed.load(url, function (err, { items }) {
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
                    // const elem = content.children().html();
                    // console.log(elem);
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
                // console.log(feedItems);
                // const json = {};
                // json.feed = feedItems;
                // console.log(json);
                res.status(200).json({ feed: feedItems });
            }
        });
    };
}


module.exports = new JsonFeedController();