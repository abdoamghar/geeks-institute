import './App.css'
import Car from './Components/Car'
import Color from './Components/Color'
import Phone from './Components/Phone'
import Forms from './Components/Forms'
import FormData from './Components/FormData'
import UserForm from './Components/UserForm'

function App() {

  const carinfo = {name: "Ford", model: "Mustang"}

  return (
    <>
    <h1>My React App</h1>
      <Car carinfo={carinfo} />
      <Phone />
      <Color />
      <Forms />
      <hr />
      <FormData />

      <hr />

      <UserForm />
    </>
  )
}

export default App
