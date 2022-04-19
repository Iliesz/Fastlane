import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export type User = {
  id: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface UserWithAccessToken {
  accessToken: string
  user: User
}

export interface Credentials {
  email: string
  password: string
}

export type LoginResult = { kind: "ok", result: UserWithAccessToken} | GeneralApiProblem
export type RefreshTokenResult = { kind: "ok", result: UserWithAccessToken} | GeneralApiProblem
export type LogoutResult = { kind: "ok" } | GeneralApiProblem
export type ForgotPwdResult = { kind: "ok" } | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
