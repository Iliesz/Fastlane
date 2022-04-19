import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetUsersResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import * as Types from "./api.types"

export class UserApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getUsers(): Promise<GetUsersResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get("/users")

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const users = response.data.results

      return { kind: "ok", users }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getUser(id: string): Promise<Types.GetUserResult> {
    const response: ApiResponse<any> = await this.api.apisauce.get(`/users/${id}`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const resultUser: Types.User = response.data;
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
