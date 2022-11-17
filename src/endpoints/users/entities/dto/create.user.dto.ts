import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;
}
