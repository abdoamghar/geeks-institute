import { Component } from 'react'
import data from './data.json'

class Example3 extends Component {
  render() {
    return (
      <section className="data-example">
        <h2>Example3 Component</h2>
        <div className="experiences-card">
          {data.Experiences.map((experience) => (
            <div className="experience" key={experience.companyName}>
              <img src={experience.logo} alt={`${experience.companyName} logo`} />
              <a href={experience.url}>{experience.companyName}</a>
              {experience.roles.map((role) => (
                <div key={`${experience.companyName}-${role.title}`}>
                  <h3>{role.title}</h3>
                  <p>
                    {role.startDate}
                    {role.endDate && ` - ${role.endDate}`} {role.location}
                  </p>
                  <p>{role.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default Example3
