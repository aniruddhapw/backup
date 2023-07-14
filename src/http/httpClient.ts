import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  Method,
  InternalAxiosRequestConfig,
  AxiosPromise,
  AxiosRequestHeaders,
} from 'axios'

export interface Request {
  headers?: Record<string, string>
  data?: any
  params?: any
}

export class HttpClient {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      responseType: 'json',
      timeout: 60000,
    })
    this.httpClient.interceptors.request.use(this.handleRequestUse)
    this.httpClient.interceptors.response.use(
      this.handleResponseUse,
      this.handleError,
    )
  }

  private handleRequestUse(config: InternalAxiosRequestConfig) {
    const token = localStorage.getItem('token')
    if (token)
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`

    return config
  }

  private handleResponseUse(response: AxiosResponse) {
    return response
  }

  private handleError(error: AxiosError) {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.assign('/login')
    }
    return error?.response
  }

  private async handleRequest(
    url: string,
    method: Method,
    config: Request = {},
  ): Promise<AxiosResponse<any>> {
    const { headers, data, params } = config
    const response = await this.httpClient.request({
      url,
      method,
      data,
      params,
      headers,
    })
    return response
  }

  public get<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, 'get', config)
  }

  public post<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, 'post', config)
  }

  public put<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, 'put', config)
  }

  public delete<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, 'delete', config)
  }

  public patch<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, 'patch', config)
  }
}

export default new HttpClient()
