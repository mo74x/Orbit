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
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateIssueDto } from './dto/update-issue.dto';

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
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIssueDto: UpdateIssueDto,
  ) {
    return this.issuesService.update(id, updateIssueDto);
  }
}
