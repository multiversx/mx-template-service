import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './entities/dto/create.user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
