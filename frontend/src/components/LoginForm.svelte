<script>
    import router from 'page';
    import tokenStore from '../stores/token';
    import userStore from '../stores/user';
    import { onMount } from 'svelte'

    let user = {};
    onMount(async () => {
        userStore.subscribe(value => user = value);
    });

    const handleSubmit = async () => {
        const response = await submit();
        if (response) {
            if (response['status'] === 200 && user.roles.includes('admin')) {
                router.redirect('/admin');
            } else {
                router.redirect('/home/categories/all');
            }
        }
    };

    let username = '';
    let password = '';
    async function submit() {
        try {
            const response = await fetch('http://localhost:3000/credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({username, password})
            });

            const data=await response.json();
            $tokenStore.token =data.token;
            $userStore = data.user;
            return await response;
        } catch (e) {
            console.log(e);
            document.querySelector('.error-message').style.display = "block";
        }
    }
</script>

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Yeseva+One&display=swap" rel="stylesheet">
</head>

<body>
    <div class="login__container">
        <form id="login" action="" on:submit|preventDefault = {handleSubmit}>
            <div class="form-header">
                <h1 style="text-align:center; margin: 5rem auto;">Login</h1>
                <p class="error-message text-danger">Username or password is incorrect!</p>
            </div>


			<div class="form__control">
                <input type="text" placeholder="Enter Username" name="uname" id="username" bind:value={username} required>
                <small>Error message</small>
            </div>

            <div class="form__control">
                <input type="password" placeholder="Enter Password" name="psw" id="password" bind:value={password} required>
                <small>Error message</small>
            </div>

            <div class="submit__button">
                <button type="submit">Login</button>
            </div>
            <p style="text-align: center; margin-top: 2rem"class="signup__redirect">Don’t have an account? Sign up <a class="register__redirect-link" href="/register">here</a></p>
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

    .error-message {
        display: none;
    }

    .background__image {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
    }

    .login__container {
        display: block;
        position: absolute;
        width: 623px;
        height: 80%;
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

    #login {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
    }

    label {
        display: inline-block;
    }

    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 50px;
        box-sizing: border-box;
    }
    
    input[type=checkbox] {
        margin-top: 2rem;
        margin-left: 8px;
    }

    .submit__button {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        display: inline-block;
        margin-top: 2rem;
        width: 90%;
        border-radius: 50px;
        background: #BB8700;
        color: #fff;
    }

    .register__redirect-link {
        color: #BB8700;
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
        .login__container {
            width: 500px;
            height: 70%;
        }
       
        h1 {
            font-size: 3rem;
        }

        button {
            margin-top: 1rem;
        }

        input[type=checkbox] {
            margin-top: 1rem;
            margin-left: 8px;
        }
        .signup__redirect {
            margin-top: 1rem;
        }
    }

    @media screen and (max-width: 480px) {
        .login__container {
            width: 100%;
            height: 70%;
        }
    }
</style>