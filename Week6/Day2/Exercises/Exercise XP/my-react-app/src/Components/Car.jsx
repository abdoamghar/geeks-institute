import { useState } from 'react'
import Garage from './Garage'

function Car({ carinfo }) {

    const [color] = useState("red");

  return (
    <div>
      <h1>This car is {color} {carinfo.model}</h1>
      <Garage size="small" />
    </div>
  )
}

export default Car