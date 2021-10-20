<script>
    import meetups from "./store/meetups-store";
    import Header from "./components/UI/Header.svelte";
    import MeetupGrid from "./components/Meetups/MeetupGrid.svelte";
    import EditMeetup from "./components/Meetups/EditMeetup.svelte";
    import MeetupDetail from "./components/Meetups/MeetupDetail.svelte";


    let editMode;
    let editedId;
    let page = "overview";
    let pageData = {};

    const savedMeetup = () => {
        editMode = null;
        editedId = null;
    };

    const cancelEdit = () => {
        editMode = null;
        editedId = null;
    };

    const showDetails = (e) => {
        page = "details";
        pageData.id = e.detail;
    };

    const closeDetails = () => {
        page = "overview";
        pageData = {};
    };

    const startEdit = (e) => {
        editMode = "edit";
        editedId = e.detail;
    };

</script>

<style>
    main {
        margin-top: 5rem;
    }
</style>

<div>
    <Header/>
    <main>
        {#if page === 'overview'}
            {#if editMode === 'edit'}
                <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit}/>
            {/if}
            <MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit={startEdit}
                        on:add={() => {editMode = 'edit'}}/>
        {:else}
            <MeetupDetail id={pageData.id} on:close={closeDetails}/>
        {/if}
    </main>
</div>







