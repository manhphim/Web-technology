<script>
	import { Router, Link, Route } from "svelte-routing";
	import LoginForm from '../src/components/LoginForm.svelte'
	import RegisterForm from '../src/components/RegisterForm.svelte'
	import Home from '../src/components/Home.svelte'
</script>

<Router>
	<Route exact path="/"><LoginForm /></Route>
	<Route exact path="/register"><RegisterForm /></Route>
	<Route exact path="/home"><Home /></Route>

</Router>