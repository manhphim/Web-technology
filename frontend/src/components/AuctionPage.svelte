<script>
    import Navbar from "./Navbar.svelte";
    import Footer from './Footer.svelte'
    import {onMount} from "svelte";
    import tokenStore from "../stores/token";
    import AuctionBids from "./AuctionBids.svelte";
    import userStore from "../stores/user";

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

    let credential = {};
    onMount(async () => {
        auction = await getOneAuction();
        bids = await getBidsByAuctionId();
        lastBid = bids.at(-1).price;
        tokenStore.subscribe(value => credential = value);
        console.log(credential);
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
<div class="row mt-5">
    {#if credential.token == ""}
        <div class="row d-flex justify-content-center">
            <div class="col-sm-9 border py-3">
                <span class="align-middle px-3 fs-5">User need to <a href="/">Sign in</a> or <a href="/register">Create an account</a> before bidding.</span>
            </div>
        </div>
    {/if}
    <div class="left_column col-lg-6 mt-5">
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

    <div class="right_column col-lg-6 mt-5">
        <div class="form_container container-md">
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
                            <span class="input-group-text">$</span>
                            <input value={currentBid} on:input={e => currentBid = e.target.value} id="bid-directly" type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                            <button on:click={() => {addBid()}} type="button" class="btn">Place bid</button>
                            {#if !isValid}
                                <small>Bid must be higher than the last price!</small>
                            {/if}
                        </div>
                    </div>
                {/if}
            </form>
                {#if bids.length === 1} <!-- the first "bid" is the start price -->
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

    button {
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

</style>