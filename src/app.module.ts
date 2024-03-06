import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, NestFactory } from '@nestjs/core';
import { ApiKeyGuard } from './auth/guard/api-key.guard';
import { RolesGuard } from './auth/guard/role-guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule {
  constructor (){
    this.enableCors();
  }

  async enableCors() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
      credentials: true,
      maxAge: 86400,
    })
  }

}
