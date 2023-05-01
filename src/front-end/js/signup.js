
const email=document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('conf-password')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const authErrorDiv = document.querySelector('.error-auth-msg')


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (validateInputs()){
        data = await validateUser()
        if(data.sucess){
            window.location="login.html"
        }
        else{
            message = ''
            await data.response.then((data) => {
                message = data.message

            })
           
            authErrorDiv.innerHTML = `<p>${message} </p>`
            form.classList.add('error-auth')
        }
    }
})


async function validateUser() {
    const url = 'http://localhost:3001/auth/signup'
    const res = await fetch(url , {
        method:'POST', 
        headers:{
            "Content-type":"application/json",
            "Accept":"application/json , */*"

        },
        body:JSON.stringify({
            firstname:firstname.value,
            lastname:lastname.value,
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
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
  
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const firstnameval = firstname.value.trim();
    const lastnameval = lastname.value.trim();
    let valid = true

    if (firstnameval == ''){
        setError(firstname , 'firstname should not be empty')
        valid = false

    }else{
        setSuccess(firstname);

    }

    if (lastnameval == ''){
        setError(lastname , 'lastname should not be empty')
        valid = false

    }else{
        setSuccess(lastname);

    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        valid = false
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        valid = false
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        
        setError(password, 'Password is required');
        valid = false
    } else if (passwordValue.length < 5 ) {
        setError(password, 'Password must be at least 8 character.')
        valid = false
    } else {
        setSuccess(password);
    }
    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
        valid = false
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
        valid = false
    } else {
        setSuccess(password2);
    }

    return valid
    
}