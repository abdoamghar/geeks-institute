function Card({ icon, title, description }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div className="mb-4 flex justify-center text-blue-600">{icon}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </article>
  )
}

export default Card
