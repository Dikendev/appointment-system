import { PrismaClient } from '@prisma/client';
import { ClientDto, ProcedureDto, UserDto } from '../src/domain/entities/dtos';

const prisma = new PrismaClient();

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

async function main() {
  console.log(`Start seeding ...`);

  await clearData();

  for (const p of proceduresMock) {
    const procedure = await prisma.procedure.create({
      data: {
        name: p.name,
        price: p.price,
        requiredTimeMin: p.requiredTimeMin,
        procedureImage: p.procedureImage,
      },
    });
    console.log(`Created service with id:${procedure.id}`);
  }

  for (const u of usersMock) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        profile: {
          create: {
            email: u.profile.email,
          },
        },
        password: u.password,
      },
    });
    console.log(`Created user with id:${user.id}`);
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
    console.log(`Created client with id:${client.id}`);
  }
  console.log(`Seeding finished`);
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

async function clearData() {
  await prisma.user.deleteMany();
  await prisma.client.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.procedure.deleteMany();
  await prisma.booking.deleteMany();
  console.log('Data cleared');
  await prisma.$disconnect();
}
