import { UserRepository } from "@libs/database";
import { User } from "@libs/entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async create(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.remove(id);
  }
}
