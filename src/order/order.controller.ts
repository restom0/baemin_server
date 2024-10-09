import { Body, Controller, Headers, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private jwtService: JwtService,
  ) {}

  @Post('')
  order(@Headers('token') token, @Body() model: any) {
    let decode = this.jwtService.decode(token);
    return this.orderService.order(model);
  }
}
