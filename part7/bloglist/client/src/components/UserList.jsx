import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

import useUsers from '../hooks/useUsers'

const UserList = () => {
  const { users, isPending } = useUsers()

  if (isPending) {
    return <div>Loading users...</div>
  }

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead sx={{ '& .MuiTableCell-head': { fontWeight: 'bold' } }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
