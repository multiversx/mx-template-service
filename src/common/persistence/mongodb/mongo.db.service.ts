import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/endpoints/users/entities/dto/create.user.dto";
import { User } from "src/endpoints/users/entities/user.entity";
import { Repository } from "typeorm";
import { PersistenceInterface } from "../persistence.interface";

@Injectable()
export class MongoDbService implements PersistenceInterface {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return await this.usersRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneUser(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
