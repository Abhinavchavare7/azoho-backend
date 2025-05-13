import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // ✅ loads .env automatically
import { join } from 'path'; // ✅ loads .env automatically
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ loads .env automatically
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://mongo:27017/azoho', {
      dbName: 'azoho', // ✅ optional, sets DB name
    }), AuthModule, UsersModule, ProfileModule,
  ],
  // ✅ loads .env automatically
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
