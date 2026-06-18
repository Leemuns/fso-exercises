import { useParams } from 'react-router-dom'
import { Card, CardContent, Typography, List, ListItem } from '@mui/material'

import useUsers from '../hooks/useUsers'

const User = () => {
  const { userId } = useParams()
  const { getUser, isPending } = useUsers()

  if (isPending) {
    return <div>loading user...</div>
  }

  const user = getUser(userId)

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          {user.name}
        </Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          added blogs
        </Typography>
        <List
          dense
          sx={{
            listStyleType: 'disc',
            pl: 4,
            '& .MuiListItem-root': {
              display: 'list-item',
              fontSize: '1rem',
              padding: 0,
            },
          }}
        >
          {user.blogs.map((b) => (
            <ListItem key={b.id}>{b.title}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default User
