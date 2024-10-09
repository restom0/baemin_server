import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getAllCategories() {
    let data = await this.prismaService.category.findMany();
    return data;
  }
}
