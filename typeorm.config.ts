import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: 'postgres://default:mbJyz2V3NRfW@ep-dark-sunset-a4miov3z-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
});