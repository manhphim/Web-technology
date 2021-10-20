<script>
    import Navbar from "./Navbar.svelte";

    export let params;

    let auction;
    async function getOneAuction(){
        let id = params.id;
        const response = await fetch(`http://localhost:3000/auctions/${id}`);

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(await response.text());
        }
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
                <h2 class="fs-3 fw-bold">Closes in: 0 day 02:00:00</h2>
                <p class="fs-5 fw-medium">You haven't placed any bid on this lot.</p>
            </div>
            <div class="text-start border px-5 py-3">
                <h3 class="fs-3 fw-medium">Current bid: $1000</h3>
            </div>

            <form class="border px-5 py-3">
                <div class="mb-3">
                    <label for="bid-directly" class="form-label">Bid directly</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input id="bid-directly" type="text" class="form-control me-2" aria-label="Amount (to the nearest dollar)">
                        <button type="button" class="btn">Place bid</button>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="bid-automatically" class="form-label">Bid automatically</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input id="bid-automatically" type="text" class="form-control me-2" aria-label="Amount (to the nearest dollar)">
                        <button type="button" class="btn">Bid automatically</button>
                    </div>
                </div>
            </form>
            <div class="text-center align-middle px-5 py-3 border">
                <span class="fs-4 fw-medium">No bids placed.</span>
            </div>
        </div>
    </div>
</div>

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

    .auction_image {
        height: 90%;
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
    }

    .form_container {
        width: 500px;
        height: 520px;
    }

    .fw-medium {
        margin: 0;
    }

    button {
        background: #a67c00;
        color: white;
    }
</style>