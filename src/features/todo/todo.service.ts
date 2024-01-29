import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './../../typeorm/entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  /**
   * 創建代辦事項
   * @param todo
   * @returns
   */
  public async createTodo(todo: CreateTodoDto) {
    const { title, description, completed } = todo;
    const newTodo = this.todoRepository.create({
      title: title,
      description: description,
      completed: completed,
    });

    return this.todoRepository.save(newTodo);
  }

  /**
   * 取得代辦事項
   * @returns
   */
  public async findTodo() {
    return await this.todoRepository.find();
  }

  /**
   * 刪除代辦事項
   * @param title
   * @returns
   */
  public async deleteTodo(id: number) {
    await this.todoRepository.delete({ id });
    return {};
  }

  /**
   * 修改代辦事項
   * @param id
   * @param data
   * @returns
   */
  public async updateTodo(id: number, data: UpdateTodoDto) {
    //依據id找到user
    const result = await this.todoRepository.findOne({ where: { id } });
    const { title, description, completed } = data;

    await this.todoRepository.update(
      { id },
      {
        title: title,
        description: description,
        completed: completed,
      },
    );

    return this.todoRepository.save(result);
  }
}
