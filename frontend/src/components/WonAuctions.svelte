<script>
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
    import userStore from "../stores/user";
    import {onMount} from "svelte";

    let wonAuctions = [];
    onMount(async () => {
        await getWonAuctions();
        console.log(wonAuctions);
    })

    async function getWonAuctions() {
        // fetch the auctions that have the "Closed" status
        let closedAuctions = await getClosedAuctions();
        // fetch all the bids
        let bids = await getAllBids();
        // take only the bids placed by the logged-in-user
        bids = bids.filter(bid => bid.username === $userStore.username);
        // get a list of the closed auctions' ids
        let closedAuctionsIds = closedAuctions.map(auction => auction.id);
        // get a list of the auctions that have bids placed
        let auctionsIds = bids.map(bid => bid.auctionId);
        // get the auctions' ids of the closed ones that have bids placed
        let result = closedAuctionsIds.filter(id => auctionsIds.includes(id));

        // get the auction objects that meet the criteria above
        wonAuctions = closedAuctions.filter(auction => result.includes(auction.id));
    }

    async function getAllBids() {
        const response = await fetch(("http://localhost:3000/bids"))
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }

    async function getClosedAuctions() {
        const response = await fetch("http://localhost:3000/auctions?status=Closed");
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
</script>

<Navbar/>

<body>
<div class="row justify-content-center my-3">
    <div class="fs-1 col-sm-12 text-center mx-auto my-auto">
        List of auctions won
    </div>

    <table class="table col-sm-9 text-center w-75 overflow-auto h-75">
        <thead class="text-center">
            <tr>
                <th scope="col">Item</th>
                <th scope="col">Category</th>
            </tr>
        </thead>
        <tbody>
            {#each wonAuctions as auction (auction.id)}
                <tr>
                    <td>{auction.item}</td>
                    <td>{auction.category}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
</body>

<Footer/>
<style>
    *{
        font-family: 'Abhaya Libre', serif;
    }
</style>
