import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Space } from './entities/space.entity';

@Module({
  controllers: [CompanyController],
  imports: [TypeOrmModule.forFeature([Company, Space])],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
