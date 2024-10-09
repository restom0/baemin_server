import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async getAllProducts(page: number) {
    let data = await this.prismaService.product.findMany({
      skip: (page - 1) * 8,
      take: 8,
    });
    let pagination = await this.prismaService.product.count();
    return {
      data: data,
      pagination: {
        page: page,
        size: 8,
        total: pagination,
      },
    };
  }
  async getProductByName(name: string, page: number) {
    let data = await this.prismaService.product.findMany({
      where: {
        product_name: {
          contains: name,
        },
      },
      take: 8,
      skip: 0,
    });
    return data;
  }
  async getProductById(id: number) {
    let data = await this.prismaService.product.findFirst({
      where: {
        product_id: id,
      },
    });
    return data;
  }
}
