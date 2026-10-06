import { useState } from "react";

function Forms() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(null);
  const [errormessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("Hello, this is my textarea.");
  const [car, setCar] = useState("Volvo");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    }

    if (name === "age") {
      setAge(value);

      if (value !== "" && isNaN(value)) {
        setErrorMessage("Your age must be a number");
      } else {
        setErrorMessage("");
      }
    }
  };

  const mySubmitHandler = (event) => {
    event.preventDefault();
    alert(`Username: ${username}\nAge: ${age}`);
  };

  let header = null;

  if (username && age && !errormessage) {
    header = (
      <h1>
        My name is {username} and I am {age} years old.
      </h1>
    );
  }

  return (
    <div>
      {header}

      <form onSubmit={mySubmitHandler}>
        <label>Name: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Age: </label>
        <input
          type="text"
          name="age"
          value={age || ""}
          onChange={handleChange}
        />

        <br />

        {errormessage && <p>{errormessage}</p>}

        <br />

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h2>Textarea</h2>

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows="5"
        cols="40"
      />

      <hr />

      <h2>Select a Car</h2>

      <select
        value={car}
        onChange={(event) => setCar(event.target.value)}
      >
        <option value="Volvo">Volvo</option>
        <option value="BMW">BMW</option>
        <option value="Mercedes">Mercedes</option>
        <option value="Audi">Audi</option>
      </select>

      <p>Selected car: {car}</p>
    </div>
  );
}

export default Forms;