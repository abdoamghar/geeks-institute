import { ArrowDown, Check, Sun } from 'lucide-react'

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-kicker"><span className="kicker-dot" /> YOUR DAY, AT YOUR PACE</div>
        <h1 id="hero-title">Make room for <em>what moves you.</em></h1>
        <p className="hero-description">A gentler little planner for your big ideas, everyday errands, and everything in between.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#contact">Find your flow <span className="button-arrow"><ArrowDown size={16} /></span></a>
          <span className="hero-note"><span className="note-sparkle">✳</span> A fresh start, any day</span>
        </div>
        <div className="social-proof">
          <div className="avatar-stack" aria-hidden="true"><span>M</span><span>J</span><span>A</span><span>+</span></div>
          <p><strong>2,400+</strong> people found their pace</p>
        </div>
      </div>

      <div className="hero-art" aria-label="A glimpse at a morning plan in Morrow">
        <div className="sun-disc"><Sun className="sun-icon" size={30} strokeWidth={1.4} /><span>TAKE IT<br />ONE DAY<br />AT A TIME</span></div>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="planner-window">
          <div className="planner-top"><div className="planner-dots"><i /><i /><i /></div><span>MONDAY, MAY 19</span><span className="planner-menu">•••</span></div>
          <div className="planner-greeting"><span>GOOD MORNING, MAYA</span><h3>Today feels like<br />a good day.</h3></div>
          <div className="planner-tasks">
            <div className="task-row"><span className="task-check checked"><Check size={12} /></span><span>Slow morning coffee</span><small>8:30</small></div>
            <div className="task-row"><span className="task-check" /><span>Sketch out new ideas</span><small>10:00</small></div>
            <div className="task-row"><span className="task-check" /><span>Lunch in the sunshine</span><small>12:30</small></div>
          </div>
          <div className="planner-bottom"><span className="progress-copy">YOU'RE OFF TO A LOVELY START</span><span className="progress-bar"><i /></span></div>
        </div>
        <div className="floating-note"><span className="floating-note-icon">✳</span><span><b>A little reminder</b><small>Don't forget to pause.</small></span></div>
        <span className="art-caption">YOUR SPACE TO RESET & BEGIN AGAIN</span>
      </div>
    </section>
  )
}

export default Hero
