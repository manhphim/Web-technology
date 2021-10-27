<script>
    import tokenStore from "../stores/token";

    export let modalTitle = '';
    export let auctionId = '';
    export let categories = [];
    export let getAllAuctions;

    let name;
    let imageUrl;
    let details;
    let price;
    let startTime;
    let endTime;
    let selectedCategory;

    $: auctionId, getAuctionById();
    async function getAuctionById() {
        const response = await fetch(`http://localhost:3000/auctions/${auctionId}`);
        handleErrors(response);

        let auction = await response.json();
        name = auction.item;
        imageUrl = auction.image;
        details = auction.details;
        price = auction.startPrice;
        selectedCategory = auction.category;

        // change format so the date input can read it
        startTime = input(auction.startTime);
        endTime = input(auction.endTime);
    }

    async function handleFormSubmit() {
        let method = 'POST';
        let url = 'http://localhost:3000/auctions/';
        if (modalTitle === 'Edit auction') {
            method = 'PUT';
            url = url + auctionId;
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$tokenStore}`
            },
            body: JSON.stringify({
                item: name,
                image: imageUrl,
                category: selectedCategory,
                status: 'Closed', //FIXME ??
                startTime: output(startTime),
                endTime: output(endTime),
                details: details,
                startingPrice: price
            })
        });
        handleErrors(response);

        await getAllAuctions();
        return await response.json();
    }

    function handleErrors(response) {
        if (!response.ok) {
            alert('Something went wrong!');
            throw new Error(response.statusText);
        }
    }

    function input(date) {
        if (date) return date.replace(" ", "T");
    }

    function output(date) {
        if (date) return date.replace("T", " ");
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
                    <input bind:value={name}
                           type="text"
                           class="form-control"
                           id="item-name"
                           placeholder="Enter name"
                           name="">
                </div>
                <div class="mb-3 mt-3">
                    <label for="item-image" class="form-label">Image url:</label>
                    <input bind:value={imageUrl}
                           type="text"
                           class="form-control"
                           id="item-image"
                           placeholder="Enter image url"
                           name="">
                </div>
                <div class="mb-3">
                    <label for="item-details" class="form-label">Details</label>
                    <input bind:value={details}
                           type="text"
                           class="form-control"
                           id="item-details"
                           placeholder="Enter details"
                           name="">
                </div>
                <div class="mb-3">
                    <label for="item-price" class="form-label">Start price</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input bind:value={price}
                               type="text"
                               class="form-control"
                               id="item-price"
                               aria-label="Amount (to the nearest dollar)">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="meeting-time" class="form-label">Start time:</label>
                    <input bind:value={startTime}
                           class="form-control" type="datetime-local" id="meeting-time"
                           name="meeting-time"
                           min="1970-01-01T00:00" max="2100-01-01T00:00">
                </div>
                <div class="mb-3">
                    <label for="end-time" class="form-label">End time:</label>
                    <input bind:value={endTime}
                           class="form-control" type="datetime-local" id="end-time"
                           name="meeting-time"
                           min="1970-01-01T00:00" max="2100-01-01T00:00">
                </div>
                <div class="mb-3">
                    <label for="category" class="form-label">Choose a category:</label>

                    <select id="category" class="form-select" aria-label="Default select example" bind:value={selectedCategory}>
                        {#each categories as category}
                            <option type="checkbox" value={category}>{category}</option>
                        {/each}
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-warning" data-bs-dismiss="modal">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
