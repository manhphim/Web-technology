<script>
    import Navbar from "./Navbar.svelte";
    import SearchBar from "./SearchBar.svelte";
    import Footer from "./Footer.svelte";
    import userStore from "../stores/user";
    import {onMount} from "svelte";

    let listOfUserBids = [];
    let listOfAuctionBids = [];
    let wonBids = [];
    export let params;

    let auctionId = params.id

    onMount(async () => {
        await getAllBidsOfUser();
        await getAllBidsOfAuction();
    })

    listOfUserBids.forEach((bid) => {
        if (listOfAuctionBids[listOfAuctionBids.length-1].username === bid.username) {
            wonBids.push(bid);
        }
    })

    console.log(wonBids);





    async function getAllBidsOfUser() {
        const response = await fetch(`http://localhost:3000/bids?username=${$userStore.username}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        listOfUserBids = await response.json();
    }

    async function getAllBidsOfAuction() {
        const response = await fetch((`http://localhost:3000/bids?auctionId=${auctionId}`))
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        listOfAuctionBids = await response.json();
    }

</script>

<Navbar/>

<body>
<div class="row justify-content-center my-3">
    <div class="fs-1 col-sm-12 text-center mx-auto my-auto">
        List of auctions won
    </div>

    <table class="table table-borderless col-sm-9">

    </table>
</div>
</body>

<Footer/>
<style>
    *{
        font-family: 'Abhaya Libre', serif;
    }
</style>