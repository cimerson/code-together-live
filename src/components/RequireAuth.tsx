
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useStore } from '../utils/store';


interface RequireAuthProps {
  // user: { userName: string } | undefined,
  children?: JSX.Element
}

// const RequireAuth = ({ user, children }: RequireAuthProps) => {
const RequireAuth = ({ children }: RequireAuthProps) => {

  // const { rooms, isLoading, error} = useGetAuthUser()

  // const [user, ] = useState(() => {
  //   // getting stored value
  //   const saved = localStorage.getItem('user')
  //   if(saved !== null){
  //     const initialValue = JSON.parse(saved)
  //     return initialValue
  //   }else{
  //     return null
  //   }
  // })
  const { username } = useStore()

  const location = useLocation()

  if (!username) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children? children : <Outlet />
}

export default RequireAuth