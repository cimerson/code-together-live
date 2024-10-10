import axios, { AxiosPromise, AxiosResponse } from 'axios'

const api = import.meta.env.VITE_API_ENDPOINT;

const instance = axios.create({
  baseURL: `${api}/authentications`,
  withCredentials: true,
})

interface User {
  id: string
  username: string
}

const responseBody = (response: AxiosResponse) => response.data

const requests = {

  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body?: object) => instance.post(url, body).then(responseBody),

}

export const Authentications = {
  createUser: (data: object): Promise<AxiosPromise> => requests.post('register', data),
  loginUser: (data: object): Promise<User> => requests.post('login', data),
  logout: (): Promise<AxiosPromise> => requests.post('logout'),

  getAuthUser: (): Promise<User> => requests.get('')
}