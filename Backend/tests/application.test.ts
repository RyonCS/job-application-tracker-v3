import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Load environment variables from .env.test file.
dotenv.config({ path: './tests/.env.test' });

describe('GET /api/v1/applications', () => {
  const agent = request.agent(app);

  const testEmail = process.env.VALID_EMAIL_TEST!;
  const testPassword = process.env.VALID_PASSWORD_TEST!;

  let applicationId: string;

  // Set up login.
  beforeAll(async () => {
    await agent
        .post("/api/v1/auth/login")
        .send({emailAddress:testEmail, password:testPassword})
        .expect(200);
  });


  // Set up closing tests.
  afterAll(async () => {
    // await prisma.jobApplication.deleteMany({where: {id: applicationId}});
    await prisma.$disconnect();
  });

  // Tests adding a new job application.
    it('should create a new job application', async () => {
        const newAppData = {
        company: 'Test Company',
        position: 'Test Position',
        location: 'Test location',
        status: 'APPLIED',
        workMode: 'REMOTE',
        linkToJobPosting: 'Fake Link',
        applicationDate: '2025-07-11',
        };

        const res = await agent
        .post('/api/v1/applications')
        .send(newAppData)
        .expect(201);

        expect(res.body.message).toBe('Application successfully created.');
        expect(res.body.applicationId).toBeDefined();

        applicationId = res.body.applicationId; // save for later tests
  });

  // Tests retrieving all job applications for the test user.
  it('returns job applications for the logged in user', async () => {
    const res = await agent.get('/api/v1/applications').expect(200);

    expect(res.body.applications).toBeInstanceOf(Array);
    expect(res.body).toHaveProperty('sort');
  });

  // Tests updating an existing application for the test user.
  it('updates an existing application for user',  async () => {
    const updatedData = {
      company: 'Updated Company',
      position: 'Senior Developer',
      status: 'INTERVIEW',
      workMode: 'INPERSON',
      applicationDate: '2025-07-11',
    };

    const res = await agent
        .put(`/api/v1/applications/${applicationId}`)
        .send(updatedData)
        .expect(200);

    expect(res.body.message).toMatch('Application successfully updated.');
  })

  // Tests deleting a job application for the test user.
  it('should delete the job application', async () => {
    const res = await agent
      .delete(`/api/v1/applications/${applicationId}`)
      .expect(200);

    expect(res.body.message).toBe('Successfully deleted application.');

    await agent
      .delete(`/api/v1/applications/${applicationId}`)
      .expect(404);
  });

  // Tests accessing an application that doesn't exist.
  it('returns 404 if application does not exist', async () => {
    const fakeId = 'fake123';
    const res = await agent
      .put(`/api/v1/applications/${fakeId}`)
      .send({ company: 'Should Fail' })
      .expect(404);

    expect(res.body.error).toMatch('Application not found.');
  });
});