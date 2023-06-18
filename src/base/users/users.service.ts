import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { User } from 'src/entities/user.entity';
import { Functions } from 'src/utils/functions';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private functions: Functions,
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(paginationDto: PaginationDto) {
    const pagination =
      await this.functions.findAllWithPaginationAndFilter<User>(
        this.userRepository,
        paginationDto,
      );
    return pagination;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
