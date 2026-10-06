function Contact() {
  return (
    <section id="contact" className="bg-blue-50 p-6 text-center">
      <h2 className="mb-2 text-2xl font-bold">Contact Us</h2>
      <p className="mb-4">Have a question? Send us a message.</p>
      <a
        className="inline-block rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        href="mailto:contact@example.com"
      >
        Send a message
      </a>
    </section>
  )
}

export default Contact
