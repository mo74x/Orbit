/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Request() req, @Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(req.user.userId, createIssueDto);
  }
  @Get()
  findAll(@Query('projectId') projectId: string) {
    return this.issuesService.findAll(+projectId);
  }
}
