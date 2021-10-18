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
                type="text"
                value={title}
                on:input={e => (title = e.target.value)}/>
        <TextInput
                id="subtitle"
                label="Subtitle"
                type="text"
                value={subtitle}
                on:input={e => (subtitle = e.target.value)}/>
        <TextInput
                id="address"
                label="Address"
                type="text"
                value={address}
                on:input={e => (address = e.target.value)}/>
        <TextInput
                id="imageUrl"
                label="Image URL"
                type="text"
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
    <MeetupGrid {meetups}/>
</main>







