import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { Pagination } from 'src/types/pagination.type';
import { FindManyOptions, MongoRepository } from 'typeorm';

interface SortOptions {
  [key: string]: 'asc' | 'desc';
}

@Injectable()
export class Functions {
  private buildSortOptions(sort: SortOptions): any {
    const sortOptions: any = {};
    Object.entries(sort).forEach(([key, value]) => {
      sortOptions[key] = value === 'desc' ? -1 : 1;
    });
    return sortOptions;
  }
  async findAllWithPaginationAndFilter<T>(
    repository: MongoRepository<T>,
    paginationDto: PaginationDto,
    filter?: any,
  ): Promise<Pagination> {
    const { limit, page } = paginationDto;

    const skip = (page - 1) * limit;
    const take = limit;

    const sortOptions = paginationDto.sort
      ? {
          [paginationDto.dir || 'created_at']: paginationDto.sort,
        }
      : undefined;
    const findOptions: FindManyOptions<T> = {
      skip,
      take,
      where: filter,
      order: sortOptions ? this.buildSortOptions(sortOptions) : undefined,
    };

    const [data, total] = await repository.findAndCount(findOptions);
    const pagination: Pagination = {
      list: data,
      limit,
      page,
      total_page: Math.ceil(total / limit),
      total_data: total,
    };
    return pagination;
  }
}
