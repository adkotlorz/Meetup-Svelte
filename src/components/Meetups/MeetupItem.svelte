<script>
    import {createEventDispatcher} from "svelte";
    import meetups from "../../store/meetups-store";
    import Button from "../UI/Button.svelte";
    import Badge from "../UI/Badge.svelte";

    export let id;
    export let title;
    export let subtitle;
    export let imageUrl;
    export let description;
    export let address;
    export let isFavorite;

    let isLoading = false;

    const dispatch = createEventDispatcher();

    const toggleFavorite = () => {
        isLoading = true;
        fetch(`https://meet-svelte-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`, {
            method: "PATCH",
            body: JSON.stringify({isFavorite: !isFavorite}),
            headers: {"Content-Type": "application/json"},
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error occurred. Please try again.");
                }
                isLoading = false;
                meetups.toggleFavorite(id);
            })
            .catch(err => {
                isLoading = false;
                console.log(err);
            });
    };
</script>

<style>
    article {
        box-shadow: 0 2px 8px rgba(0, 0, 0, .26);
        border-radius: 5px;
        background: white;
        margin: 1rem;
    }

    header,
    .content,
    footer {
        padding: 1rem;
    }

    .image {
        width: 100%;
        height: 14rem;
    }

    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
        font-size: 1.25rem;
        margin: 0.5rem 0;
        font-family: "Roboto Slab", sans-serif;
    }

    h2 {
        font-size: 1rem;
        color: #808080;
        margin: 0.5rem 0;
    }

    p {
        font-size: 1.25rem;
        margin: 0;
    }

    div {
        text-align: right;
    }

    .content {
        height: 4rem;
    }
</style>

<article>
    <header>
        <h1>
            {title}
            {#if isFavorite}
                <Badge>FAVORITE</Badge>
            {/if}
        </h1>
        <h2>{subtitle}</h2>
        <p>{address}</p>
    </header>
    <div class="image">
        <img src={imageUrl} alt={title}/>
    </div>
    <div class="content">
        <p>{description}</p>
    </div>
    <footer>
        <Button mode="outline" type="button" on:click={() => dispatch('edit', id)}>Edit</Button>
        {#if isLoading}
            <span>Changing...</span>
        {:else}
            <Button
                    type="button"
                    mode="outline"
                    color={isFavorite ? null : 'success'}
                    on:click={toggleFavorite}>
                {isFavorite ? 'Unfavored' : 'Favorite'}
            </Button>
        {/if}
        <Button type="button" on:click={() => dispatch('showdetails', id)}>Show details</Button>
    </footer>
</article>
