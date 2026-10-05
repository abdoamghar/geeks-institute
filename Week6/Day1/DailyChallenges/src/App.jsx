import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Card from './components/Card.jsx'
import Contact from './components/Contact.jsx'
import { features } from './data/features.js'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="features-section px-6 py-20 text-center" id="features" aria-labelledby="features-title">
          <div className="section-intro">
            <p className="eyebrow">A softer way to get things done</p>
            <h2 id="features-title">Less keeping up.<br /><span>More looking forward.</span></h2>
          </div>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <Card key={feature.title} {...feature} index={index + 1} />
            ))}
          </div>
        </section>
        <Contact />
      </main>
      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#home">morrow<span>.</span></a>
        <p>A little more room for a good day.</p>
        <span className="copyright">© 2025 Morrow Studio</span>
      </footer>
    </>
  )
}

export default App
