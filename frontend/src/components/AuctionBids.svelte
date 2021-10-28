<script>
    export let bids = [];
</script>

<div class="table-container">
<!--    FIXME: Is it still the first bid the start price?-->
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
    * {
        font-family: 'Abhaya Libre', serif;
        font-size: 20px;
    }
</style>
