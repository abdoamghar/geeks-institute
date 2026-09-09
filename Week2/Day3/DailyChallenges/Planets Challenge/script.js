let planets = [
    {
        name: "Mercury",
        color: "gray",
        moons: 0
    },
    {
        name: "Venus",
        color: "yellow",
        moons: 0
    },
    {
        name: "Earth",
        color: "blue",
        moons: 1
    },
    {
        name: "Mars",
        color: "red",
        moons: 2
    },
    {
        name: "Jupiter",
        color: "orange",
        moons: 95
    },
    {
        name: "Saturn",
        color: "gold",
        moons: 146
    },
    {
        name: "Uranus",
        color: "lightblue",
        moons: 28
    },
    {
        name: "Neptune",
        color: "darkblue",
        moons: 16
    }
];

let section = document.querySelector(".listPlanets");

planets.forEach(function(planetInfo) {
    let planet = document.createElement("div");

    planet.classList.add("planet");
    planet.style.backgroundColor = planetInfo.color;

    for (let i = 0; i < planetInfo.moons; i++) {
        let moon = document.createElement("div");

        moon.classList.add("moon");

        moon.style.left = `${120 + i * 35}px`;
        moon.style.top = `${35 + i * 5}px`;

        planet.appendChild(moon);
    }

    section.appendChild(planet);
});