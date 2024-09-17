import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateEmotionDto {
	readonly name: string;
	readonly score: number;
	@ApiProperty({
		example: 'createdBy',
	  })
	@IsString()
	@IsNotEmpty()
	createdBy: string;
}
