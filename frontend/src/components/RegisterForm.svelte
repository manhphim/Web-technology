<script>
    import { navigate } from 'svelte-routing';
    import { onMount } from 'svelte';

    let usernameContainer;
    let emailContainer;
    let passwordContainer;
    let password2Container;
    let username = '';
    let email = '';
    let password = '';
    let password2 = '';
    let formValidation = true;
    
    let form = document.getElementById('register');

    const handleSubmit = async () => {
        if (checkInput && formValidation) {
            const response = await submit();
            if (response['status'] === 200) {
                navigate('/home');
            }
        }  else {
            alert('Something is wrong with your credentials')
        }
    };

    async function submit() {
        try {
            const response = await fetch('http://localhost:3000/credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({username, password})
            });

            return await response;
        } catch (e) {
            console.log(e);
            alert('Something went wrong!');
        }
    }

    function CheckPassword(inputtxt) { 
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(inputtxt.match(passw)) { 
            return true;
        }
        else { 
            return false;
        }
    }


    let checkInput = function () {
        // trim to remove the whitespaces
        
        console.log(email.trim());
        let checkSuffix = (email.trim().lastIndexOf('.com') != (email.trim().length - 4)) && (email.trim().lastIndexOf('.nl') != (email.trim().length - 3))
        
        console.log(checkSuffix);
        

        if (checkSuffix === true){
           setErrorFor(emailContainer, 'Email must end with ".nl" or ".com"');
           formValidation = false;
        } 
        else {
            setSuccessFor(emailContainer);
        }
        
        if(!CheckPassword(password.trim())) {
            setErrorFor(passwordContainer, 'Password must have at least 6 characters with 1 digit, 1 uppercase character.');
            formValidation = false;
        } else {
            setSuccessFor(passwordContainer);
        }
        
        if(password.trim() !== password2.trim()) {
            setErrorFor(password2Container, 'Passwords does not match');
            formValidation = false;

        } else{
            setSuccessFor(password2Container);
        }
    }

    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form__control error';
        small.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form__control success';
    }
        
    // function isEmail(email) {
    //     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    // }

</script>

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Yeseva+One&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/a99a2ba266.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="register__container">
        <form id="register" action="" on:submit|preventDefault = {handleSubmit}>
            <h1 style="text-align:center; margin: 5rem auto;">Register</h1>
            <div class="form__control">
                <input bind:this = {emailContainer} type="email" placeholder="Enter email" name="email" id="email" bind:value={email} required>
                <small>Error message</small>
            </div>
			<div class="form__control">
                <input bind:this = {usernameContainer} type="text" placeholder="Enter Username" name="uname" id="username" bind:value={username} required>
                <small>Error message</small>
            </div>

            <div class="form__control">
                <input bind:this = {passwordContainer} type="password" placeholder="Enter Password" name="psw" id="password" bind:value={password} required>
                <small>Error message</small>
            </div>

            <div class="form__control">
                <input bind:this = {password2Container} type="password" placeholder="Enter Password Again" name="psw" id="password2" bind:value={password2} required>
                <small>Error message</small>
            </div>
            
            <div class="submit__button">
                <button type="submit">Register</button>
            </div>
            
            <p class="signin__redirect">Have an account? Sign in <a on:click = {navigate('/register')} class="login__redirect-link" href="/">here</a></p>
        </form>
        
    </div>
    <div class="background__image">
        <img src="https://images.pexels.com/photos/2079670/pexels-photo-2079670.jpeg?cs=srgb&dl=pexels-emre-can-acer-2079670.jpg&fm=jpg" alt="">
    </div>
    

    
</body>

<style>
    body {
        font-size: 18px;
        max-height: 100%;
        min-width: 100%;
        overflow-y: hidden;
        overflow-x: hidden;
        font-family: 'Montserrat', sans-serif;
    }

    .background__image {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
    }

    .register__container {
        display: block;
        position: absolute;
        border-radius: 50px;
        width: 623px;
        height: 70%;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0px 10px 4px rgba(0, 0, 0, 0.25);
        border-radius: 70px;
    }
    
    h1, p {
        font-family: 'Yeseva One', cursive;
    }

    h1 {
        font-size: 4rem;
    }

    #register {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
    }
    
    input[type=text], input[type=password], input[type=email] {
        width: 100%;
        padding: 12px 20px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 50px;
        box-sizing: border-box;
    }
    

    .submit__button {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        display: inline-block;
        width: 90%;
        margin-top: 2rem;
        border-radius: 50px;
        background: #BB8700;
        color: #fff;
    }

    .login__redirect-link {
        color: #BB8700;
    }

    .signin__redirect {
        text-align: center;
        margin-top: 2rem
    }

    .form__control {
        margin-bottom: 10px;
	    padding-bottom: 20px;
    }
    .form__control.success input{
        border: 5px solid #2ecc71;
    }

    .form__control.error input{
        border: 5px solid #e74c3c;
    }

    .form__control small {
        color: #e74c3c;
        position: absolute;
        margin-left: 8px;
        bottom: 0;
        left: 0;
        visibility: hidden;
    }

    .form__control .error small {
        visibility: visible;
    }

    @media screen and (max-width: 768px) {
        .register__container {
            width: 500px;
            height: 70%;
        }
       
        h1 {
            font-size: 3rem;
        }

        button {
            margin-top: 2rem;
        }

        .signin__redirect {
            margin-top: 1rem;
        }
    }

    @media screen and (max-width: 480px) {
        .register__container {
            width: 100%;
            height: 70%;
        }
    }
</style>