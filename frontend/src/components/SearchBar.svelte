<script>
    import { text } from "../stores/search.js";
</script>

<div id="search-container">
    <input type="text"
           id="search-field"
           placeholder="Search something"
           autocomplete="off"
           bind:value={$text}
    />
</div>

<style>
    #search-container {
        width: 100%;
        display: flex;
        align-items: center;
        margin: 0 0 0 10px;
    }

    #search-field {
        width: 100%;
        font-size: 1.3rem;
        border: 1px solid gray;
        border-radius: 5px;
        padding: 8px;
        margin: 0 10px 0;
    }
</style>