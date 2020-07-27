console.log('Client side app.js loaded')


const form = document.querySelector('form')

form.addEventListener("submit", (e) => {

    e.preventDefault()

    const location = document.querySelector('input').value;

    fetch('http://localhost:3000/weather?address=' + location)
        .then(res => {
            res.json()
                .then(data => {
                    resetParagraphMessages()
                    if (data.Error) {
                        document.querySelector('#messageOne').textContent = data.Error
                    } else {
                        document.querySelector('#messageOne').textContent = data.latitude
                        document.querySelector('#messageTwo').textContent = data.Longitude
                        document.querySelector('#messageThree').textContent = data.Location
                    }
                })
        })
})

resetParagraphMessages = () => {
    document.querySelector('#messageOne').textContent = ""
    document.querySelector('#messageTwo').textContent = ""
    document.querySelector('#messageThree').textContent = ""
}