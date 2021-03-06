import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { Credentials, ForgotPwdResult, GetUserResult, LogoutResult, RefreshTokenResult } from "./api.types"
import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.setup()
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    this.apisauce.addAsyncRequestTransform(async (request) => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) return;
      request.headers.Authorization = `Bearer ${accessToken}`;
    })
  }

  async login(credentials: Credentials): Promise<Types.LoginResult> {
    const response: ApiResponse<any> = await this.apisauce.post('/auth/login', credentials)

    if(!response.ok) {
      const problem = getGeneralApiProblem(response);
      if(problem) return problem;
    }

    try {
      const resultUser: Types.UserWithAccessToken = {
        accessToken: response.data.accessToken,
        user: response.data.user
      }
      return { kind: "ok", result: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async logout(): Promise<LogoutResult> {
    const response: ApiResponse<any> = await this.apisauce.get('/auth/logout')

    if(!response.ok) {
      const problem = getGeneralApiProblem(response)
      if(problem) return problem;
    }

    return { kind: "ok" }
  }

  async forgotPassword(email: string): Promise<ForgotPwdResult> {
    const response: ApiResponse<any> = await this.apisauce.post('/auth/forgotPassword', {email})

    if(!response.ok) {
      const problem = getGeneralApiProblem(response)
      if(problem) return problem;
    }

    return { kind: "ok" }
  }

  async refreshToken(): Promise<RefreshTokenResult> {
    const response: ApiResponse<any> = await this.apisauce.get('/auth/refreshToken')

    if(!response.ok) {
      const problem = getGeneralApiProblem(response)
      if(problem) return problem;
    }

    try {
      const resultUser: Types.UserWithAccessToken = {
        accessToken: response.data.accessToken,
        user: response.data.user
      }
      return { kind: "ok", result: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getMySelf(): Promise<GetUserResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/auth/me`)

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
