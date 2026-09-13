const form = document.querySelector('form')
const receivedMessage = document.querySelector('#application-received')
const motivation = document.querySelector('#motivation')
const characterCount = document.querySelector('#character-count')
const skillInput = document.querySelector('#skill-input')
const addSkillButton = document.querySelector('#add-skill')
const skillsList = document.querySelector('#skills-list')
const progress = document.querySelector('#progress')
const progressText = document.querySelector('#progress-text')
const newApplicationButton = document.querySelector('#new-application')
const successHeading = document.querySelector('#success-heading')
const successDetails = document.querySelector('#success-details')

form.noValidate = true

function validateField(field) {
    let isValid = field.validity.valid
    let message = field.validationMessage
    let errorId = field.id

    if (field.type === "radio") {
        const group = Array.from(form.elements.namedItem(field.name))
        isValid = group.some((radio) => radio.checked)
        message = isValid ? "" : field.validationMessage
        errorId = field.name
    }
    else if (field.type === "email") {
        if (field.validity.typeMismatch) {
            field.setCustomValidity("Please enter a valid email address.")
        } else {
            field.setCustomValidity("")
        }

        isValid = field.validity.valid
        message = field.validationMessage
    }

    const error = document.querySelector(`#${errorId}-error`)
    if (!error) return isValid

    field.classList.toggle("border-red-500", !isValid)
    field.classList.toggle("border-green-500", isValid)
    error.textContent = isValid ? "" : message

    return isValid
}

function handleBlur(event) {
    const field = event.target
    if (!field.matches("input, select, textarea")) return

    field.dataset.touched = "true"
    validateField(field)
    updateProgress()
}

function handleInput(event) {
    const field = event.target
    if (!field.matches("input, select, textarea")) return

    if (field === motivation) {
        const count = motivation.value.length
        characterCount.textContent = `${count} / 400`
        characterCount.classList.toggle("text-red-500", count > 360)
        characterCount.classList.toggle("text-slate-500", count <= 360)
    }

    if (field.dataset.touched === "true") {
        validateField(field)
    }

    updateProgress()
}

function updateProgress() {
    const experienceGroup = Array.from(form.elements.namedItem("experience"))
    const completedRequirements = [
        form.elements.namedItem("full-name").validity.valid,
        form.elements.namedItem("email").validity.valid,
        form.elements.namedItem("phone").validity.valid,
        form.elements.namedItem("city").validity.valid,
        form.elements.namedItem("track").validity.valid,
        experienceGroup.some((radio) => radio.checked),
        motivation.value.trim().length >= 40,
        form.elements.namedItem("terms").checked
    ].filter(Boolean).length

    const percentage = Math.round((completedRequirements / 8) * 100)

    progress.value = percentage
    progress.setAttribute("aria-valuenow", percentage)
    progressText.textContent = `${percentage}%`
}

function addSkill() {
    const skill = skillInput.value.trim()
    const normalizedSkill = skill.toLowerCase()

    if (!skill) return

    const alreadyExists = Array.from(skillsList.children).some(
        (tag) => tag.dataset.skill === normalizedSkill
    )

    if (alreadyExists) return

    const tag = document.createElement("li")
    tag.dataset.skill = normalizedSkill
    tag.className = "flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-800"

    const tagText = document.createElement("span")
    tagText.textContent = skill

    const removeButton = document.createElement("button")
    removeButton.type = "button"
    removeButton.dataset.remove = ""
    removeButton.setAttribute("aria-label", `Remove ${skill}`)
    removeButton.className = "font-bold text-teal-700 hover:text-red-600"
    removeButton.textContent = "x"

    tag.append(tagText, removeButton)
    skillsList.append(tag)
    skillInput.value = ""
    skillInput.focus()
}

function resetApplication() {
    form.reset()
    skillsList.replaceChildren()

    form.querySelectorAll("input, select, textarea").forEach((field) => {
        field.classList.remove("border-red-500", "border-green-500")
        field.setCustomValidity("")
        delete field.dataset.touched
    })

    form.querySelectorAll("small").forEach((message) => {
        message.textContent = ""
    })

    motivation.value = ""
    characterCount.textContent = "0 / 400"
    characterCount.classList.remove("text-red-500")
    characterCount.classList.add("text-slate-500")
    progress.value = 0
    progress.setAttribute("aria-valuenow", "0")
    progressText.textContent = "0%"
    receivedMessage.hidden = true
    form.hidden = false
    form.elements.namedItem("full-name").focus()
}

form.addEventListener("blur", handleBlur, true)
form.addEventListener("input", handleInput)
form.addEventListener("change", handleInput)

addSkillButton.addEventListener("click", addSkill)

skillInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        addSkill()
    }
})

skillsList.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove]")

    if (!removeButton) return

    removeButton.closest("li").remove()
})

newApplicationButton.addEventListener("click", resetApplication)

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const fields = Array.from(form.elements).filter((field) =>
        field.matches("input, select, textarea")
    )

    let firstInvalidField = null

    fields.forEach((field) => {
        field.dataset.touched = "true"

        const isValid = validateField(field)

        if (!isValid && !firstInvalidField) {
            firstInvalidField = field
        }
    })

    updateProgress()

    if (firstInvalidField) {
        firstInvalidField.focus()
        return
    }

    form.hidden = true
    receivedMessage.hidden = false

    const applicantName = form.elements.namedItem("full-name").value
    const selectedTrack = form.elements.namedItem("track").value

    successHeading.textContent = `You're in, ${applicantName}!`
    successDetails.textContent = `Thanks for applying to the ${selectedTrack} program. We'll review your answers and contact you within 3 business days.`
})