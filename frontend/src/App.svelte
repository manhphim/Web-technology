<script>
	import router from 'page';
	import LoginForm from '../src/components/LoginForm.svelte'
	import RegisterForm from '../src/components/RegisterForm.svelte'
	import Home from '../src/components/Home.svelte'
	import AuctionPage from './components/AuctionPage.svelte'
    import AdminPage  from "./components/AdminPage.svelte";
    import UserDashboard from "./components/UserDashboard.svelte";

	let page;
	let params;

	router('/', (ctx) => page = LoginForm);
    router('/admin', (ctx) => page = AdminPage);
    router('/register', (ctx) => page = RegisterForm);
    router('/users/:id', (ctx) =>  {
        params = ctx.params;
        page = UserDashboard
    })
	router('/home/categories/:category', (ctx) => {
	    params = ctx.params;
	    page = Home;
    });
    router('/auctions/:id', (ctx) => {
        params = ctx.params;
        page = AuctionPage;
    });

    router.start();
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">\
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</svelte:head>

<svelte:component this="{page}" {params} />

<!--FIXME: can't we add this style paragraph to global css? -->
<style>
    * {
        font-family: 'Abhaya Libre', serif;
    }
</style>