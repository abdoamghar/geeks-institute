import { Rocket, Smartphone, Zap } from "lucide-react"
import Header from "./components/Header.jsx"
import Card from "./components/Card.jsx"
import Contact from "./components/Contact.jsx"

function App() {
  return (
    <>
      <Header />

      <main id="home">
        <section id="features" className="p-6 text-center">
          <h1 className="mb-6 text-3xl font-bold">Our Features</h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card
              icon={<Rocket size={32} />}
              title="Fast Performance"
              description="Our product works quickly and saves you time."
            />
            <Card
              icon={<Zap size={32} />}
              title="Easy to Use"
              description="Simple tools help you get started right away."
            />
            <Card
              icon={<Smartphone size={32} />}
              title="Modern Design"
              description="Use our product on desktop, tablet, or mobile."
            />
          </div>
        </section>

        <Contact />
      </main>
    </>
  )
}

export default App
