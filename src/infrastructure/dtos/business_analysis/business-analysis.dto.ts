import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BusinessIdeaDto {
  @ApiProperty({
    description: 'The business idea to analyze',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  IdeaDetail: string;

  @ApiProperty({
    description: 'The name of the business',
    type: String,
    required: true,
  })
  @IsString()
  businessName: string;

  @ApiProperty({
    description: 'The budget allocated for the business idea',
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  budget: number;

  @ApiProperty({
    description: 'The location where the business will operate',
    type: String,
    required: true,
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'The target audience for the business idea',
    type: String,
    required: true,
  })
  @IsString()
  targetAudience: string;

  @ApiProperty({
    description: 'The sales channel for the business idea (online, onsite, both)',
    type: String,
    required: true,  })
  @IsString()
  salesChannel: string;
}