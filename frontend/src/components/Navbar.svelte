<script>
    let logo = {
        id: 'logo',
        path: 'images/logo/logo2.png'
    }
</script>

<div class="nav-container">
    <div class="nav-logo">
        <img src="{logo.path}" alt="{logo.id}">
    </div>
    <div class="nav-links">
        <a href="/users">Users</a>
    </div>
</div>


<style>
    .nav-container {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 100px;
        background-color: #fff;
        border: 1px solid #ddd;
    }

    .nav-links {
        margin-right: 100px;
        display: flex;
        justify-content: space-around;
    }

    a {
        position: relative;
        padding: 1.2rem 1.5rem;
        margin: 1rem 1rem;
        text-decoration: none;
        color: #477592;
        font-size: 1.6rem;
        font-family: Andale Mono, monospace;
        text-align: center;
    }

    .nav-logo {
        margin-left: 20px;
    }

    img {
        width: 100%;
        height: 100%;
    }
</style>