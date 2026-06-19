import { useState } from 'react'

const useField = ({
  label,
  name = label.toLowerCase(),
  styleType = 'null',
  type = 'text',
}) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    inputValues: {
      label,
      name,
      value,
      onChange,
      type,
    },
    styleType,
    clear: () => setValue(''),
  }
}

export default useField
