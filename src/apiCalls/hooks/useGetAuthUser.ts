import axios from 'axios'
import { useEffect, useState } from 'react'
import { Authentications } from '../auth'


export interface User {
  id: string
  username: string
}

interface State {
  user: User | undefined,
  isLoading: boolean,
  error: string
}

const useGetAuthUser = () => {
  const [state, setState] = useState<State>({
    user: undefined,
    isLoading: true,
    error: '',
  })

  const getUser = async () => {
    try {
      const user = await Authentications.getAuthUser()
      setState({ user: user as unknown as User, isLoading: false, error: '' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setState({ user: undefined, isLoading: false, error: error.message })
      }
    }
  }

  useEffect(() => {
    getUser().then((r) => r)
  }, [])

  return state
}

export default useGetAuthUser
