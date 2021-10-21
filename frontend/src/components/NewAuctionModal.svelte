<script>
    import {onMount} from "svelte";
    import tokenStore from "../stores/token";
    import auctionStore from "../stores/auction";

    let auctions = [];
    let categorySet = new Set();
    let currentTime = new Date();
    let selected;
    let categories = [];
    export let modalTitle;
    let name;
    let detail;
    let price;
    let startingTime;
    let duration;

    onMount(async() => {
        auctions = await getAllAuctions();
        auctions.forEach((auction) => {
            categorySet.add(auction.category);
        });
        categories = [...categorySet];
    })
    async function getAllAuctions() {
        try {
            const response = await fetch('http://localhost:3000/auctions');
            return await response.json();
        } catch (e) {
            console.log(e);
            alert('Something went wrong!');
        }
    }

    async function handleFormSubmit() {
        if (modalTitle === 'Add new auction') {
            try {
                const response = await fetch('http://localhost:3000/auctions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + $tokenStore
                    },
                    body: JSON.stringify({
                        item: name,
                        category: selected,
                        isClosed: false,
                        startingTime: startingTime,
                        duration: duration,
                        details: detail,
                        startingPrice: price
                    })
                })
                return await response.json();
            } catch (e) {
                console.log(e);
                alert('Something went wrong!');
            }
        } else if (modalTitle === 'Edit auction') {
            try {
                const response = await fetch('http://localhost:3000/auctions/' + $auctionStore, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + $tokenStore
                    },
                    body: JSON.stringify({
                        item: name,
                        category: selected,
                        isClosed: false,
                        startingTime: startingTime,
                        duration: duration,
                        details: detail,
                        startingPrice: price
                    })
                })
                return await response.json();
            } catch (e) {
                console.log(e);
                alert('Something went wrong!');
            }
        }
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</svelte:head>

<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{modalTitle}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form action="" on:submit|preventDefault={handleFormSubmit} >
                <div class="mb-3 mt-3">
                    <label for="item-name" class="form-label">Name of item</label>
                    <input bind:value={name} type="text" class="form-control" id="item-name" placeholder="Enter name" name="">
                </div>
                <div class="mb-3">
                    <label for="item-detail" class="form-label">Details</label>
                    <input bind:value={detail} type="text" class="form-control" id="item-detail" placeholder="Enter details" name="">
                </div>
                <div class="mb-3">
                    <label for="item-price" class="form-label">Starting price</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input bind:value={price} type="text" class="form-control" id="item-price" aria-label="Amount (to the nearest dollar)">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="meeting-time" class="form-label">Starting time:</label>
                    <input bind:value={startingTime} class="form-control" type="datetime-local" id="meeting-time"
                           name="meeting-time"
                           min="1970-01-01T00:00" max="2100-01-01T00:00">
                </div>
                <div class="mb-3">
                    <label for="item-duration" class="form-label">Duration</label>
                    <input bind:value={duration} type="number" class="form-control" id="item-duration" placeholder="Enter duration" name="">
                </div>
                <div class="mb-3">
                    <label for="category" class="form-label">Choose a category:</label>

                    <select id="category" class="form-select" aria-label="Default select example" bind:value={selected}>
                        {#each categories as category}
                            <option type="checkbox" value={category}>{category}</option>
                        {/each}
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-warning">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>