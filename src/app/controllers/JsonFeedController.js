const Feed = require('rss-to-json');
const cheerio = require('cheerio');

//  Controller to read rss feed and return structure Json
class JsonFeedController {
    async feedRead(req, res) {
        // if (!req.headers.url) {
        //     res.status(400).json({ message: 'Request without feed url' });
        // }

        // const { url } = req.headers;
        const url = "https://revistaautoesporte.globo.com/rss/ultimas/feed.xml";
        await Feed.load(url, function (err, { items }) {
            if (!err) {
                let feed = [];
                for (let item of items) {
                    const desc = item.description;
                    const $ = cheerio.load(desc);

                    const content = $('body');
                    // const elem = text.children().html();
                    // console.log(elem);
                    content.children().each((i, elem) => {
                        if ($(elem).text().length > 2) {
                            console.log(elem.tagName);

                            if ($(elem).hasClass('foto')) {
                                console.log($(elem).find('img').attr('src'));
                            }
                            if (elem.tagName == 'p') {
                                console.log($(elem).text());
                            }

                            console.log('\n');
                        }
                        // if ($(this).has('.foto')) {
                        //   console.log('foto');
                        // }
                    });
                }
            }
        });
    };
}


module.exports = new JsonFeedController();