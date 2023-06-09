import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
@UsePipes( ValidationPipe)
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create' )
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.taskService.create(createTaskDto , req.user as User);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.taskService.findPost(req.user as User);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
