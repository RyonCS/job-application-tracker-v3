import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app';

// Load environment variables from .env.test file.
dotenv.config({ path: './tests/.env.test' });

/**
 * Test suite for the POST /api/v1/auth/login route.
 * 
 * This test checks that the login endpoint correctly handles invalid credentials.
 * It sends a POST request with a bad email and password,
 * then expects a 401 Unauthorized response and an error message in the response body.
 */
describe('POST /api/v1/auth/login', () => {
    /**
     * Testing invalid login credentials.
     */
    it('responds with 401 on invalid credentials', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({ emailAddress : 'BadEmail.gmail.com', password : 'BadPassword'});

        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBeDefined();
    });

    /**
     * Testing successful login.
     */
    const test_email = process.env.VALID_EMAIL_TEST;
    const test_password = process.env.VALID_PASSWORD_TEST;

    it('responds with 200 on valid credentials', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({emailAddress:test_email, password:test_password});

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBeDefined();
    })

    /**
     * Testing successful login / logout.
     */
    it('responds with 200 on successful logout', async () => {
        const agent = request.agent(app);

        await agent
            .post('/api/v1/auth/login')
            .send({emailAddress:test_email, password:test_password})
            .expect(200);
        

        const res = await agent
            .post('/api/v1/auth/logout')
            .expect(200);

        expect(res.body.message).toBe('Successfully logged out user.');
    })
});