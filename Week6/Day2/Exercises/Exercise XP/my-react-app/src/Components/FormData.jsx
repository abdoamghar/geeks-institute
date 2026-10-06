import { useState } from "react";

function FormData() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    yearPublished: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>New Book</h1>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Year Published</label>
        <input
          type="number"
          name="yearPublished"
          value={formData.yearPublished}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Submit</button>
      </form>

      {submitted && <h2>Book submitted successfully!</h2>}
    </div>
  );
}

export default FormData;