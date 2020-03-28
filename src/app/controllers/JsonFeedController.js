const Feed = require('rss-to-json');
const cheerio = require('cheerio');

//  Controller to read rss feed and return structure Json
class JsonFeedController {
    async feedRead(req, res) {
        if (!req.headers.url) {
            res.status(400).json({ message: 'Request without feed url' });
        }

        const { url } = req.headers;
        // const url = "https://revistaautoesporte.globo.com/rss/ultimas/feed.xml";
        await Feed.load(url, function (err, { items }) {
            if (!err) {
                let feedItems = [];

                for (let item of items) {
                    let obj = {};
                    obj.title = item.title;
                    obj.link = item.link;
                    // console.log(obj);
                    feedItems.push({ item: obj });
                    const desc = item.description;
                    const $ = cheerio.load(desc);

                    const content = $('body');
                    // const elem = text.children().html();
                    // console.log(elem);
                    // content.children().each((i, elem) => {
                    //     if ($(elem).text().length > 2) {
                    //         console.log(elem.tagName);

                    //         if ($(elem).hasClass('foto')) {
                    //             console.log($(elem).find('img').attr('src'));
                    //         }
                    //         if (elem.tagName == 'p') {
                    //             console.log($(elem).text());
                    //         }

                    //         console.log('\n');
                    //     }
                    //     // if ($(this).has('.foto')) {
                    //     //   console.log('foto');
                    //     // }
                    // });
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