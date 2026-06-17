import { TextField } from '@mui/material'

const FieldInputLogin = ({ label, value, setValue, type = 'text' }) => {
  // throw new Error('simulated error')
  return (
    <div>
      <TextField
        label={label}
        value={value}
        onChange={event => setValue(event.target.value)}
        type={type}
        variant='standard'
        size='small'
        margin='dense'
        sx={{
          '& .MuiInputLabel-root': {
            transform: 'translate(14px, 16px) scale(1)',
            transition: 'transform 200ms ease-out',
          },
          '& .MuiInputLabel-shrink': {
            transform: 'scale(0.75)',
          },
        }}
      />
    </div>
  )
}

export default FieldInputLogin