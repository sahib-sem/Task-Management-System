import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TaskModule, AuthModule , TypeOrmModule.forRoot({
    type: 'mysql', 
    username: 'root',
    password:'s1a2h3i4b5',
    database:'task_management_system',
    autoLoadEntities:true,
    synchronize:true,
    port:3306,
    host:'localhost'
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
