const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../index.js');

describe('API Endpoints', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should return API ok /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Api run');
  });

  it('should return oky for GET /ping', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'oky' });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ name: 'Ali', email: 'ali@example.com', password: '123' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'register done' });
  });

  it('should not register user with duplicate email', async () => {
    beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    });
    await request(app)
      .post('/register')
      .send({ name: 'Ali', email: 'ali@example.com', password: '123' });
    const res = await request(app)
      .post('/register')
      .send({ name: 'Bob', email: 'ali@example.com', password: '456' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Email exists' });
  });

  it('should login user and return token', async () => {
    await request(app)
      .post('/register')
      .send({ name: 'Ali', email: 'ali@example.com', password: '123' });
    const res = await request(app)
      .post('/login')
      .send({ email: 'ali@example.com', password: '123' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return error for wrong login credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'ali@example.com', password: 'wrong' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should handle /update and /long-polling', async () => {
    const longPolling = request(app).get('/long-polling');
    const update = request(app)
      .post('/update')
      .send({ message: 'test' });

    const [longPollingRes, updateRes] = await Promise.all([longPolling, update]);

    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toEqual({ status: 'Data sent successfully' });
    expect(longPollingRes.status).toBe(200);
    expect(longPollingRes.body.message).toBe('test');
    expect(longPollingRes.body).toHaveProperty('timestamp');
  });

  it('should timeout on /long-polling after 30 seconds', async () => {
    const res = await request(app).get('/long-polling');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Timeout - no new data');
    expect(res.body).toHaveProperty('timestamp');
  });
});