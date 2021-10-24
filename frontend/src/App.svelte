<script>
	import router from 'page';
	import LoginForm from '../src/components/LoginForm.svelte'
	import RegisterForm from '../src/components/RegisterForm.svelte'
	import Home from '../src/components/Home.svelte'
	import AuctionPage from './components/AuctionPage.svelte'

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
</svelte:head>

<svelte:component this="{page}" {params} />
