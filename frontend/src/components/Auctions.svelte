<script>
    import router from 'page';
    import { text } from "../stores/search.js";
    import Countdown from "./Countdown.svelte";

    export let category = '';
    $: category, getAuctions();
    let auctions = [];
    let filteredAuctions = [];
    async function getAuctions() {
        let response;
        if (category === "all") {
            response = await fetch('http://localhost:3000/auctions');
        } else {
            response = await fetch(`http://localhost:3000/auctions?category=${category}`);
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        auctions = await response.json();
        filteredAuctions = auctions;
    }

    let searchText;
    text.subscribe(value => searchText = value);
    $: searchText, searchAuctions();
    function searchAuctions() {
        filteredAuctions = auctions.filter(auction => {
            let item = auction.item.toLowerCase();
            return item.includes(searchText.toLowerCase())
        });
    }
</script>

<div class="auctions-container">
    {#each filteredAuctions as auction (auction.id)}
        <div class="auction-wrapper">
            <div class="auction-image bg-image hover-zoom p-3 mb-5 rounded" id="{auction.id}" on:click={() => {router.redirect(`/auctions/${auction.id}`)}} >
                <img src="{auction['image']}" alt="{auction['item']}">
            </div>
            <div class="auction-info">
                <div class="auction-item"><a href="/auctions/{auction.id}">{auction.item}</a></div>
                <div class="auction-price">Starting price: ${auction.startPrice}</div>

                {#if (auction.status === 'Closed')}
                    <p>Closed</p>
                {:else}
                    <div class="countdown">
                        <Countdown startTime="{auction.startTime}" endTime="{auction.endTime}" />
                    </div>
                {/if}
            </div>
        </div>
    {/each}
</div>

<style>
    .auctions-container {
        margin-top: 2rem;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
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
        margin: 0;
        width: 80%;
        height: 80%;
        border: 1px solid #ddd;
        cursor: pointer;
    }

    .auction-info {
        display: flex;
        flex-direction: column;
        width: 80%;
        height: 15%;
    }

    .auction-item {
        font-family: Andale Mono, monospace;
        font-size: 20px;
        font-weight: normal;
        margin: 0 0 10px 0;
        height: 30%;
    }

    img {
        max-height: 300px;
        max-width: 300px;
    }

    .countdown h2 {
        font-size: 15px;
    }

    a, a:hover {
        color: #000;
    }

    @media screen and (max-width: 992px) {
        .auctions-container {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (max-width: 768px) {
        .auctions-container {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>