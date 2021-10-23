<script>
    import {onMount} from "svelte";
    import router from 'page';
    import userStore from "../stores/user";
    import categoryStore from "../stores/category";

    let auctions = [];
    onMount(async() => {
        $categoryStore = "";
        await getAuctions();
    });

    $: $categoryStore, getAuctions();
    async function getAuctions() {
        let category;
        categoryStore.subscribe(value => category = value);

        let response;
        if (category !== "") {
            response = await fetch(`http://localhost:3000/auctions?category=${category}`);
        } else {
            response = await fetch('http://localhost:3000/auctions');
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        auctions = await response.json();
    }
</script>

<div class="auctions-container">
    {#each auctions as auction (auction.id)}
        <div class="auction-wrapper">
            <div class="auction-image bg-image hover-zoom p-3 mb-5 rounded" id="{auction.id}" on:click={() => {router.redirect(`/auctions/${auction.id}`)}} >
                <img src="{auction['image']}" alt="{auction['item']}">
            </div>
            <div class="auction-item"><a href="/auctions/{auction.id}">{auction['item']}</a></div>
            <div class="auction-price">Starting price: {auction['startPrice']}</div>
        </div>
    {/each}
</div>

<style>
    .auctions-container {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: repeat(4, 1fr);
        gap: 30px 0;
    }

    .auction-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        background-color: #fff;
    }

    .auction-image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 400px;
        border: 1px solid #ddd;
        cursor: pointer;
    }

    .auction-item {
        font-family: Andale Mono, monospace;
        font-size: 20px;
        font-weight: normal;
        margin: 0 0 10px 0;
    }

    img {
        max-height: 300px;
        max-width: 300px;
    }

    a, a:hover {
        color: #000;
    }

    @media screen and (max-width: 1024px) {
        .auctions-container {
            grid-template-columns: repeat(2, 1fr) ;
        }
    }
</style>