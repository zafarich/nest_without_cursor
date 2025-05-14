import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/modules/auth/guards/permissions.guard';
import { Permissions } from '@/modules/auth/decorators/permissions.decorator';

// Faraz qilaylik, CreateCategoryDto mavjud
// import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
  // constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('create_category')
  async create(@Body() createCategoryDto: any /* CreateCategoryDto */) {
    // Bu yerda kategoriya yaratish logikasi bo'ladi
    // return this.categoriesService.create(createCategoryDto);
    return {
      message: 'Category created successfully',
      data: createCategoryDto,
    };
  }
}
