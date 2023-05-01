import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TaskService {

  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>){}
  async create(createTaskDto: CreateTaskDto , user:User) {
    const task = new Task()
    Object.assign(task, createTaskDto)
    task.userId = user.id;
    this.repo.create(task)
    return await this.repo.save(task);
  }

  async  findPost(user:User) {
    return await this.repo.find({
      where:{
        userId:user.id
      }
    });
  }

  findOne(id: number) {
    return this.repo.findOneBy({id})
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    if (Object.keys(updateTaskDto).length === 0 && updateTaskDto.constructor === Object){
      throw new BadRequestException('at least one field must be provided')
    }
    return this.repo.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
