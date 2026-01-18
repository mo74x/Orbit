/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  key: string; // e.g., "ORB"

  @IsString()
  @IsOptional()
  description?: string;
}
