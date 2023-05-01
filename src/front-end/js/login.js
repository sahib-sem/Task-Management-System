
const email=document.getElementById('email')
const password = document.getElementById('password')
const authErrorDiv = document.querySelector('.error-auth-msg')
let isValid1=false
let isValid2=false



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    validateInputs()
    
    
    if(isValid1 && isValid2){
        const data = await validateUser()
        if(data.sucess){
            await data.response.then((data2) => {
               console.log(data2)

                
            })


            window.location="index.html"
        }
        else{
            message = ''
            await data.response.then((data) => {
                console.log(data)
                message = data.message

            })
           
            authErrorDiv.innerHTML = `<p>${message} </p>`
            form.classList.add('error-auth')
        }
        
    }
})

async function validateUser(){
    const url = 'http://localhost:3001/auth/login'

    const res = await fetch(url , {
        method:'POST',
        credentials: 'include',
        headers:{
            
            "Content-type":"application/json",
            "Accept":"application/json , */*"

        },
        body:JSON.stringify({
            email:email.value, 
            password:password.value
        })

    })



    if (!res.ok){
        return {sucess: false , response: res.json()}
    }
    else{
        return {sucess:true , response: res.json()}
    }

}
const setError = (element, message) => {
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = ''
    inputControl.classList.add('success')
    inputControl.classList.remove('error')
}
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
  
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()



    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address')
    } else {
        setSuccess(email)
        isValid1=true
    }

    if(passwordValue === '') {
        setError(password, 'Password is required')
    } else if (passwordValue.length < 5 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password)
        isValid2=true
    }
    
}