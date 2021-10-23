<script>
    import Navbar from "./Navbar.svelte";
    import Footer from './Footer.svelte'
    import {onMount} from "svelte";
    import tokenStore from "../stores/token";
    import AuctionBids from "./AuctionBids.svelte";

    export let params;
    let username = 'melissa';

    let auction = {};
    let auctionId = params.id;
    let isClosed = true;
    let bids = [];
    let startPrice = '';
    let lastBid = '';
    let currentBid;
    $: currentBid = lastBid;
    let days = '';
    let hours = '';
    let minutes = '';
    let seconds = '';
    onMount(async () => {
        auction = await getOneAuction();
        bids = await getBidsByAuctionId();
        lastBid = bids.at(-1).price;

        let startTime = new Date(auction.startTime).getTime();
        let endTime = new Date(auction.endTime).getTime();
        let now = new Date().getTime();
        if (now > startTime && now < endTime) {
            isClosed = false;
            const x = setInterval(() => {
                now = new Date().getTime();
                let timeLeft = endTime - now;
                days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                if (timeLeft < 0) {
                    clearInterval(x);
                    isClosed = true;
                }
            }, 1000);
        }

        auction.status = isClosed ? 'Closed' : 'Opened';
        // TODO: If the auction status changes, do we update the data??
        // auction = await updateAuction();
    })

    async function getOneAuction() {
        const response = await fetch(`http://localhost:3000/auctions/${auctionId}`);

        return handleErrors(response).json();
    }

    async function updateAuction() {
        const response = await fetch(`http://localhost:3000/auctions/${auctionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({auction})
        });

        return handleErrors(response).json();
    }

    let isValid = true;
    let time;
    function addBid() {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let timestamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        time  = date + ' ' + timestamp;

        isValid = validateBid();
        if (isValid) {
            lastBid = currentBid;
            let price = lastBid;
            bids.push({username, time, price});
            bids = bids;
            postBid();
        }
    }

    async function postBid() {
        const response = await fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({username, auctionId, time, lastBid})
        });

        return handleErrors(response);
    }

    function validateBid() {
        return currentBid > lastBid;
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    }

    async function getBidsByAuctionId() {
        const response = await fetch(`http://localhost:3000/bids?auctionId=${auctionId}`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
</script>

<Navbar />
<div class="page_container">
    <div class="left_column">
        {#await getOneAuction()}
            <h1>Item loading...</h1>
        {:then auction}
            <div class="item_name">
                <h1>{auction.item}</h1>
            </div>
            <div class="auction_image">
                <img src={auction.image} alt="Auction image">
            </div>
        {:catch error}
            <h1>Something went wrong!</h1>
            <p>{error.message}</p>
        {/await}
    </div>

    <div class="right_column">
        <div class="form_container">
            <div class="text-center time__container border px-5 py-3">
                <h2 class="fs-3 fw-bold">{isClosed ? 'Auction closed' : `Closes in: ${days} days ${hours}hr ${minutes}m ${seconds}s`}</h2>
            </div>
            <div class="text-start border px-5 py-3">
                <h3 class="fs-3 fw-medium">{isClosed ? `Start price: $${startPrice}` : `Current bid: $${lastBid}`}</h3>
            </div>

            <form class="border px-5 py-3">
                {#if isClosed}
                    <h3>Come back later!</h3>
                {:else}
                    <div class="mb-3">
                        <label for="bid-directly" class="form-label">Bid directly</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text"></span>
                            <input value={currentBid} on:input={e => currentBid = e.target.value} id="bid-directly" type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                            <button on:click={() => {addBid()}} type="button" class="btn">Place bid</button>
                            {#if !isValid}
                                <small>Bid must be higher than the last price!</small>
                            {/if}
                        </div>
                    </div>
                {/if}
            </form>
            <div class="text-center align-middle px-5 py-3 border">
                {#if bids.length === 1} <!-- the first "bid" is the start price -->
                    <span class="fs-4 fw-medium">No bids placed.</span>
                {/if}
            </div>
        </div>
        <div class="bids-container">
            <AuctionBids bind:bids = {bids} />
        </div>
    </div>
</div>
<Footer/>
<style>
    * {
        font-family: Andale Mono, monospace;
        overflow: hidden;
    }

    .page_container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 80vh;
    }

    .left_column, .right_column {
        height: 100%;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .left_column {
        justify-content: flex-start;
    }

    .right_column {
        justify-content: center;
        padding: 50px;
    }

    .item_name {
        margin-top: 20px;
        width: 100%;
        height: 8%;
        text-align: center;
    }

    h1 {
        font-size: 35px;
        font-weight: bolder;
    }

    h2, h3 {
        font-size: 25px !important;
    }

    .auction_image {
        height: 80%;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        max-height: 100%;
        max-width: 100%;
    }

    .time__container {
        background: #D39B2C;
        padding: 15px !important;
    }

    .form_container {
        width: 70%;
        height: 70%;
    }

    .fw-medium {
        margin: 0;
    }

    button {
        background: #a67c00;
        color: white;
    }

    .bids-container {
        width: 100%;
        height: 30%;
    }
</style>