<script>
    import {onMount} from "svelte";
    import NewAuctionModal from "./NewAuctionModal.svelte";
    import DeleteModal from "./DeleteModal.svelte";

    let auctions = [];
    let auctionId;
    let keys = []
    let selected;
    let selectedValue = 0;
    let categories = [];
    let selectedAuction;

    onMount(async () => {
        auctions = await getAllAuctions();
        keys = Object.keys(auctions[1]);
        keys.splice(keys.indexOf('image'), 1);

        let categorySet = new Set();
        auctions.forEach((auction) => {
            delete auction.image;
            categorySet.add(auction.category);
        });
        categories = [...categorySet];
    });

    async function getAllAuctions() {
        const response = await fetch('http://localhost:3000/auctions');
        handleErrors(response);

        return await response.json()
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
<body>
    <div class="bg-image background__image">
        <div class="background-overlay"></div>
    </div>

    <div class="main_body">
        <h1 class="text-center my-5">Admin page</h1>
        <div class="table__container table-responsive-xl d-flex justify-content-center">
            <table class="table caption-top">
                <caption>
                    <div class="d-flex justify-content-between">
                        <h2>List of auctions</h2>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-plus-square me-2"></i>Add auction</button>
                    </div>
                </caption>
                <thead class="text-center">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Item</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Start time</th>
                    <th scope="col">End time</th>
                    <th scope="col">Details</th>
                    <th scope="col">Start price</th>
                </tr>
                </thead>
                <tbody>
                {#each auctions as auction (auction.id)}
                    <tr>
                        {#each Object.values(auction) as value}
                            <td>{value}</td>
                        {/each}
                        <td class="text-center">
                            <button on:click={() => auctionId = auction.id} class="btn btn-outline-success mb-2" data-bs-toggle="modal" data-bs-target="#editModal">
                                <i class="bi bi-pencil-fill"></i>
                                Edit
                            </button>
                            <button on:click={()=> auctionId = auction.id} class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                <i class="bi bi-trash-fill"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <NewAuctionModal modalTitle="Add new auction" bind:categories />
    </div>

    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <NewAuctionModal modalTitle="Edit auction" bind:auctionId bind:categories />
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
        <DeleteModal bind:auctionId />
    </div>
</body>

<style>
    .background__image {
        position: absolute;
        background-image: url('https://images.pexels.com/photos/2079670/pexels-photo-2079670.jpeg?cs=srgb&dl=pexels-emre-can-acer-2079670.jpg&fm=jpg');
        width: 100vw;
        height: 100vh;
        opacity: 0.8;
    }


    .main_body {
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        height: 80vh;
        overflow: auto;
        box-shadow: 5px 10px 10px #888888;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .main_body::-webkit-scrollbar {
        display: none; /* Chrome */
    }

    td button {
        width: 100px;
    }
    table {
        width: 70%;
        height: 800px;
        overflow: scroll;
    }
</style>