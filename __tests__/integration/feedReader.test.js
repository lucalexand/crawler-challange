const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../fakeFactories');

//  Tests to feed reader
describe("Rss Reader", () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should not call route withou authentication', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .get("/feedJsoner");


        expect(response.status).toBe(401);
    });

    it('should not do when request without feed url', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .get("/feedJsoner")
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(400);
    });

    it('should url', async () => {
        const user = await factory.create('User');
        const url = 'https://revistaautoesporte.globo.com/rss/ultimas/feed.xml';
        const response = await request(app)
            .get("/feedJsoner")
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .set('url', url);

        expect(response.status).toBe(200);
    });
});