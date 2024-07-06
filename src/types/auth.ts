import {
  User,
  Student,
  Lecturer,
  Supervisor,
  Examiner,
} from "@lotfiarif-development/mdms-prisma-schema";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: User["email"];
  password: string;
  firstName: User["firstName"];
  lastName: User["lastName"];
  universityId: string; // This will be either matricNumber or staffNumber
}

export interface AuthState {
  user:
    | (User & {
        student?: Student;
        lecturer?: Lecturer & {
          supervisor?: Supervisor;
          examiner?: Examiner;
        };
      })
    | null;
  token: Token | null;
  error: string | null;
  isLoading: boolean;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
