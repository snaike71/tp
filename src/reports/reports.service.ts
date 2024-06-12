import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from 'src/users/users.entity';
import { NotFoundError } from 'rxjs';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>
  ) {}

  create(reportDto: CreateReportDto, user : any) {
    const report = this.repo.create(reportDto);
    report.user = user
    return this.repo.save(report);
  }
  async changeApproval(id : string, approved: boolean){
    const report = await this.repo.findOne(
        {
            where: {id: parseInt(id)}
        }
    )
    if (!report){
        throw new NotFoundException("report not found")
    }
    report.approved = approved
    return this.repo.save(report)
  }
  createEstimate(estimateDto: GetEstimateDto){
    return this.repo.createQueryBuilder()
        .select("*")
        .getRawMany()
  }
}
