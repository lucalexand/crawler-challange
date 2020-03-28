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
            console.log(err);

            // if (!err) {
            //     const html = items[0].description;
            //     const $ = cheerio.load(html);

            //     const text = $('body');
            //     // const elem = text.children().html();
            //     // console.log(elem);
            //     text.children().each((i, elem) => {
            //         if ($(elem).text().length > 2) {
            //             console.log(elem.tagName);

            //             if ($(elem).hasClass('foto')) {
            //                 console.log($(elem).find('img').attr('src'));
            //             }
            //             if (elem.tagName == 'p') {
            //                 console.log($(elem).text());
            //             }

            //             console.log('\n');
            //         }
            //         // if ($(this).has('.foto')) {
            //         //   console.log('foto');
            //         // }
            //     });
            // }
        });
    };
}


module.exports = new JsonFeedController();