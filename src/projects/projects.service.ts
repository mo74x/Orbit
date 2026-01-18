/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        key: dto.key,
        description: dto.description,
        ownerId: userId,
        // Automatically add the creator as a member
        members: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.project.findMany({
      where: {
        members: {
          some: { id: userId }, // Only show projects where user is a member
        },
      },
      include: {
        owner: { select: { name: true, email: true } }, // Return owner details
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        issues: true,
        members: true,
      },
    });
  }
}
