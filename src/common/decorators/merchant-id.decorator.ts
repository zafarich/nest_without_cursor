import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MerchantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // AuthGuard da request obyektiga qanday nom bilan saqlagan bo'lsangiz, o'sha nomni ishlating
    return request.merchantId;
  },
);
