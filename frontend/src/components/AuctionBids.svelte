<script>
    import userStore from '../stores/user';
    import tokenStore from "../stores/token";

    export let bids = [];
    export let getBidsByAuctionId;
    async function deleteBid(id) {
        const response = await fetch(`http://localhost:3000/bids/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$tokenStore}`
            }
        });
        handleErrors(response);

        await getBidsByAuctionId();

        return response;
    }

    function handleErrors(response) {
        if (!response.ok) {
            alert('Something went wrong!');
            throw new Error(response.statusText);
        }
    }
</script>

<div class="table-container">
    {#if bids.length !== 1} <!-- the first "bid" is the start price -->
        <table class="table table-borderless caption-top">
            <caption>List of bids</caption>
            <tbody>
                {#each bids as bid}
                    <tr>
                        <td>{bid.username}</td>
                        <td>{bid.time}</td>
                        <td>${bid.price}</td>
                        {#if bid.username === $userStore.username}
                            <button on:click={async () => deleteBid(bid.id)} style="font-size: 12px; width: 55px; height: 30px">Remove</button>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>

    {/if}
</div>
<style>
    * {
        font-family: 'Abhaya Libre', serif;
        font-size: 20px;
    }
</style>
