<script>
    import meetups from "./store/meetups-store";
    import Header from "./components/UI/Header.svelte";
    import MeetupGrid from "./components/Meetups/MeetupGrid.svelte";
    import EditMeetup from "./components/Meetups/EditMeetup.svelte";
    import Button from "./components/UI/Button.svelte";


    let editMode;

    const addMeetup = () => {
        editMode = null;
    };

    const cancelEdit = () => {
        editMode = null;
    };

    const toggleFavorite = (e) => {
        const id = e.detail;
        meetups.toggleFavorite(id);
    };
</script>

<style>
    main {
        margin-top: 5rem;
    }

    .meetup-controls {
        margin: 1rem;
    }
</style>

<div>
    <Header/>
    <main>
        <div class="meetup-controls">
            <Button on:click={() => editMode = 'add'}>
                New Meetup
            </Button>
        </div>
        {#if editMode === 'add'}
            <EditMeetup on:save={addMeetup} on:cancel={cancelEdit}/>
        {/if}
        <MeetupGrid meetups={$meetups} on:togglefavorite={toggleFavorite}/>
    </main>
</div>







