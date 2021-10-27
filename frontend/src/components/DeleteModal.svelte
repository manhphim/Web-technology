<script>
    import tokenStore from "../stores/token";

    export let auctionId = '';
    export let getAllAuctions;

    async function deleteAuction() {
        const response = await fetch(`http://localhost:3000/auctions/${auctionId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$tokenStore}`
            }
        });
        handleErrors(response);

        await getAllAuctions();
        return response;
    }

    function handleErrors(response) {
        if (!response.ok) {
            alert('Something went wrong!');
            throw new Error(response.statusText);
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
            <h5 class="modal-title" id="exampleModalLabel">Delete auction</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            Are you sure you want to delete this auction?
        </div>
        <div class="modal-footer">
            <button on:click={() => deleteAuction()} type="submit" class="btn btn-warning" data-bs-dismiss="modal">Submit</button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
        </div>
    </div>
</div>
