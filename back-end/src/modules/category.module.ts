import { Module } from '@nestjs/common';
import { CategoryController } from 'src/controller/category.controller';
import { CategoryService } from 'src/services/category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
