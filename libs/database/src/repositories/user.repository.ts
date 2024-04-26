import { User, UserDocument } from "@libs/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async create(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.userModel.deleteOne({ id });
  }
}
