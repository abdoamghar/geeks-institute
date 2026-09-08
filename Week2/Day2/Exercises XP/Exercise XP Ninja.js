// Exercise 1:
const person1 = {
    fullName: "abdelhamid",
    mass: 70,
    height: 1.80,
    bmi: function () {
        return this.mass / (this.height * this.height);
    }
};

const person2 = {
    fullName: "aymen",
    mass: 80,
    height: 1.70,
    bmi: function () {
        return this.mass / (this.height * this.height);
    }
};

function compareBMI(person1, person2) {
    if (person1.bmi() > person2.bmi()) {
        console.log(`${person1.fullName} has the largest BMI`);
    } else {
        console.log(`${person2.fullName} has the largest BMI`);
    }
}

compareBMI(person1, person2);

// Exercise 2:
function findAvg(gradesList) {
    let sum = 0;

    for (let grade of gradesList) {
        sum += grade;
    }

    let average = sum / gradesList.length;

    checkPass(average);
}

function checkPass(average) {
    console.log("Average:", average);

    if (average > 65) {
        console.log("You passed");
    } else {
        console.log("You failed and must repeat the course");
    }
}

findAvg([80, 70, 90, 60, 75]);