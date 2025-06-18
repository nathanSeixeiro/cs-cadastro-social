import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  // Add the missing enableTracing option
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
  // enableTracing: true // This option does not exist in PrismaClientOptions
})

export default prisma