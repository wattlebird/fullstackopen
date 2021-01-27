import React, { useCallback } from 'react'

const Filter = React.memo(({value, onChange: onChangeValue}) => {
  const onChange = useCallback((e) => {
    onChangeValue(e.target.value)
  }, [onChangeValue])
  return (
    <div>
      Filter shown with <input value={value} onChange={onChange} />
    </div>
  )
})

export default Filter