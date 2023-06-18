import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

export enum Dir {
  CREATED_AT = 'created_at',
}
export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @IsEnum(Sort)
  @IsOptional()
  sort: Sort;

  @IsEnum(Dir)
  @IsOptional()
  dir: Dir;
}
