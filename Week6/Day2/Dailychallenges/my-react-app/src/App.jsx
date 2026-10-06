import { useState } from 'react'
import './App.css'

function App() {
  const [languages, setLanguages] = useState([
    { name: 'PHP', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaScript', votes: 0 },
    { name: 'Java', votes: 0 },
  ])

  function voteForLanguage(languageName) {
    setLanguages((currentLanguages) =>
      currentLanguages.map((language) =>
        language.name === languageName
          ? { ...language, votes: language.votes + 1 }
          : language,
      ),
    )
  }

  return (
    <main className="voting-app">
      <section className="voting-panel" aria-labelledby="page-title">
        <header className="panel-header">
          <span className="eyebrow">THE COMMUNITY POLL</span>
          <h1 id="page-title">Vote your favorite language</h1>
          <p>Which language do you enjoy working with the most?</p>
        </header>

        <div className="language-list" aria-label="Programming languages">
          {languages.map((language) => (
            <article className="language-card" key={language.name}>
              <div className="language-info">
                <h2>{language.name}</h2>
                <p>
                  {language.votes} {language.votes === 1 ? 'vote' : 'votes'}
                </p>
              </div>
              <button
                className="vote-button"
                type="button"
                onClick={() => voteForLanguage(language.name)}
                aria-label={`Vote for ${language.name}`}
              >
                Vote
                <span aria-hidden="true">+</span>
              </button>
            </article>
          ))}
        </div>

        <p className="panel-footer" aria-live="polite">
          Every vote counts. Cast yours!
        </p>
      </section>
    </main>
  )
}

export default App
