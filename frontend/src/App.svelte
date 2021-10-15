<script>
	import router from 'page';
	import LoginForm from '../src/components/LoginForm.svelte'
	import RegisterForm from '../src/components/RegisterForm.svelte'
	import Home from '../src/components/Home.svelte'
	import AuctionPage from './components/AuctionPage.svelte'

	let page;
	let params;

	router('/', (ctx) => page = LoginForm);
	router('/home', (ctx) => page = Home);
    router('/register', (ctx) => page = RegisterForm);
    router('/auctions/:id', (ctx) => {
        params = ctx.params;
        page = AuctionPage;
    });

    router.start();
</script>

<svelte:component this="{page}" {params} />
