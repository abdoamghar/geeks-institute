import React from 'react';
import countries from './countries.js';
import './style.css';

class AutoCompletedText extends React.Component {
  state = {
    suggestions: [],
    text: ''
  };

  handleChange = (event) => {
    const text = event.target.value;
    const suggestions = text
      ? countries.filter((country) =>
          country.toLowerCase().startsWith(text.toLowerCase())
        )
      : [];

    this.setState({ suggestions, text });
  };

  selectCountry = (country) => {
    this.setState({ text: country, suggestions: [] });
  };

  render() {
    const { suggestions, text } = this.state;

    return (
      <main className="autocomplete">
        <h1>Auto Completed</h1>
        <input
          aria-label="Search for a country"
          autoComplete="off"
          onChange={this.handleChange}
          type="text"
          value={text}
        />
        <ul className="suggestions">
          {suggestions.map((country) => (
            <li key={country}>
              <button
                className="suggestion"
                onClick={() => this.selectCountry(country)}
                type="button"
              >
                {country}
              </button>
            </li>
          ))}
        </ul>
        <p className="suggestion-count">Suggestions: {suggestions.length}</p>
      </main>
    );
  }
}

export default AutoCompletedText;
