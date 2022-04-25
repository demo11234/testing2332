import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminService } from '../admin.service';
import { Admin } from '../entities/admin.entity';
/**
 * Local strategy for passport
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminService: AdminService) {
    super();
  }
  /**
   * Validating admin credentials
   * @param username
   * @param password
   * @returns admin
   */
  async validate(username: string, password: string): Promise<Admin> {
    const admin = await this.adminService.validateCustomer(username, password);
    console.log('****', admin);

    if (!admin) throw new UnauthorizedException('Customer noot found');

    return admin;
  }
}
