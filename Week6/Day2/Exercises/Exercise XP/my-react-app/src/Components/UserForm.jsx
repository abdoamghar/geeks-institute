import { useState } from "react";

function UserForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setUser({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });

    setSubmitted(false);
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h1>Welcome</h1>

          <p>{user.firstName}, {user.lastName}</p>
          <p>{user.phone} | {user.email}</p>

          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Welcome!</h1>

          <p>Please provide your information below.</p>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={user.firstName}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={user.lastName}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default UserForm;