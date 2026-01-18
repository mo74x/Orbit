/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['TASK', 'BUG', 'STORY']) // Matches our Prisma Enum
  type: 'TASK' | 'BUG' | 'STORY';

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

  @IsInt()
  projectId: number;
}
