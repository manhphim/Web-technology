<script>
    import Auction from "./Auction.svelte";
    let logo = {
        id: 'logo',
        path: 'images/logo/logo2.png'
    }

</script>

<nav>
    <div class="nav-logo">
        <img src="{logo.path}" alt="{logo.id}">
    </div>
    <div class="nav-links">
        <a href="/users">Users</a>
    </div>
</nav>
<main>
    <div class="auctions">
        <Auction/>
    </div>
</main>

<style>
    nav {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 100px;
        background-color: #fff;
        border: 1px solid #ddd;
    }

    .nav-links {
        margin-right: 100px;
        display: flex;
        justify-content: space-around;
    }

    a {
        position: relative;
        padding: 1.2rem 1.5rem;
        margin: 1rem 1rem;
        text-decoration: none;
        color: #477592;
        font-size: 1.6rem;
        font-family: Andale Mono, monospace;
        text-align: center;
    }

    .nav-logo {
        margin-left: 20px;
    }

    img {
        width: 100%;
        height: 100%;
    }

    main {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .auctions {
        display: block;
        margin: auto 50px auto 50px;
        padding: 50px;
    }
</style>
