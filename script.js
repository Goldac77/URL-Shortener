const api = "https://api.shrtco.de/v2/shorten?url="
const input = document.querySelector("#input")
const button = document.querySelector("#button")
const display = document.querySelector("#display")
var shortLink = []
var fullLink = []

button.addEventListener("click", (event) => {
    display.innerHTML = "" //refresh the display
    event.preventDefault() //stop the page from reloading
    fetch(api + input.value)
    .then(response => response.json())
    .then(data => {
        shortLink.push(data.result.full_short_link)
        fullLink.push(input.value)
        shortLink.forEach((item, index) => {
            display.innerHTML += `
            <div class="display_content">
                <div id="url" class="ps-5">
                    <p><span>Full Link:</span> ${fullLink[index]}</p>
                </div>

                <div id="shortened" class="d-flex ps-5">
                    <p><span>Shortened Link:</span> ${item}</p>
                    <button class="btn ms-5">Copy</button>
                </div>
            </div>
            `
        })
    })
})

console.log(shortLink)