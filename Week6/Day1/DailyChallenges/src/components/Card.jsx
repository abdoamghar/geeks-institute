function Card({ icon: Icon, title, description, tone, index }) {
  return (
    <article className={`feature-card tone-${tone}`}>
      <div className="card-topline"><span className="card-number">0{index} / LITTLE THINGS</span><span className="card-icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span></div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="card-decoration" aria-hidden="true">✳</span>
    </article>
  )
}

export default Card
