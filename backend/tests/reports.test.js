import request from 'supertest';
import mongoose from 'mongoose';
import Report from '../src/models/report';
import app from '../src/app';

const {
  DB_HOST, DB_NAME, ADMIN_EMAIL, ADMIN_PW
} = process.env;

describe('Test Reports', () => {
  beforeAll(() => {
    mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`);
    new Report({
      title: 'test',
      coordinates: [-11.873084, -51.855469],
    }).save();
  });

  afterAll(() => {
    // Report.remove({
    //   title: /test/i,
    // }).exec();
    mongoose.disconnect();
  });

  test('It should response the GET method', (done) => {
    request(app).post('/login')
      .send({
        email: ADMIN_EMAIL, password: ADMIN_PW
      }).then((resp) => {
        request(app)
          .get('/report/-11.87/-51.85')
          .set('Authorization', `Bearer ${resp.body.token}`)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
            done();
          });
      });
  });

  test('It should response the POST method', (done) => {
    request(app).post('/login')
      .send({
        email: ADMIN_EMAIL, password: ADMIN_PW
      }).then((resp) => {
        request(app).post('/report')
          .send({
            title: 'test-post',
            coordinates: [-11.873084, -51.855469],
            time: '2018-08-11T13:25:07.734Z',
          })
          .set('Authorization', `Bearer ${resp.body.token}`)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect.objectContaining({ tile: expect.any(String) });
            done();
          });
      });
  });

  test('It should reject request as it is not authorized', (done) => {
    request(app)
      .get('/report/-11.87/-51.85')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  test('It should reject request as it is not authorized', (done) => {
    request(app).post('/report')
      .send({
        title: 'test-post',
        coordinates: [-11.873084, -51.855469],
        time: '2018-08-11T13:25:07.734Z',
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
});
