import { Component } from 'react'
import data from './data.json'

class Example2 extends Component {
  render() {
    return (
      <section className="data-example">
        <h2>Example2 Component</h2>
        <div className="skills-card">
          {data.Skills.map((area) => (
            <section key={area.Area}>
              <h3>{area.Area}</h3>
              <ul>
                {area.SkillSet.map((skill) => (
                  <li key={skill.Name}>{skill.Name}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    )
  }
}

export default Example2
