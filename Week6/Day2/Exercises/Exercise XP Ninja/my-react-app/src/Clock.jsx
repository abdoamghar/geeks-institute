import { useEffect, useState } from 'react'

function Clock() {
  const [currentDate, setCurrentDate] = useState(() => new Date())

  useEffect(() => {
    function tick() {
      setCurrentDate(new Date())
    }

    const intervalId = window.setInterval(tick, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="clock-card" aria-label="Local time">
      <h1>Hello, world!</h1>
      <p>It is {currentDate.toLocaleTimeString()}.</p>
    </section>
  )
}

export default Clock
