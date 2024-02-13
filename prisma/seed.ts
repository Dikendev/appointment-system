import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const serviceData: Prisma.ServiceCreateInput[] = [
  {
    name: 'Corte de cabelo',
    price: 80,
    requiredTimeMin: 100,
  },
  {
    name: 'Banho em Gel',
    price: 180,
    requiredTimeMin: 150,
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Cristina Freitas',
    email: 'Cristina@gmail.com',
    password: '12345',
  },
  {
    name: 'Diego Kennedy ',
    email: 'diego@gmail.com',
    password: '737373',
  },
];

const clientData: Prisma.ClientCreateInput[] = [
  {
    name: 'Dedeco',
    email: 'dedeco@gmail.com',
  },
  {
    name: 'David',
    email: 'David@gmail.com',
  },
];
async function main() {
  console.log(`Start seeding ...`);

  for (const u of serviceData) {
    const service = await prisma.service.create({
      data: u,
    });
    console.log(`Created service with id:${service.id}`);
  }

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id:${user.id}`);
  }

  for (const u of clientData) {
    const client = await prisma.client.create({
      data: u,
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
