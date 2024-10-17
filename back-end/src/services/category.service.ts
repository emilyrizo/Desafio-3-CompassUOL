import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    const categoryExists = await this.prisma.category.findUnique({ where: { id } });
    if (!categoryExists) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: number) {
    const categoryExists = await this.prisma.category.findUnique({ where: { id } });
    if (!categoryExists) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.prisma.category.delete({ where: { id } });
  }
}



// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'prisma/prisma.service';
// import { Prisma } from '@prisma/client';

// @Injectable()
// export class CategoryService {
//   constructor(private prisma: PrismaService) {}

//   async create(data: Prisma.CategoryCreateInput) {
//     return this.prisma.category.create({ data });
//   }

//   async findAll() {
//     return this.prisma.category.findMany();
//   }

//   async findOne(id: number) {
//     return this.prisma.category.findUnique({ where: { id } });
//   }

//   async update(id: number, data: Prisma.CategoryUpdateInput) {
//     return this.prisma.category.update({ where: { id }, data });
//   }

//   async delete(id: number) {
//     return this.prisma.category.delete({ where: { id } });
//   }
// }
