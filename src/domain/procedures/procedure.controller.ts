import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { Procedure as ProcedureModel } from '@prisma/client';
import { ProcedureResponse } from './model/procedure.response';

@Controller('services')
export class ServiceController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createService(
    @Body() serviceData: ProcedureModel,
  ): Promise<ProcedureResponse> {
    const procedure = await this.procedureService.createProcedure(serviceData);

    return new ProcedureResponse(procedure);
  }

  @Get(':id')
  async getService(@Param('id') id: string): Promise<ProcedureModel> {
    const service = await this.procedureService.procedure({ id: Number(id) });

    if (!service) {
      throw new NotFoundException();
    }

    return service;
  }

  @Get()
  async getAllServices(): Promise<ProcedureModel[]> {
    const services = await this.procedureService.procedures({});

    if (!services.length) {
      throw new NotFoundException('No services found');
    }
    return services;
  }

  @Get('price/:price')
  async getServicesByPrice(
    @Param('price') price: string,
  ): Promise<ProcedureResponse[]> {
    return this.procedureService.procedures({
      where: { price: Number(price) },
    });
  }

  @Get('time/:requiredTime')
  async getServicesByRequiredTime(
    @Param('requiredTime') requiredTime: string,
  ): Promise<ProcedureResponse[]> {
    return this.procedureService.procedures({
      where: { requiredTimeMin: Number(requiredTime) },
    });
  }

  @Delete('delete/:serviceName')
  @HttpCode(HttpStatus.OK)
  async deleteService(
    @Param('serviceName') serviceName: string,
  ): Promise<ProcedureModel> {
    return this.procedureService.deleteProcedure(serviceName);
  }
}
