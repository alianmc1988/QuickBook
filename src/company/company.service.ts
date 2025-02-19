import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const newCompany = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(newCompany);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['spaces'] });
  }

  async findOne(id: UUID): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['spaces'],
    });
    if (!company) {
      throw new HttpException(
        `The company with id ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return company;
  }

  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} company`;
  // }
}
