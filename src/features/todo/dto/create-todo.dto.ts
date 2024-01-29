import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @MinLength(10)
  @MaxLength(40)
  public readonly title: string;

  @IsOptional()
  @MaxLength(255)
  public readonly description?: string;

  @IsOptional()
  public readonly completed?: boolean;
}
