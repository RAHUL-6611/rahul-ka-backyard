// import { PrismaClient } from "@prisma/client";
// import mongoose from 'mongoose';
// import { env } from "~/env";

// const createPrismaClient = () =>
//   new PrismaClient({
//     log:
//       env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//     adapter: new PrismaPlanetScale(psClient),
//   });



// const globalForPrisma = globalThis as unknown as {
//   prisma: ReturnType<typeof createPrismaClient> | undefined;
// };

// export const db = globalForPrisma.prisma ?? createPrismaClient();

// if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;



import { PrismaClient } from '@prisma/client';

// Function to create a Prisma client instance
const createPrismaClient = () => new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});

// This pattern ensures that in a serverless environment each function execution reuses the same Prisma instance,
// rather than creating a new one with each invocation
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

// Initialize or reuse the Prisma client
export const db = globalForPrisma.prisma ?? createPrismaClient();

// In non-production environments, retain the same Prisma client across hot reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
