<script>
    import router from 'page';
    import { text } from "../stores/search.js";
    import SearchBar from "./SearchBar.svelte";

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

    function toCamelCase(category) {
        let modifiedCategory = category.replace(category.charAt(0), category.charAt(0).toUpperCase());
        return modifiedCategory;
    }
</script>

<div class="row my-3">
    <div class="fs-1 col-sm-12 text-center mx-auto my-auto">
        {toCamelCase(category)}
    </div>

    <!--filters-->
    <div class="col-sm-12 d-flex justify-content-evenly mx-auto my-auto">
        <form class="d-flex flex-row align-items-center justify-content-center">
            <select class="form-select mx-2" aria-label="Default select example">
                <option selected>Status</option>
                <option value="1">Live</option>
                <option value="2">Closed</option>
            </select>
            <select class="form-select mx-2" aria-label="Default select example">
                <option selected>Price</option>
                <option value="1">$0-$5000</option>
                <option value="2">$5000-$10000</option>
                <option value="3">$10000-$20000</option>
            </select>
            <button type="submit" class="btn btn-outline-warning mx-3">Confirm</button>
        </form>

        <div id="search-wrapper">
            <SearchBar />
        </div>
    </div>
</div>
<div class="auctions-container container-sm">
    {#each filteredAuctions as auction (auction.id)}
        <div class="auction-wrapper">
            <div class="auction-image bg-image hover-zoom p-3 mb-2 rounded" id="{auction.id}" on:click={() => {router.redirect(`/auctions/${auction.id}`)}} >
                <img src="{auction['image']}" alt="{auction['item']}">
            </div>
            <div class="auction-item"><a href="/auctions/{auction.id}">{auction['item']}</a></div>
            <div class="auction-price">Starting price: ${auction['startPrice']}</div>
        </div>
    {/each}
</div>

<style>
    * {
        font-family: 'Abhaya Libre', serif;
    }

    .auctions-container {
        margin-top: 2rem;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
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
        width: 100%;
        height: 80%;
        border: 1px solid #ddd;
        cursor: pointer;
    }

    .auction-item {
        font-family: 'Abhaya Libre', serif;
        font-size: 28px;
        font-weight: normal;
        margin: 0 0 10px 0;
    }

    .auction-price {
        font-size: 20px;
    }

    img {
        max-height: 300px;
        max-width: 300px;
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