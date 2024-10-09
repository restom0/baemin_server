import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [OrderController],
  providers: [OrderService, JwtService],
})
export class OrderModule {}
