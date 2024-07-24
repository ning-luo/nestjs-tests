import { app } from './setup';
import * as request from 'supertest';

describe('User (e2e)', () => {
  let userId: number;

  it('/users (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'New User' })
      .expect(201);

    // console.log('POST /users response:', response.body); // Log the response

    expect(response.body.name).toEqual('New User');
    userId = response.body.id; // Capture the user ID for later tests
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    // console.log('GET /users response:', response.body); // Log the response

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'New User',
        }),
      ]),
    );
  });

  it('/users/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);

    // console.log('GET /users/:id response:', response.body); // Log the response

    expect(response.body.name).toEqual('New User');
  });

  it('/users/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .send({ name: 'Updated User' })
      .expect(200);

    // console.log('PUT /users/:id response:', response.body); // Log the response

    expect(response.body.name).toEqual('Updated User');
  });

  it('/users/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .expect(200);

    // console.log('DELETE /users/:id response:', response.body); // Log the response

    expect(response.body).toEqual(
      expect.objectContaining({ name: 'Updated User' }),
    );
  });
});
