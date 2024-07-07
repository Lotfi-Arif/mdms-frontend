import {
  Examiner,
  Lecturer,
  Student,
  Supervisor,
  User,
} from "@lotfiarif-development/mdms-prisma-schema";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

interface FullUser extends User {
  student?: Student;
  lecturer?: Lecturer & {
    supervisor?: Supervisor;
    examiner?: Examiner;
  };
}

export type FullUserWithoutPassword = Omit<FullUser, "password">;
