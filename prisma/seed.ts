import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "42117e1f-ffb6-4e76-8a23-ab4d45ebe937",
      title: "Unite Summit",
      slug: "unite-summit",
      details: "Um evento para devs apaixonados",
      maximumAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("Database seed!");
  prisma.$disconnect();
});
