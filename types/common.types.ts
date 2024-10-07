import { Prisma } from '@prisma/client';

export type Message = { success: string } | { error: string } | { message: string };

export type ValidationErrors = {
  [name: string]: string[] | string;
};

export type PrismaUser = Prisma.usersGetPayload<{
  include: { identities: true };
}>;

export type IdentityData = {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  user_name?: string;
};
