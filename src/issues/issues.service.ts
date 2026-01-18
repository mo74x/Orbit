/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssuesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateIssueDto) {
    // 1. Calculate the new position (Bottom of the list)
    const lastIssue = await this.prisma.issue.findFirst({
      where: { projectId: dto.projectId },
      orderBy: { listPosition: 'desc' },
    });

    const newPosition = lastIssue ? lastIssue.listPosition + 1 : 1;

    // 2. Create the Issue
    return this.prisma.issue.create({
      data: {
        ...dto,
        listPosition: newPosition,
        reporterId: userId, // The logged-in user reported this
        status: 'BACKLOG', // Default column
      },
    });
  }

  // Get all issues for a specific project
  async findAll(projectId: number) {
    return this.prisma.issue.findMany({
      where: { projectId },
      orderBy: { listPosition: 'asc' }, // Sort by position
      include: {
        assignee: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
  }

  async update(id: number, dto: UpdateIssueDto) {
    return this.prisma.issue.update({
      where: { id },
      data: dto,
    });
  }
}
