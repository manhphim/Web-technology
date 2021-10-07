<script>
    import {onMount} from "svelte";

    let auctions = [];
    onMount(async() => {
        auctions = await getAllAuctions();
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
</script>

<div class="auctions-container-wrapper">
    <div class="auctions-container">
        {#each auctions as auction}
            <div class="auction-wrapper">
                <div class="auction-image">
                    <img src="{auction['image']}" alt="{auction['item']}">
                </div>
                <div class="auction-title">{auction['item']}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .auctions-container-wrapper {
        display: block;
        margin: auto 50px auto 50px;
        padding: 50px;
    }

    .auctions-container {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: repeat(4, 1fr);
        gap: 30px 0;
    }

    .auction-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        background-color: #fff;
    }

    .auction-image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 400px;
        border: 1px solid #ddd;
    }

    .auction-title {
        font-family: Andale Mono, monospace;
        font-size: 20px;
        font-weight: normal;
        margin: 0 0 10px 0;
    }

    img {
        max-height: 300px;
        max-width: 300px;
    }
</style>