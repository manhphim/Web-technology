<script>
    import {onMount} from "svelte";
    let auction;
    let title;

    onMount(async() => {
        auction = await getItem();
    })
    async function getItem() {
    }

</script>

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF" crossorigin="anonymous">

    <title>Hello, world!</title>
</head>

<body>

    <div class="row justify-content-around align-middle">
        <div class="col-6 align-self-start">
            <h1 class="text-start fs-1 fw-bold">TITLE</h1>
            <img src="images/antique-sideboard.jpg" class="img-fluid rounded" alt="product">
        </div>

        <div class="col-4 align-self-center">
            <div class="text-center time__container border px-5 py-3">
                <h1 class="fs-3 fw-bold">Closes in: 0 day 02:00:00</h1>
                <p class="fs-5 fw-medium">You haven't placed any bid on this lot.</p>
            </div>
            <div class="text-start border px-5 py-3">
                <h3 class="fs-3 fw-medium">Current bid: $1000</h3>
            </div>

            <form class="border px-5 py-3">
                <div class="mb-3">
                    <label for="bid-directly" class="form-label">Bid directly</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input id="bid-directly" type="text" class="form-control me-2" aria-label="Amount (to the nearest dollar)">
                        <button type="button" class="btn">Place bid</button>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="bid-automatically" class="form-label">Bid automatically</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input id="bid-automatically" type="text" class="form-control me-2" aria-label="Amount (to the nearest dollar)">
                        <button type="button" class="btn">Bid automatically</button>
                    </div>
                </div>
            </form>
            <div class="text-center align-middle px-5 py-3 border">
                <span class="fs-4 fw-medium">No bids placed.</span>
            </div>
        </div>
    </div>
</body>

<style>
    * {
        font-family: Andale Mono, monospace;
    }

    .time__container {
        background: #D39B2C;
    }

    button {
        background: #a67c00;
        color: white;
    }
</style>