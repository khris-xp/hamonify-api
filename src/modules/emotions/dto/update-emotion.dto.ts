import { PartialType } from '@nestjs/swagger';
import { CreateEmotionDto } from './create-emotion.dto';

export class UpdateEmotionDto extends PartialType(CreateEmotionDto) {
	readonly name?: string;
	readonly score?: number;
	period: Date;
}
