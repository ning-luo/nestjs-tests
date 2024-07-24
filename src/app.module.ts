import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserProfile } from './user-profile/entities/user-profile.entity';
import { UserModule } from './user/user.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sqlite',
      entities: [User, UserProfile],
      synchronize: true,
    }),
    UserModule,
    UserProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
