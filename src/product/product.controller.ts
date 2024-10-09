import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('')
  getAllProducts(@Query('page') page?: string) {
    if (isNaN(+page) || isNaN(+page)) {
      return {
        status: 400,
        message: 'Invalid query parameters',
      };
    }
    return this.productService.getAllProducts(+page || 0);
  }
  @Get(':id')
  getProductById(@Query('id') id: string) {
    if (isNaN(+id)) {
      return {
        status: 400,
        message: 'Invalid query parameters',
      };
    }
    return this.productService.getProductById(+id);
  }
  @Get('search/:name')
  getProductByName(@Param('name') name: string, @Query('page') page?: string) {
    return this.productService.getProductByName(name, +page || 0);
  }
}
