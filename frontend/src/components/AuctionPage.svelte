<script>
    import Navbar from "./Navbar.svelte";
    import Footer from './Footer.svelte'
    import {onMount} from "svelte";
    import tokenStore from "../stores/token";
    import AuctionBids from "./AuctionBids.svelte";
    import Countdown from "./Countdown.svelte";

    export let params = '';
    let username = 'melissa'; // FIXME

    let auction = {};
    let auctionId = params.id;
    let startTime;
    let endTime;
    let isClosed = true;
    let bids = [];
    let startPrice = '';
    let lastBid = '';
    let currentBid;
    $: console.log('----last bid', lastBid)
    $: console.log('----bids', bids);
    $: lastBid, currentBid = lastBid;
    let days = '';
    let hours = '';
    let minutes = '';
    let seconds = '';

    let credential = {};
    onMount(async () => {
        tokenStore.subscribe(value => credential = value);

        auction = await getOneAuction();
        await getBidsByAuctionId();

        isClosed = auction.status === 'Closed';
        startTime = auction.startTime;
        endTime = auction.endTime;
        auction.status = isClosed ? 'Closed' : 'Opened';
    })

    async function getOneAuction() {
        const response = await fetch(`http://localhost:3000/auctions/${auctionId}`);

        return handleErrors(response).json();
    }

    let time;
    let isValid = true;
    async function addBid() {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let timestamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        time  = date + ' ' + timestamp;

        isValid = validateBid();
        if (isValid) {
            await postBid();
        }
    }

    async function postBid() {
        const response = await fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username: username,
                auctionId: auctionId,
                time: time,
                price: currentBid})
        });

        handleErrors(response);
        await getBidsByAuctionId();
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
        console.log('in get bids by auction')
        const response = await fetch(`http://localhost:3000/bids?auctionId=${auctionId}`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        bids = await response.json();
        if (bids.length > 0) {
            lastBid = bids.at(-1).price;
        }
    }
</script>

<Navbar />
<div class="row mt-5 justify-content-center">
    {#if credential.token == ""}
        <div class="row d-flex justify-content-center">
            <div class="col-sm-9 border py-3">
                <span class="align-middle px-3 fs-5">User need to <a href="/">Sign in</a> or <a href="/register">Create an account</a> before bidding.</span>
            </div>
        </div>
    {/if}
    <div class="col-lg-6 mt-5">
        {#await getOneAuction()}
            <h1>Item loading...</h1>
        {:then auction}
            <div class="item_name">
                <h1 class="display-2">{auction.item}</h1>
            </div>
            <div class="auction_image">
                <img src={auction.image} alt="Auction image">
            </div>
        {:catch error}
            <h1>Something went wrong!</h1>
            <p>{error.message}</p>
        {/await}
    </div>

    <div class="col-lg-6 mt-5">
        <div class="form_container container-md">
            <div class="text-center time__container border px-5 py-3">
                {#if isClosed}
                    <h2>Auction closed</h2>
                {:else}
                    <Countdown bind:startTime bind:endTime fontSize="2rem" fontWeight="bold"/>
                {/if}
<!--                <h2 class="fs-3 fw-bold">{isClosed ? 'Auction closed' : `Closes in: ${days} days ${hours}hr ${minutes}m ${seconds}s`}</h2>-->
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
                            <span class="input-group-text">$</span>
                            <input value={currentBid} on:input={e => currentBid = e.target.value} id="bid-directly" type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                            <button on:click={async () => {await addBid()}} type="button" class="btn">Place bid</button>
                            {#if !isValid}
                                <small>Bid must be higher than the last price!</small>
                            {/if}
                        </div>
                    </div>
                {/if}
            </form>
                {#if bids.length === 0}
                    <div class="text-center px-5 py-3 border">
                        <span class="fs-4 fw-medium">No bids placed.</span>
                    </div>
                {:else}
                    <div class="px-5 py-3 border">
                        <AuctionBids bind:bids = {bids} />
                    </div>
                {/if}
        </div>
    </div>

    <div class="row justify-content-center mt-3">
        <div class="accordion accordion-flush" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        <h1 class="ms-4">Description</h1>
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body fs-5 ms-4">
                        {auction.details}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<Footer/>

<style>
    * {
        font-family: 'Abhaya Libre', serif;
    }


    .item_name {
        width: 100%;
        height: 8%;
        text-align: center;
    }

    h1 {
        font-size: 35px;
        font-weight: bolder;
        margin-bottom: 0;
    }

    h2, h3 {
        font-size: 25px !important;
    }

    .auction_image {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 600px;
    }

    img {
        max-height: 100%;
        max-width: 100%;
    }

    .time__container {
        background: #D39B2C;
        padding: 15px !important;
    }

    .fw-medium {
        margin: 0;
    }

    form button {
        background: #a67c00;
        color: white;
    }

    @media screen and (min-width: 992px) {
        .form_container {
            width: 75%;
        }
    }

    a {
        color: #BB8700;
    }

    a:hover {
        cursor: pointer;
    }

    p {
        word-spacing: 1px;
    }

    .accordion button:active {
        border-style: outset;
    }
</style>