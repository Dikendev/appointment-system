import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../external/prisma/prisma.service';
import { ClientPrismaService } from '../client-prisma.service';
import {
  clientMock,
  clientResponseDelete,
  clientResponseMock,
  prismaMock,
} from './create-client-prisma-mock';
import { NotFoundException } from '@nestjs/common';
import { CreateClientDTO } from '../model/client.model';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('ClientPrismaService', () => {
  let clientPrismaService: ClientPrismaService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientPrismaService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    clientPrismaService = module.get<ClientPrismaService>(ClientPrismaService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clientPrismaService to be defined', async () => {
    expect(clientPrismaService).toBeDefined();
  });

  it('should prisma to be defined', async () => {
    expect(prisma).toBeDefined();
  });

  describe('client', () => {
    it('should return one client by id', async () => {
      const clientResponse = await clientPrismaService.client(
        clientResponseMock[0].id,
      );

      expect(clientResponse).toEqual(clientResponseMock[0]);
      expect(prisma.client.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.client.findUnique).toHaveBeenCalledWith({
        where: { id: clientResponseMock[0].id },
      });
    });

    it('should throw a error if client is not found', async () => {
      jest.spyOn(prisma.client, 'findUnique').mockResolvedValue(undefined);

      try {
        await clientPrismaService.client(clientResponseMock[0].id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('clients', () => {
    it('should return all clients', async () => {
      const clientResponse = await clientPrismaService.clients();
      expect(clientResponse).toEqual(clientResponseMock);
    });

    it('should throw not found exception', async () => {
      jest.spyOn(prisma.client, 'findMany').mockResolvedValue([]);

      try {
        await clientPrismaService.clients();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createClient', () => {
    it('should create a valid client', async () => {
      const clientResponse = await clientPrismaService.createClient(clientMock);
      expect(clientResponse).toEqual(clientResponseMock[0]);
      expect(prisma.client.create).toBeCalledWith({ clientMock });
      expect(prisma.client.create).toBeCalledTimes(1);
    });

    it('should not accept create user name without/empty name ', async () => {
      const data = {
        email: 'any_email@gmail.com',
        password: '1234',
        phoneNumber: '99999',
      };
      const empty = plainToInstance(CreateClientDTO, data);

      const errors = await validate(empty);
      expect(errors.length).not.toBe(0);
    });

    it('should not accept create user without email', async () => {
      const data = {
        name: 'any_name333',
        phoneNumber: '99999',
        password: '1234',
      };
      const empty = plainToInstance(CreateClientDTO, data);

      const errors = await validate(empty);
      expect(errors.length).not.toBe(0);
    });

    it('should not accept create user without password', async () => {
      const data = {
        name: 'any_name333',
        email: 'any_email333@gmail.com',
        phoneNumber: '99999',
      };
      const empty = plainToInstance(CreateClientDTO, data);

      const errors = await validate(empty);
      expect(errors.length).not.toBe(0);
    });
  });

  describe('deleteClient', () => {
    const data: CreateClientDTO = {
      name: 'any_name333',
      email: 'any_email333@gmail.com',
      phoneNumber: '99999',
      password: '666',
    };

    it('should throw not found exception', async () => {
      try {
        await clientPrismaService.deleteClient(clientResponseMock[0].id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
      expect(prisma.client.delete).toBeCalledTimes(1);
    });

    it('should delete successfully a client', async () => {
      prismaMock.client.delete.mockReturnValue(clientResponseDelete);

      const userResponse = await clientPrismaService.deleteClient(2);
      expect(prisma.client.delete).toBeCalledTimes(1);
      expect(userResponse).toEqual(clientResponseDelete);
    });
  });
});
