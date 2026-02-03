import { PartialType } from '@nestjs/swagger';
import { CreatePortfolioDto } from './create-portfolio.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdatePortfolioDto extends PartialType(
  OmitType(CreatePortfolioDto, ['projectId'] as const),
) {}
