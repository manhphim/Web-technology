<script>
    import Auction from "./Auction.svelte";
    import Navbar from "./Navbar.svelte"
    let logo = {
        id: 'logo',
        path: 'images/logo/logo2.png'
    }

</script>

<Navbar/>
<main>
    <div class="auctions">
        <Auction/>
    </div>
</main>

<style>
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
