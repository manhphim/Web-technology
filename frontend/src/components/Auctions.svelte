<script>
    import router from 'page';
    import {text} from "../stores/search.js";
    import tokenStore from "../stores/token.js";
    import SearchBar from "./SearchBar.svelte";
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
            let headers = {};
            if ($tokenStore.token) {
                headers['Authorization'] = `Bearer ${$tokenStore.token}`
            }
            response = await fetch(`http://localhost:3000/auctions?category=${category}`, {
                method: "GET",
                headers: headers
            });
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        auctions = await response.json();
        filteredAuctions = auctions;
    }

    $: $text, searchAuctions();
    function searchAuctions() {
        filteredAuctions = auctions.filter(auction => {
            let item = auction.item.toLowerCase();
            return item.includes($text.toLowerCase())
        });
    }

    let selectedStatus = '';
    let selectedPriceRange = '';
    $: selectedStatus, filterAuctions();
    $: selectedPriceRange, filterAuctions();
    function filterAuctions() {
        let options = {
            "1": [0, 500],
            "2": [500, 1000],
            "3": [1000, 50000]
        }
        let lowerBound;
        let upperBound;
        if (selectedStatus !== '' && selectedPriceRange !== '') {
            lowerBound = options[selectedPriceRange][0]
            upperBound = options[selectedPriceRange][1]
            filteredAuctions = auctions.filter(auction => {
                return (auction.startPrice > lowerBound && auction.startPrice <= upperBound) && auction.status === selectedStatus
            });
        } else if (selectedPriceRange === '') {
            filteredAuctions = auctions.filter(auction => {
                return auction.status === selectedStatus
            });
        } else {
            lowerBound = options[selectedPriceRange][0]
            upperBound = options[selectedPriceRange][1]
            filteredAuctions = auctions.filter(auction => {
                return auction.startPrice > lowerBound && auction.startPrice <= upperBound
            });
        }
    }

    function toCamelCase(category) {
        return category.replace(category.charAt(0), category.charAt(0).toUpperCase());
    }
</script>

<div class="row my-3">
    <div class="fs-1 col-sm-12 text-center mx-auto my-auto">
        {toCamelCase(category)}
    </div>

    <!--filters-->
    <div class="col-sm-12 d-flex justify-content-evenly flex-wrap mx-auto my-auto">
        <div class="d-flex flex-sm-row align-items-center justify-content-center">
            <select bind:value={selectedStatus} class="form-select mx-2" aria-label="Default select example">
                <option value="" selected disabled>Status</option>
                <option value="Open">Live</option>
                <option value="Closed">Closed</option>
            </select>
            <select bind:value={selectedPriceRange} class="form-select mx-2" aria-label="Default select example">
                <option value="" selected disabled>Price</option>
                <option value="1">$0-$500</option>
                <option value="2">$500-$1000</option>
                <option value="3">$1000-$50000</option>
            </select>
            <button on:click={async() => {selectedStatus=''; selectedPriceRange=''; await getAuctions()}} type="submit" class="btn btn-outline-warning mx-3">Reset</button>
        </div>

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

    .auction-info {
        display: flex;
        flex-direction: column;
        width: 80%;
        height: 15%;
    }

    .auction-item {
        font-family: 'Abhaya Libre', serif;
        font-size: 23px;
        font-weight: normal;
        margin: 0 0 10px 0;
        height: 30%;
    }

    .auction-price {
        font-size: 20px;
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

    #search-wrapper {
        width: 30%;
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

    @media screen and (max-width: 576px) {
        #search-wrapper {
            width: 75%;
            margin-top: 20px;
        }
    }
</style>
