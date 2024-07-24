import { app } from './setup';
import * as request from 'supertest';

describe('UserProfile (e2e)', () => {
  let profileId: number;

  it('/profiles (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/profiles')
      .send({ bio: 'New Profile' })
      .expect(201);

    expect(response.body.bio).toEqual('New Profile');
    profileId = response.body.id; // Capture the profile ID for later tests
  });

  it('/profiles (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/profiles')
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          bio: 'New Profile',
        }),
      ]),
    );
  });

  it('/profiles/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/profiles/${profileId}`)
      .expect(200);

    expect(response.body.bio).toEqual('New Profile');
  });

  it('/profiles/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put(`/profiles/${profileId}`)
      .send({ bio: 'Updated Profile' })
      .expect(200);

    expect(response.body.bio).toEqual('Updated Profile');
  });

  it('/profiles/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/profiles/${profileId}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({ bio: 'Updated Profile' }),
    );
  });
});
