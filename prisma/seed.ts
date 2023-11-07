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

async function main() {
  console.log(`Start seeding ...`);

  for (const u of serviceData) {
    const service = await prisma.service.create({
      data: u,
    });
    console.log(`Created service with id:${service.id}`);
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
