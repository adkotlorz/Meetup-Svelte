<script>
    import meetups from "./store/meetups-store";
    import Header from "./components/UI/Header.svelte";
    import MeetupGrid from "./components/Meetups/MeetupGrid.svelte";
    import EditMeetup from "./components/Meetups/EditMeetup.svelte";
    import MeetupDetail from "./components/Meetups/MeetupDetail.svelte";
    import LoadingSpinner from "./components/UI/LoadingSpinner.svelte";


    let editMode;
    let editedId;
    let page = "overview";
    let pageData = {};
    let isLoading = true;

    fetch("https://meet-svelte-default-rtdb.europe-west1.firebasedatabase.app/meetups.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("Fetch failed");
            }
            return res.json();
        })
        .then(data => {
            const loadedMeetups = [];
            for (const key in data) {
                loadedMeetups.push({
                    ...data[key],
                    id: key,
                });
            }
            setTimeout(() => {
                isLoading = false;
                meetups.setMeetups(loadedMeetups.reverse());
            }, 1000);
        })
        .catch(err => {
            isLoading = false;
            console.log(err);
        });

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
            {#if isLoading}
                <LoadingSpinner/>
            {:else}
                <MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit={startEdit}
                            on:add={() => {editMode = 'edit'}}/>
            {/if}
        {:else}
            <MeetupDetail id={pageData.id} on:close={closeDetails}/>
        {/if}
    </main>
</div>







