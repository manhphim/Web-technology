<script>
    export let bids = [];
</script>

<div class="table-container">
    {#if bids.length !== 1} <!-- the first "bid" is the start price -->
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Time</th>
                    <th>Price</th>
                </tr>
            </thead>
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
    table {
        text-align: center;
        table-layout: fixed;
        width: 100%;
        height: auto;
        border-spacing: 0;
        border-collapse: separate;
    }
</style>