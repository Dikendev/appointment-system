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
import { ServiceService } from './service.service';
import { Service as ServiceModel } from '@prisma/client';
import { ServiceResponseDTO } from './service.model';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createService(
    @Body() serviceData: ServiceModel,
  ): Promise<ServiceResponseDTO> {
    const service = await this.serviceService.createService(serviceData);

    return new ServiceResponseDTO(service);
  }

  @Get('/:id')
  async getService(@Param('id') id: string): Promise<ServiceModel> {
    const service = this.serviceService.service({ id: Number(id) });

    if (!(await service)) {
      throw new NotFoundException(`Serviço não encontrado`);
    }

    return service;
  }

  @Get()
  async getAllServices(): Promise<ServiceModel[]> {
    const services = this.serviceService.services({});

    if (!(await services).length) {
      throw new NotFoundException('No services found');
    }
    return services;
  }

  @Get('/price/:price')
  async getServicesByPrice(
    @Param('price') price: string,
  ): Promise<ServiceResponseDTO[]> {
    return this.serviceService.services({
      where: { price: Number(price) },
    });
  }

  @Get('/time/:requiredTime')
  async getServicesByRequiredTime(
    @Param('requiredTime') requiredTime: string,
  ): Promise<ServiceResponseDTO[]> {
    return this.serviceService.services({
      where: { requiredTimeMin: Number(requiredTime) },
    });
  }

  @Delete('delete/:serviceName')
  @HttpCode(HttpStatus.OK)
  async deleteService(
    @Param('serviceName') serviceName: string,
  ): Promise<ServiceModel> {
    console.log('serviceName', serviceName);
    return this.serviceService.deleteService(serviceName);
  }
}
