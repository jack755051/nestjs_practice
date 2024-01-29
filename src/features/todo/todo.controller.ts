import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findTodo() {
    return await this.todoService.findTodo();
  }

  @Post('create')
  async createTodo(@Body() todo: CreateTodoDto) {
    if (!todo) {
      return { message: 'Todo not found' };
    }

    return await this.todoService.createTodo(todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return await this.todoService.deleteTodo(id);
  }

  @Patch(':id')
  async updateTodo(@Param('id') id: number, @Body() tododata: UpdateTodoDto) {
    return await this.updateTodo(id, tododata);
  }
}
