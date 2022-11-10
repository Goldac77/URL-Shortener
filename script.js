const api = "https://api.shrtco.de/v2/shorten?url="
const input = document.querySelector("#input")
const button = document.querySelector("#button")
const display = document.querySelector("#display")
const errorMessage = document.querySelector("#warning")
var shortLink = []
var fullLink = []

errorMessage.style.display = "none" //hide the error message

if(sessionStorage.getItem("shortLink") || sessionStorage.getItem("fullLink")) {
    JSON.parse(sessionStorage.getItem("shortLink")).map((item, index) => {
        display.innerHTML += `
        <div class="display_content">
            <div id="url" class="ps-5">
                <p><span>Full Link:</span> ${JSON.parse(sessionStorage.getItem("fullLink"))[index]}</p>
            </div>

            <div id="shortened" class="d-flex ps-5">
                <p><span>Shortened Link:</span> ${item}</p>
                <button class="btn ms-5">Copy</button>
            </div>
        </div>
        `
    })
}

button.addEventListener("click", (event) => {
    event.preventDefault() //stop the page from reloading
    fetch(api + input.value)
    .then(response => response.json())
    .then(data => {
        shortLink.push(data.result.full_short_link)
        fullLink.push(input.value)

        display.innerHTML = "" //refresh the display
        //store the links in local storage
        sessionStorage.setItem("shortLink", JSON.stringify(shortLink))
        sessionStorage.setItem("fullLink", JSON.stringify(fullLink))

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
    .catch(error => {
        errorMessage.style.display = "block"
    })
})

console.log(shortLink)