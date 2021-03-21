import React from 'react'
import styled from 'styled-components'

const AlertWrapper = styled.div`
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  color: ${props => props.status === "error" ? "red" : "green"};
  background: ${props => props.status === "error" ? "lightsalmon" : "lightgreen"};
`

const Alert = React.memo(({message, status}) => <AlertWrapper status={status}>{message}</AlertWrapper>)

export default Alert;