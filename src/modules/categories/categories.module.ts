import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
// import { CategoriesService } from './categories.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Category } from './entities/category.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  // providers: [CategoriesService],
})
export class CategoriesModule {}
