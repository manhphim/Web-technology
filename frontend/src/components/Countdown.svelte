<script>
    export let startTime = '';
    export let endTime = '';

    startTime = getMilliseconds(startTime);
    endTime = getMilliseconds(endTime);
    let isClosed = true;
    let days = '';
    let hours = '';
    let minutes = '';
    let seconds = '';
    let now = new Date().getTime();
    if (now > startTime && now < endTime) {
        isClosed = false;
        const x = setInterval(() => {
            now = new Date().getTime();
            let timeLeft = endTime - now;
            days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            if (timeLeft < 0) {
                clearInterval(x);
                isClosed = true;
            }
        }, 1000);
    }

    function getMilliseconds(date) {
        if (date) return new Date(date).getTime();
    }
</script>

<div class="countdown-wrapper">
    <p>{days}d {hours}h {minutes}m {seconds}s</p>
</div>
