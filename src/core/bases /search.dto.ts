import { IsOptional } from 'class-validator';

export class searchDto {
  @IsOptional()
  skip?: number;

  @IsOptional()
  limit?: number;
}
