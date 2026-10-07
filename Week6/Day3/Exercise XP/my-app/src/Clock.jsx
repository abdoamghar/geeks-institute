import { Component } from 'react'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const weeks = Array.from({ length: 7 }, (_, index) => `week ${index + 1}`)

class Clock extends Component {
  state = this.getTime()

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState(this.getTime())
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  getTime() {
    const now = new Date()

    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      weekday: now.getDay(),
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
    }
  }

  renderRing(items, currentIndex, ringName) {
    return items.map((label, index) => {
      const angle = (index / items.length) * 360

      return (
        <span
          className={`clock-label ${index === currentIndex ? 'current' : ''}`}
          key={`${ringName}-${label}`}
          style={{ '--angle': `${angle}deg` }}
        >
          {label}
        </span>
      )
    })
  }

  render() {
    const { year, month, weekday, day, hour, minute, second } = this.state
    const hours = Array.from({ length: 24 }, (_, index) => `${index} hr`)
    const minutes = Array.from({ length: 60 }, (_, index) => `${index} min`)
    const seconds = Array.from({ length: 60 }, (_, index) => `${index} sec`)
    const days = Array.from({ length: 31 }, (_, index) => `${index + 1} day`)
    const numberedMonths = months.map((_, index) => `${index + 1} month`)
    const weekIndex = weekday === 0 ? 6 : weekday - 1
    const ringRotation = (index, length) =>
      `${270 - (index / length) * 360}deg`

    return (
      <section className="exercise clock-exercise">
        <h2>Exercise XP: React Clock</h2>
        <div className="clock">
          <div className="clock-year">{year} / Year</div>
          <div className="clock-month">{months[month]}</div>
          <div aria-label="Current date and time" className="clock-face">
            <div className="clock-ring ring-months">
              <div
                className="clock-ring-rotator"
                style={{ '--rotation': ringRotation(month, numberedMonths.length) }}
              >
                {this.renderRing(numberedMonths, month, 'month')}
              </div>
            </div>
            <div className="clock-ring ring-weekdays">
              <div
                className="clock-ring-rotator"
                style={{ '--rotation': ringRotation(weekIndex, weeks.length) }}
              >
                {this.renderRing(weeks, weekIndex, 'week')}
              </div>
            </div>
            <div className="clock-ring ring-days">
              <div
                className="clock-ring-rotator"
                style={{ '--rotation': ringRotation(day - 1, days.length) }}
              >
                {this.renderRing(days, day - 1, 'day')}
              </div>
            </div>
            <div className="clock-ring ring-hours">
              <div
                className="clock-ring-rotator"
                style={{ '--rotation': ringRotation(hour, hours.length) }}
              >
                {this.renderRing(hours, hour, 'hour')}
              </div>
            </div>
            <div className="clock-ring ring-minutes">
              <div
                className="clock-ring-rotator"
                style={{ '--rotation': ringRotation(minute, minutes.length) }}
              >
                {this.renderRing(minutes, minute, 'minute')}
              </div>
            </div>
            <div className="clock-ring ring-seconds">
              <div
                className="clock-ring-rotator"
                style={{ '--rotation': ringRotation(second, seconds.length) }}
              >
                {this.renderRing(seconds, second, 'second')}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Clock
