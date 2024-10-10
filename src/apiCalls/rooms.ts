import axios, { AxiosPromise, AxiosResponse } from 'axios'

const api = import.meta.env.VITE_API_ENDPOINT;

const instance = axios.create({
  baseURL: `${api}/rooms`,
  withCredentials: true,
})

interface Room {
  id: string
  name: string
  language: string
  owner: string
}

const responseBody = (response: AxiosResponse) => response.data

const requests = {

  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body?: object) => instance.post(url, body).then(responseBody),

}

export const Rooms = {

  createRoom: (data: object): Promise<Room> => requests.post('', data),

  getUserRooms: (): Promise<AxiosPromise> => requests.get(''),
  getRoomById: (roomId: string): Promise<AxiosPromise> => requests.get(`${roomId}`),

}