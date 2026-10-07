import { useState } from 'react'
import './App.css'

function FormComponent({ formData, handleChange }) {
  return (
    <>
      <form className="form-container" method="get" action="/">
        <h1>Sample form</h1>

        <div className="form-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />

          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <label className="destination-label" htmlFor="destination">
            Select your destination
          </label>
          <select
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          >
            <option value="">-- Please Choose a destination --</option>
            <option value="Japan">Japan</option>
            <option value="Thailand">Thailand</option>
            <option value="Brazil">Brazil</option>
          </select>

          <fieldset>
            <legend>Dietary restrictions:</legend>
            <label>
              <input
                type="checkbox"
                name="nutsFree"
                checked={formData.nutsFree}
                onChange={handleChange}
              />
              Nuts free
            </label>
            <label>
              <input
                type="checkbox"
                name="lactoseFree"
                checked={formData.lactoseFree}
                onChange={handleChange}
              />
              Lactose free
            </label>
            <label>
              <input
                type="checkbox"
                name="vegan"
                checked={formData.vegan}
                onChange={handleChange}
              />
              Vegan
            </label>
          </fieldset>

          <button type="submit">Submit</button>
        </div>
      </form>

      <section className="information">
        <h2>Entered information:</h2>
        <p>Your name: {formData.firstName} {formData.lastName}</p>
        <p>Your age: {formData.age}</p>
        <p>Your gender: {formData.gender}</p>
        <p>Your destination: {formData.destination}</p>
        <p>Your dietary restrictions:</p>
        <div className="restriction-results">
          **Nuts free : {formData.nutsFree ? 'Yes' : 'No'}
          <br />
          **Lactose free : {formData.lactoseFree ? 'Yes' : 'No'}
          <br />
          **Vegan meal : {formData.vegan ? 'Yes' : 'No'}
        </div>
      </section>
    </>
  )
}

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    destination: '',
    nutsFree: false,
    lactoseFree: false,
    vegan: false,
  })

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return <FormComponent formData={formData} handleChange={handleChange} />
}

export default App
