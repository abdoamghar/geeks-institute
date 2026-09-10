document.getElementById("libform").addEventListener("submit", (e) => {
    e.preventDefault()
    const noun = e.target.elements.noun.value ? e.target.elements.noun.value : "Noun is empty"
    const adjective = e.target.elements.adjective.value ? e.target.elements.adjective.value : "Adjective is empty"
    const verb = e.target.elements.verb.value ? e.target.elements.verb.value : "Verb is empty"
    const someoneName = e.target.elements.person.value ? e.target.elements.person.value : "Someone's name is empty"
    const place = e.target.elements.place.value ? e.target.elements.place.value : "Place is empty"

    const story = `Once upon a time, there was a ${noun} who lived in a ${adjective} ${place}. One day, the ${noun} decided to ${verb} with their friend ${someoneName}. They had a great time and became best friends forever!`

    const storyOutput = document.getElementById("story")
    storyOutput.textContent = story
})

document.getElementById("shuffle-button").addEventListener("click", () => {
    const noun = document.getElementById("noun").value || "Noun"
    const adjective = document.getElementById("adjective").value || "Adjective"
    const verb = document.getElementById("verb").value || "Verb"
    const person = document.getElementById("person").value || "Someone's name"
    const place = document.getElementById("place").value || "Place"

    const stories = [
        `Once upon a time, there was a ${noun} who lived in a ${adjective} ${place}. One day, the ${noun} decided to ${verb} with their friend ${person}. They had a great time and became best friends forever!`,
        `In a ${adjective} land, there lived a ${noun} named ${person}. Every day, they would ${verb} in the ${place}.`,
        `A long time ago, there was a ${adjective} ${noun} who loved to ${verb} in the ${place}. One day, they met ${person} and they became best friends!`
    ]
    document.getElementById("story").textContent = stories[Math.floor(Math.random() * stories.length)]
})