<script>
    import { text } from "../stores/search.js";
</script>

<div class="form-group has-search">
    <span class="fa fa-search form-control-feedback"></span>
    <input type="text"
           class="form-control"
           id="search-field"
           placeholder="Search something"
           autocomplete="off"
           bind:value={$text}
    />
</div>

<style>
    .has-search .form-control {
        padding-left: 2.375rem;
    }

    .has-search .form-control-feedback {
        position: absolute;
        z-index: 2;
        display: block;
        width: 2.375rem;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
        pointer-events: none;
        color: #999999;
    }
</style>
