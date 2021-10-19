<script>
    import { navigate } from 'svelte-routing'
    import tokenStore from "../stores/token";

    function handleLogOut() {
        $tokenStore = "";
        navigate('/');
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</svelte:head>

<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img class="img-fluid" src="/images/logo.png" alt="logo" height="100" width="300">
        </a>
        <form class="d-flex mb-2" style="width: 30%">
            <input class="form-control" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-warning" type="submit">Search</button>
        </form>
        <div class="d-flex mb-2">
            {#if $tokenStore.token !== ""}
                <button on:click={handleLogOut} type="button" class="btn btn-warning btn-lg">Log out</button>
            {:else}
                <button on:click={() => navigate('/register')} type="button" class="btn btn-outline-warning btn-lg mx-3">Sign up</button>
                <button on:click={() => navigate('/')} type="button" class="btn btn-warning btn-lg">Login</button>
            {/if}
        </div>
    </div>
</nav>

<nav class="navbar hidden-xs">
    <div class="container-fluid" style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;">
        <div class="navbar-container container-fluid" style="width: 80%">
            <a class="left-links" href="">Auction</a>
            <a class="left-links" href="">Artist</a>
            <span class="divider"></span>
            <a class="right-links" href="">Musical instruments</a>
            <a class="right-links" href="">Crafts</a>
            <a class="right-links" href="">Guns</a>
            <a class="right-links" href="">Arts</a>
        </div>
    </div>
</nav>

<style>
    .navbar-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        margin: auto;
    }

    .navbar-container .divider {
        background-color: #bac4c9;
        width: 2px;
        margin: 5px 0;
        height: 30px;
    }
    
    .navbar-container a {
        text-decoration: none;
        font-size: 20px;
    }

    .right-links {
        color: rgb(92, 92, 92);

    }
    .left-links {
        color: rgb(228, 168, 48);
    }

    .right-links:hover {
        font-weight: 1.1;
        color: #000;
    }

    .left-links:hover {
        font-weight: 1.1;
        color: #BB8700;
    }
    
    @media (min-width: 1200px) {
        .container-fluid {
            padding-left: 60px;
            padding-right: 60px;
        }
    }
</style>
