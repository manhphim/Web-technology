<script>
    import Auction from "./Auction.svelte";
    let logo = {
        id: 'logo',
        path: 'images/logo2.png'
    }

</script>

<nav>
    <div class="nav-logo">
        <img src="{logo.path}" alt="{logo.id}">

    </div>
    <div class="nav-links"></div>
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

    img {
        max-width: 300px;
        max-height: 200px;
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
