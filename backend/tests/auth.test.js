import request from 'supertest';
import mongoose from 'mongoose';
import Admin from '../src/models/admin';
import app from '../src/app';

const { ADMIN_EMAIL, ADMIN_PW } = process.env;

describe('Test Auth', () => {
  test('It should return jwt token for admin account', (done) => {
    request(app).post('/login')
      .send({
        email: ADMIN_EMAIL, password: ADMIN_PW
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('It should response the POST method', (done) => {
    request(app).post('/login')
      .send({
        email: ADMIN_EMAIL, password: 'dumy'
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
});
