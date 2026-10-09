import { Component } from 'react'
import data from './data.json'

class Example1 extends Component {
  render() {
    return (
      <section className="data-example">
        <h2>Example1 Component</h2>
        <ul>
          {data.SocialMedias.map((socialMedia) => (
            <li key={socialMedia}>{socialMedia}</li>
          ))}
        </ul>
      </section>
    )
  }
}

export default Example1
