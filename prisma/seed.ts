import { PrismaClient } from '@prisma/client';
import { ClientDto, ProcedureDto, UserDto } from '../src/domain/entities/dtos';
import { hashPassword } from '../src/domain/auth/hash-password';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClient();

const logger = new Logger('NestApplication');

const proceduresMock: ProcedureDto[] = [
  {
    name: 'Corte de cabelo',
    price: 80,
    requiredTimeMin: 100,
    procedureImage: 'base64',
  },
  {
    name: 'Manicure',
    price: 50,
    requiredTimeMin: 60,
    procedureImage: 'base64',
  },
];

const usersMock: UserDto[] = [
  {
    name: 'Cristina Freitas',
    profile: {
      email: 'Cristina@gmail.com',
    },
    password: '12345',
  },
  {
    name: 'Diego Kennedy',
    profile: {
      email: 'diego@gmail.com',
    },
    password: '99999',
  },
];

const clientsMock: ClientDto[] = [
  {
    name: 'Dedeco',
    profile: {
      email: 'dedeco@gmail.com',
    },
    password: 'dedeco123',
  },
  {
    name: 'João',
    profile: {
      email: 'joao@gmail.com',
    },
    password: 'joao123',
  },
];

function setDate(day: number, month: number, hour: number): Date {
  const date = new Date();
  date.setMonth(month);
  date.setDate(day);
  date.setHours(hour);
  return date;
}

async function clearData() {
  await prisma.user.deleteMany();
  await prisma.client.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.procedure.deleteMany();
  await prisma.booking.deleteMany();
  logger.log('Data cleared');
  await prisma.$disconnect();
  logger.log('disconnected');
}

async function main() {
  logger.log(`Start seeding ...`);

  await clearData();

  const procedureIds: string[] = [];
  const userIds: string[] = [];
  const clientIds: string[] = [];

  for (const p of proceduresMock) {
    const procedure = await prisma.procedure.create({
      data: {
        name: p.name,
        price: p.price,
        requiredTimeMin: p.requiredTimeMin,
        procedureImage: p.procedureImage,
      },
    });

    procedureIds.push(procedure.id);
    logger.log(`Created service with id:${procedure.id}`);
  }

  for (const u of usersMock) {
    const hashedPassword = await hashPassword(u.password);
    const user = await prisma.user.create({
      data: {
        name: u.name,
        profile: {
          create: {
            email: u.profile.email,
          },
        },
        password: hashedPassword,
      },
    });

    userIds.push(user.id);
    logger.log(`Created user with id:${user.id}`);
  }

  for (const c of clientsMock) {
    const client = await prisma.client.create({
      data: {
        name: c.name,
        profile: {
          create: {
            email: c.profile.email,
          },
        },
        password: c.password,
      },
    });
    clientIds.push(client.id);
    logger.log(`Created client with id:${client.id}`);
  }

  for (const userId of userIds) {
    for (let i = 0; i < procedureIds.length; i++) {
      const randomHour = Math.floor(Math.random() * 10);
      const booking = await prisma.booking.create({
        data: {
          clientId: clientIds[i],
          userId: userId,
          procedureId: procedureIds[i],
          total: proceduresMock[i].price,
          startAt: setDate(1, 9, 1 + randomHour),
          finishAt: setDate(
            1,
            9,
            1 + randomHour + proceduresMock[i].requiredTimeMin,
          ),
        },
      });

      logger.log(
        `Created booking with id:${booking.id}, to the user with id:${userId}`,
      );
    }
  }

  logger.log('Seeding finished');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
