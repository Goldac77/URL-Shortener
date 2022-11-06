const api = "https://api.shrtco.de/v2/shorten?url="
const input = document.querySelector("#input")
const button = document.querySelector("#button")
const display = document.querySelector("#display")
var displayElements = []

button.addEventListener("click", (event) => {
    event.preventDefault() //stop the page from reloading
    fetch(api + input.value)
    .then(response => response.json())
    .then(data => {
        displayElements.push(data.result.full_short_link)
        displayElements.map((item, index) => {
            display.innerHTML += `
            <div id="url_${index}">
                <p>${input.value}</p>
                <div id="shortened">
                    <p>${item}</p>
                    <button>Copy</button>
                </div>
            </div>
            `
        })
    })
})