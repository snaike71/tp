import { Body, Controller, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from 'src/users/decorator/user.decorator';
import { User } from 'src/users/users.entity';
import { ApproveReportDto } from './dto/approve-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)  
  createReport(@Body() body: CreateReportDto, @CurrentUser() user:any) {
    return this.reportsService.create(body, user);
  }
  @Patch()
  appoveReport(@Param("id") id : string, @Body() body : ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved)
  }
}
