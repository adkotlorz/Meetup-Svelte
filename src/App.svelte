<script>
    import Header from "./components/UI/Header.svelte";
    import MeetupGrid from "./components/Meetups/MeetupGrid.svelte";
    import EditMeetup from "./components/Meetups/EditMeetup.svelte";
    import Button from "./components/UI/Button.svelte";

    let meetups = [
        {
            id: "m1",
            title: "Coding Bootcamp",
            subtitle: "Learn to code",
            description: "In this meetup, we will touch You how to code",
            imageUrl: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
            address: "35 Nerd Road, 35032 Los Angeles",
            email: "code@test.com",
            isFavorite: false,
        },
        {
            id: "m2",
            title: "Swim Together",
            subtitle: "Learn to swim",
            description: "In this meetup, we will touch You how to swim",
            imageUrl: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
            address: "35 Nerd Road, 35032 Los Angeles",
            email: "swim@test.com",
            isFavorite: false,
        },
    ];

    let editMode;

    const addMeetup = (e) => {
        const newMeetup = {
            id: Math.random().toString(),
            title: e.detail.title,
            subtitle: e.detail.subtitle,
            description: e.detail.description,
            imageUrl: e.detail.imageUrl,
            contactEmail: e.detail.email,
            address: e.detail.address,
        };

        meetups = [newMeetup, ...meetups];
        editMode = null;
    };

    const toggleFavorite = (e) => {
        const id = e.detail;
        const updatedMeetup = {...meetups.find(m => m.id === id)};
        updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
        const meetupIndex = meetups.findIndex(m => m.id === id);
        const updatedMeetups = [...meetups];
        updatedMeetups[meetupIndex] = updatedMeetup;
        meetups = updatedMeetups;
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
            <EditMeetup on:save={addMeetup}/>
        {/if}
        <MeetupGrid {meetups} on:togglefavorite={toggleFavorite}/>
    </main>
</div>







