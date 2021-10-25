<script>
    export let bids = [];
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
                    </tr>
                {/each}
            </tbody>
        </table>

    {/if}
</div>
<style>

</style>