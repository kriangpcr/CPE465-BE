import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { UserRepository } from '@domain/repositories/database';
import { CreateUserDto } from '@infrastructure/dtos/user/create-user.dto';
import { User } from '@domain/model';
import { BusinessIdeaDto } from '@infrastructure/dtos/business_analysis/business-analysis.dto';
import { IBusinessAnalysisServiceApi } from '@domain/repositories/api/businessanalysis.interface';
@Injectable()
export class AnalysisIdeaUseCase implements UseCase<
  {
    body: BusinessIdeaDto;
  },
  any
> {
  constructor(private readonly businessAnalysisService: IBusinessAnalysisServiceApi) {}

  async execute(ctx: { body: BusinessIdeaDto }): Promise<any> {
    return this.businessAnalysisService.gemini_analysis(ctx.body);
  }
}
