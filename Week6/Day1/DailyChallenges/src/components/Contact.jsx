function Contact() {
  return (
    <section id="contact" className="bg-blue-50 p-6 text-center">
      <h2 className="mb-2 text-2xl font-bold">Contact Us</h2>
      <p className="mb-4">Have a question? Send us a message.</p>
      <form className="mx-auto grid max-w-md gap-4 text-left">
        <label className="grid gap-1">
          Name
          <input className="rounded border border-gray-300 bg-white p-3" type="text" placeholder="Your name" />
        </label>
        <label className="grid gap-1">
          Email
          <input className="rounded border border-gray-300 bg-white p-3" type="email" placeholder="you@example.com" />
        </label>
        <button className="rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700" type="submit">
          Send a message
        </button>
      </form>
    </section>
  )
}

export default Contact
