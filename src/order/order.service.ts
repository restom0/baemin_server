import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}
  async order(model: {
    user_id: number;
    list_product: any[];
    email: string;
    full_name: string;
    phone: string;
    address: string;
  }) {
    let newOrder = {
      user_id: model.user_id,
      list_product: model.list_product,
    };
    const orderSuccess = await this.prismaService.orders.create({
      data: newOrder,
    });
    let configMail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'thaingocrang2014@gmail.com',
        pass: 'clznxdbwopljfgnk',
      },
    });

    let infoMail = {
      from: 'thaingocrang2014@gmail.com',
      to: model.email,
      subject: 'Đặt hàng qua Baemin',
      html: '<h1> Xác nhận đợn hàng thành công </h1>',
    };

    configMail.sendMail(infoMail, (error) => error);

    // ship => lưu thông tin shipping

    let newShip = {
      order_id: orderSuccess.order_id,
      full_name: model.full_name,
      email: model.email,
      phone: model.phone,
      address: model.address,
      create_at: new Date(),
    };
    await this.prismaService.shipping.create({ data: newShip });
    return 'Đặt món thành công';
  }
}
