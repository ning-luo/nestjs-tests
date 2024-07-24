import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { User } from '../src/user/entities/user.entity';
import { UserProfile } from '../src/user-profile/entities/user-profile.entity';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [User, UserProfile],
        synchronize: true,
      }),
      AppModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

export { app };
