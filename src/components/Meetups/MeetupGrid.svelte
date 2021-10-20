<script>
    import {createEventDispatcher} from 'svelte';
    import {scale} from "svelte/transition";
    import MeetupItem from "./MeetupItem.svelte";
    import MeetupFilter from "./MeetupFilter.svelte";
    import Button from "../UI/Button.svelte";

    export let meetups;

    const dispatch = createEventDispatcher();

    let favsOnly = false;

    $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

    const setFilter = (e) => {
        favsOnly = e.detail === 1;
    }
</script>

<style>
    .meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    .meetup__controls {
        margin: 1rem;
        display: flex;
        justify-content: space-between;
    }

    @media (min-width: 768px) {
        .meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>

<section class="meetup__controls">
    <MeetupFilter on:select={setFilter}/>

    <Button on:click={() => dispatch('add')}>
        New Meetup
    </Button>
</section>

<section class="meetups">
    {#each filteredMeetups as meetup}
        <div transition:scale>
            <MeetupItem
                    id={meetup.id}
                    title={meetup.title}
                    subtitle={meetup.subtitle}
                    description={meetup.description}
                    imageUrl={meetup.imageUrl}
                    contactEmail={meetup.contactEmail}
                    address={meetup.address}
                    isFavorite={meetup.isFavorite}
                    on:showdetails
                    on:edit
            />
        </div>
    {/each}
</section>