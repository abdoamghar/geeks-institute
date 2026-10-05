import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'

function Contact() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">A GOOD THING STARTS HERE</p>
          <h2 id="contact-title">Your next chapter<br /><em>looks good on you.</em></h2>
          <p>Be the first to try Morrow. Leave us your email and we’ll save you a spot at the table.</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="email">YOUR EMAIL ADDRESS</label>
          <div className="email-field">
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitted}
            />
            <button className="button button-lime" type="submit" disabled={submitted}>
              {submitted ? <>You’re on the list <Check size={16} /></> : <>Count me in <ArrowUpRight size={16} /></>}
            </button>
          </div>
          <p className="form-feedback" aria-live="polite">{submitted ? 'Lovely. Keep an eye on your inbox.' : 'No noise, just a note when we’re ready.'}</p>
        </form>
      </div>
      <div className="contact-sun" aria-hidden="true">✳</div>
    </section>
  )
}

export default Contact
