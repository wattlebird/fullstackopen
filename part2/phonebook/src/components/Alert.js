import React from 'react'
import './Alert.css'

const Alert = React.memo(({message, status}) => <div className={`alert alert-${status}`}>{message}</div>)

export default Alert;