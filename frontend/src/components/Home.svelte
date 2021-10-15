<script>
    import Auctions from "./Auctions.svelte";
    import Navbar from "./Navbar.svelte"

</script>

<Navbar/>
<main>
    <div class="auctions">
        <Auctions />
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
