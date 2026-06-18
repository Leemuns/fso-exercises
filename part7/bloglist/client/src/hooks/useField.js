import { useState } from 'react'

const useField = (label, styleType, type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    inputValues: {
      name: label.toLowerCase(),
      label,
      value,
      onChange,
      type,
    },
    styleType,
    clear: () => setValue(''),
  }
}

export default useField
