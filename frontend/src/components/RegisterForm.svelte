<script>
    import router from 'page';

    let usernameContainer;
    let emailContainer;
    let passwordContainer;
    let password2Container;
    let username;
    let email;
    let password;
    let password2;
    let checkEmail = true;
    let emailMessage;
    let checkPassword = true;
    let checkPassword2 = true;
    let passwordMessage;
    let form;

    const handleSubmit = async () => {
        checkEmail = emailValidation(email.trim());
        checkPassword = passwordValidation(password.trim());
        checkPassword2 = password.trim() === password2.trim();
        if (checkEmail && checkPassword && checkPassword2) {
            const response = await submit();
            if (response['status'] === 201) {
                router.redirect('/');
            }
        }  else {

        }
    };

    async function submit() {
        try {
            const response = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({username, password})
            });

            return await response;
        } catch (e) {
            console.log(e);
            router.redirect("/register");
            alert('Something went wrong!');
        }
    }

    function emailValidation(input) {
        if (!(input.endsWith('.com') || input.endsWith('.nl'))) {
           emailMessage = 'Email should be ended with ".nl" or ".com"';
           return false;
        }
        return true;
    }

    function passwordValidation(input) {
        if (input.length < 6) {
            passwordMessage = 'Password must have at least 6 characters.';
            return false;
        }

        if (!input.match(/[A-Z]+/)) {
            passwordMessage = 'Password must have at least one uppercase letter.';
            return false;
        }

        if (!input.match(/[0-9]/)) {
            passwordMessage = 'Password must have at least one digit.';
            return false;
        }

        return true;
    }
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
        <form bind:this = {form} id="register" action="" on:submit|preventDefault = {handleSubmit}>
            <h1 style="text-align:center; margin: 3rem auto;">Register</h1>
            <div class="form__control">
                <input bind:this = {emailContainer} type="email" placeholder="Enter email" name="email" id="email" bind:value={email} required>
                {#if !checkEmail}
                    <small>{emailMessage}</small>
                {/if}
            </div>
			<div class="form__control">
                <input bind:this = {usernameContainer} type="text" placeholder="Enter Username" name="uname" id="username" bind:value={username} required>
            </div>

            <div class="form__control">
                <input bind:this = {passwordContainer} type="password" placeholder="Enter Password" name="psw" id="password" bind:value={password} required>
                {#if !checkPassword}
                    <small>{passwordMessage}</small>
                {/if}
            </div>

            <div class="form__control">
                <input bind:this = {password2Container} type="password" placeholder="Enter Password Again" name="psw" id="password2" bind:value={password2} required>
                {#if !checkPassword2}
                    <small>Passwords don't match</small>
                {/if}
            </div>
            
            <div class="submit__button">
                <button type="submit">Register</button>
            </div>
            
            <p class="signin__redirect">Have an account? Sign in <a href="/" class="login__redirect-link">here</a></p>
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
        width: 623px;
        height: 90%;
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

    small {
        color: #ff0000;
    }

    @media screen and (max-width: 768px) {
        .register__container {
            width: 500px;
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

    @media screen and (max-width: 480px) and (min-width: 320px) {
        .register__container {
            width: 100%;
        }
    }
</style>