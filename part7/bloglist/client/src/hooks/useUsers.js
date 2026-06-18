import { useQuery } from '@tanstack/react-query'

import usersService from '../services/users'

const useUsers = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const data = await usersService.getAll()
      // return data.sort((a, b) => b.likes - a.likes)
      return data
    },
    refetchOnWindowFocus: false,
  })

  return {
    users: result.data,
    isPending: result.isPending,
    isError: result.isError,
    getUser: (userId) => result.data?.find((u) => u.id === userId),
  }
}

export default useUsers
