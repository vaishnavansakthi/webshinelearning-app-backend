import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../model/auth.entity';
import { JwtService } from '@nestjs/jwt';

const matchRoles = (roles, userRoles) => {
  return roles.some(role => role === userRoles);
};

const IS_PUBLIC_KEY = 'isPublic';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        return true;
      }
    if (!roles) {
      return true;
    }

    // const request = context.switchToHttp().getRequest();
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
        throw new Error(`${roles}`);
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    const user = payload;
    return matchRoles(roles, user.role);
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader) {
      const [type, token] = authorizationHeader.split(' ') ?? [];
      if (type === 'Bearer') {
        return token;
      }
    }
    return undefined;
  }
}