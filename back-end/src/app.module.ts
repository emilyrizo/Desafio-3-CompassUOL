import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { CategoryModule } from './modules/category.module';
import { ProductModule } from './modules/product.module';

@Module({
  imports: [PrismaModule, CategoryModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
