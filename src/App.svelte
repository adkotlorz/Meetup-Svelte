<script>
    import Header from "./components/UI/Header.svelte";
    import MeetupItem from "./components/Meetups/MeetupItem.svelte";

    const meetups = [
        {
            id: "m1",
            title: "Coding Bootcamp",
            subtitle: "Learn to code",
            description: "In this meetup, we will touch You how to code",
            imageUrl: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
            address: "35 Nerd Road, 35032 Los Angeles",
            contactEmail: "code@test.com",
        },
        {
            id: "m2",
            title: "Swim Together",
            subtitle: "Learn to swim",
            description: "In this meetup, we will touch You how to swim",
            imageUrl: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
            address: "35 Nerd Road, 35032 Los Angeles",
            contactEmail: "swim@test.com",
        },
    ];
</script>

<style>
    .meetups {
        margin-top: 5rem;
    }
</style>

<Header/>

<section class="meetups">
    {#each meetups as meetup}
        <MeetupItem
                title={meetup.title}
                subtitle={meetup.subtitle}
                description={meetup.description}
                imageUrl={meetup.imageUrl}
                email={meetup.contactEmail}
                address={meetup.address}
        />
    {/each}
</section>





