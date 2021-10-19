<script>
    import meetups from "./store/meetups-store";
    import Header from "./components/UI/Header.svelte";
    import MeetupGrid from "./components/Meetups/MeetupGrid.svelte";
    import EditMeetup from "./components/Meetups/EditMeetup.svelte";
    import MeetupDetail from "./components/Meetups/MeetupDetail.svelte";
    import Button from "./components/UI/Button.svelte";


    let editMode;
    let page = "overview";
    let pageData = {};

    const addMeetup = () => {
        editMode = null;
    };

    const cancelEdit = () => {
        editMode = null;
    };

    const showDetails = (e) => {
        page = "details";
        pageData.id = e.detail;
    };

    const closeDetails = () => {
        page = "overview";
        pageData = {};
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
        {#if page === 'overview'}
            <div class="meetup-controls">
                <Button on:click={() => editMode = 'add'}>
                    New Meetup
                </Button>
            </div>
            {#if editMode === 'add'}
                <EditMeetup on:save={addMeetup} on:cancel={cancelEdit}/>
            {/if}
            <MeetupGrid meetups={$meetups} on:showdetails={showDetails}/>
        {:else}
            <MeetupDetail id={pageData.id} on:close={closeDetails}/>
        {/if}
    </main>
</div>







