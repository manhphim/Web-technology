<script>
    import router from 'page';
    import tokenStore from "../stores/token";
    import userStore from '../stores/user';
    import SearchBar from "./SearchBar.svelte";
    import {onMount} from "svelte";

    let user = {};
    function handleLogOut() {
        $tokenStore = "";
        router.redirect('/');
    }

    onMount(async () => {
        userStore.subscribe(value => user = value);
    })

</script>

<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-sm d-flex flex-sm-row justify-content-center">
        <a class="text-decoration-none d-block d-md-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <i class="bi bi-list text-black"></i>
        </a>

        <div class="offcanvas offcanvas-start d-block d-md-none" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h2 class="offcanvas-title" id="offcanvasExampleLabel">Categories</h2>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column">
                <a class="left-links" href="" on:click={() => router.redirect('/home/categories/all')}>Auctions</a>
                <a class="right-links" href="" on:click={() => router.redirect('/home/categories/instruments')}>Musical instruments</a>
                <a class="right-links" href="" on:click={() => router.redirect('/home/categories/crafts')}>Crafts</a>
                <a class="right-links" href="" on:click={() => router.redirect('/home/categories/guns')}>Guns</a>
                <a class="right-links" href="" on:click={() => router.redirect('/home/categories/arts')}>Arts</a>
                <a class="right-links" href="" on:click={() => router.redirect('/home/categories/jewelry')}>Jewelry</a>
            </div>
        </div>
        <a class="navbar-brand col-sm-5" href="/home/categories/all">
            <img class="img-fluid" src="/images/logo.png" alt="logo" height="100" width="300">
        </a>

        <!-------------SEARCH BAR---------------->

        <div class="d-flex justify-content-end mb-2 col-sm-6">
            {#if $tokenStore.token !== ""}
                <div class="dropdown">
                    <a class="d-flex align-items-center justify-content-center dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle me-3 fs-2"></i>
                        {user.username}
                    </a>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a class="dropdown-item" on:click={() => router.redirect(`/users/${user.id}`)} href="#"><i class="bi bi-person-lines-fill me-2"></i>Profile</a></li>
                        <li><a class="dropdown-item" on:click={() => router.redirect(`/users/${user.id}/bids`)} href="#"><i class="bi bi-trophy-fill me-2"></i>Won bids</a></li>
                        <li><a class="dropdown-item" on:click={handleLogOut} href="#"><i class="bi bi-box-arrow-right me-2"></i>Log out</a></li>

                    </ul>
                </div>
            {:else}
                <button on:click={() => router.redirect('/register')} type="button" class="btn btn-outline-warning btn-lg mx-3">Sign up</button>
                <button on:click={() => router.redirect('/')} type="button" class="btn btn-warning btn-lg">Login</button>
            {/if}
        </div>
    </div>
</nav>

<nav class="navbar d-none d-md-block">
    <div class="container-fluid" style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;">
        <div class="navbar-container container-fluid" style="width: 80%">
            <a class="left-links" href="" on:click={() => router.redirect('/home/categories/all')}>Auctions</a>
            <span class="divider"></span>
            <a class="right-links" href="" on:click={() => router.redirect('/home/categories/instruments')}>Musical instruments</a>
            <a class="right-links" href="" on:click={() => router.redirect('/home/categories/crafts')}>Crafts</a>
            <a class="right-links" href="" on:click={() => router.redirect('/home/categories/guns')}>Guns</a>
            <a class="right-links" href="" on:click={() => router.redirect('/home/categories/arts')}>Arts</a>
            <a class="right-links" href="" on:click={() => router.redirect('/home/categories/jewelry')}>Jewelry</a>
        </div>
    </div>
</nav>

<style>
    * {
        font-family: 'Abhaya Libre', serif;
    }
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

    .left-links, .right-links {
        text-decoration: none;
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

    .dropdown a {
        text-decoration: none;
        color: #000000;
    }

    .dropdown i {
        color: #D39B2C;
    }

    @media (min-width: 1200px) {
        .container-fluid {
            padding-left: 60px;
            padding-right: 60px;
        }
    }

    @media screen and (max-width: 767px) {
        .left-links, .right-links {
            font-size: 20px;
            margin: 16px 0;
        }
    }
</style>
