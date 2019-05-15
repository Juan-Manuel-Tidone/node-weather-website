
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

/*
fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log('There was an error')
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
            console.log(data.address)
        }

        
    })
})
*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//Getting p from index.hbs to display messages
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""


//http://localhost:3000
fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //console.log('There was an error')
            messageOne.textContent = "There was an error"
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            /*
            console.log(data.location)
            console.log(data.forecast)
            console.log(data.address)
            */
        }

        
    })
})

    console.log(location)
})

