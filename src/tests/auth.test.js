const request = require('supertest');
const app = require('../index.js')

describe('auth api', () => {
    it('should be register', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({
            email: 'test@example.com',
            password: 'test1234'
        });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email','test@example.com');
    });
});