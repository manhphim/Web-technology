<script>
	import router from 'page';
	import LoginForm from '../src/components/LoginForm.svelte'
	import RegisterForm from '../src/components/RegisterForm.svelte'
	import Home from '../src/components/Home.svelte'
	import AuctionPage from './components/AuctionPage.svelte'
    import AdminPage  from "./components/AdminPage.svelte";

	let page;
	let params;

	router('/', (ctx) => page = LoginForm);
	router('/home/categories/:category', (ctx) => {
	    params = ctx.params;
	    page = Home;
    });
    router('/register', (ctx) => page = RegisterForm);
    router('/auctions/:id', (ctx) => {
        params = ctx.params;
        page = AuctionPage;
    });
    router('/admin', (ctx) => page = AdminPage);


    router.start();
</script>

<svelte:head>
    <script
            type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.js">
    </script>
    <link
            href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.css"
            rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

</svelte:head>

<svelte:component this="{page}" {params} />
