import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard) // Utilisez un guard pour vérifier l'authentification
  @UsePipes(ValidationPipe) // Utilisez un pipe de validation
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
