import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from 'src/dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { category_id, ...data } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...data,
        Category: {
          connect: { id: category_id },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    const productExists = await this.prisma.product.findUnique({ where: { id } });
    if (!productExists) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  
    const updateData: Prisma.ProductUpdateInput = { ...data };
  
    if (typeof data.is_new === 'boolean' || data.is_new === null) {
      updateData.is_new = data.is_new;
    } else {
      delete updateData.is_new;
    }
  
    return this.prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: number) {
    const productExists = await this.prisma.product.findUnique({ where: { id } });
    if (!productExists) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.prisma.product.delete({ where: { id } });
  }
}
