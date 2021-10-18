<script>
    import Header from "./components/UI/Header.svelte";
    import MeetupGrid from "./components/Meetups/MeetupGrid.svelte";
    import TextInput from "./components/UI/TextInput.svelte";
    import Button from "./components/UI/Button.svelte";

    let title = "";
    let subtitle = "";
    let address = "";
    let email = "";
    let description = "";
    let imageUrl = "";

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

    const addMeetup = () => {
        const newMeetup = {
            id: Math.random().toString(),
            title,
            subtitle,
            description,
            imageUrl,
            email,
            address,
        };

        meetups = [newMeetup, ...meetups];
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

    form {
        width: 30rem;
        max-width: 90%;
        margin: auto;
    }
</style>

<Header/>

<main>
    <form on:submit|preventDefault={addMeetup}>
        <TextInput
                id="title"
                label="Title"
                value={title}
                on:input={e => (title = e.target.value)}/>
        <TextInput
                id="subtitle"
                label="Subtitle"
                value={subtitle}
                on:input={e => (subtitle = e.target.value)}/>
        <TextInput
                id="address"
                label="Address"
                value={address}
                on:input={e => (address = e.target.value)}/>
        <TextInput
                id="imageUrl"
                label="Image URL"
                value={imageUrl}
                on:input={e => (imageUrl = e.target.value)}/>
        <TextInput
                id="email"
                label="E-Mail"
                type="email"
                value={email}
                on:input={e => (email = e.target.value)}/>
        <TextInput
                id="description"
                label="Description"
                controlType="textarea"
                value={description}
                on:input={e => (description = e.target.value)}/>
        <Button type="submit" caption="Save"/>
    </form>
    <MeetupGrid {meetups} on:togglefavorite={toggleFavorite}/>
</main>







