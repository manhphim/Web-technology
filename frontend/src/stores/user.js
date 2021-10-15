import {writable} from "svelte/store";

export default writable({
    username: "",
    roles: [],
    iat: 0
});