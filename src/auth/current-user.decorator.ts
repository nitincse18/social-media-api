// src/auth/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const jwtService = new JwtService();

    if (!request.headers.authorization) {
      return null;
    }

    const token = request.headers.authorization.replace('Bearer ', '');
    const decoded = jwtService.decode(token);
    delete decoded.password;
    console.log('decoded', decoded)
    return decoded; // You might want to customize this based on your token structure
  },
);
