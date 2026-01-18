/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateIssueDto {
  @IsOptional()
  @IsEnum(['BACKLOG', 'SELECTED', 'IN_PROGRESS', 'DONE'])
  status?: 'BACKLOG' | 'SELECTED' | 'IN_PROGRESS' | 'DONE';

  @IsOptional()
  @IsNumber()
  listPosition?: number; // The new decimal position (e.g., 2.5)

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  assigneeId?: number;
}
