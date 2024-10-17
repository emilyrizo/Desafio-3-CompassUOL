import { Module } from '@nestjs/common';
import { ProductController } from 'src/controller/product.controller';
import { ProductService } from '../services/product.service';
import { PrismaService } from 'prisma/prisma.service'; // Ajuste o caminho conforme necessário

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
