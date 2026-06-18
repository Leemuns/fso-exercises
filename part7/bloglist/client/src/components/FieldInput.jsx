import { TextField } from '@mui/material'

const FieldInput = ({ inputValues, styleType }) => {
  if (styleType === 'login') {
    return (
      <div>
        <TextField
          {...inputValues}
          variant="standard"
          size="small"
          margin="dense"
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

  if (styleType === 'create') {
    return (
      <div>
        <TextField
          {...inputValues}
          variant="outlined"
          size="small"
          margin="dense"
        />
      </div>
    )
  }

  return (
    <div>
      <TextField {...inputValues} />
    </div>
  )
}

export default FieldInput
