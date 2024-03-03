import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'ep-dark-sunset-a4miov3z-pooler.us-east-1.aws.neon.tech',
    port: 5432,
    username: 'default',
    password: 'mbJyz2V3NRfW',
    database: 'verceldb',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    ssl: true
  }),
  TodoModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
