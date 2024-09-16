import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { UsersModule } from './modules/users/users.module';
import { GLOBAL_CONFIG } from './shared/constants/global-config';
import { EmotionsModule } from './modules/emotions/emotions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configuration,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get(GLOBAL_CONFIG.MONGO_URI),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    BlogModule,
	EmotionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
