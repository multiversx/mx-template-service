import { Jwt, JwtAuthenticateGuard } from "@multiversx/sdk-nestjs";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags('auth')
export class AuthController {
	@Get("/auth")
	@UseGuards(JwtAuthenticateGuard)
	@ApiResponse({
		status: 200,
		description: 'Authorizes the user and returns the encoded address',
	})
	async authorize(@Jwt('address') address: string
	): Promise<string> {
		return address;
	}
}
