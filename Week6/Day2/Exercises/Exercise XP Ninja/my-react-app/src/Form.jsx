import { useState } from 'react'
import Input from './Input.jsx'

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

function validate(values) {
  const errors = {
    firstName: [],
    lastName: [],
    phone: [],
    email: [],
  }

  if (!values.firstName.trim()) {
    errors.firstName.push('First name is required')
  }

  if (!values.lastName.trim()) {
    errors.lastName.push('Last name is required')
  }

  const normalizedPhone = values.phone.replace(/[\s().-]/g, '')
  if (!/^\+?\d{7,15}$/.test(normalizedPhone)) {
    errors.phone.push('Phone number is invalid')
  }

  if (!values.email.trim()) {
    errors.email.push('Email is required')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email.push('Email is invalid')
  }

  return errors
}

function Form() {
  const [values, setValues] = useState(initialValues)
  const [submitted, setSubmitted] = useState(false)
  const errors = validate(values)
  const hasErrors = Object.values(errors).some(
    (fieldErrors) => fieldErrors.length > 0,
  )

  function handleChange(event) {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="form-card">
      <h2>Form Validation</h2>
      <form noValidate onSubmit={handleSubmit}>
        <Input
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          errors={errors.firstName}
          autoComplete="given-name"
        />
        <Input
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          errors={errors.lastName}
          autoComplete="family-name"
        />
        <Input
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          errors={errors.phone}
          autoComplete="tel"
        />
        <Input
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          errors={errors.email}
          autoComplete="email"
        />
        <button type="submit">Submit</button>
        {submitted && !hasErrors && (
          <p className="form-success" role="status">
            Form submitted successfully.
          </p>
        )}
      </form>
    </section>
  )
}

export default Form
