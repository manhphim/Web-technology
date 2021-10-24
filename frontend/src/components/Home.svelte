<script>
    import Auctions from "./Auctions.svelte";
    import Footer from "./Footer.svelte"
    import Navbar from "./Navbar.svelte"

    export let params = '';
</script>

<Navbar/>
<div class="auctions">
    <Auctions category="{params.category}"/>
</div>
<Footer/>

<style>
    main {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
