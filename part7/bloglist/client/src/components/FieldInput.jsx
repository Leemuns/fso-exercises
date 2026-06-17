import { TextField } from '@mui/material'

const FieldInput = ({ label, value, setValue }) => {
  return (
    <div>
      <TextField
        label={label}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        variant="outlined"
        size="small"
        margin="dense"
      />
    </div>
  )
}

export default FieldInput
