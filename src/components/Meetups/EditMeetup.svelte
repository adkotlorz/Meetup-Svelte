<script>
    import meetups from "../../store/meetups-store";
    import {createEventDispatcher} from "svelte";
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import Modal from "../UI/Modal.svelte";
    import {isEmpty, isValidEmail} from "../helpers/validation";

    export let id = null;

    let title = "";
    let subtitle = "";
    let address = "";
    let email = "";
    let description = "";
    let imageUrl = "";

    if (id) {
        const unsubscribe = meetups.subscribe(items => {
            const selectedMeetup = items.find(i => i.id === id);
            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            address = selectedMeetup.address;
            email = selectedMeetup.email;
            description = selectedMeetup.description;
            imageUrl = selectedMeetup.imageUrl;
        });

        unsubscribe();
    }

    const dispatch = createEventDispatcher();

    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: addressValid = !isEmpty(address);
    $: descriptionValid = !isEmpty(description);
    $: imageUrlValid = !isEmpty(imageUrl);
    $: emailValid = isValidEmail(email);
    $: formIsValid =
        titleValid &&
        subtitleValid &&
        addressValid &&
        descriptionValid &&
        imageUrlValid &&
        emailValid;

    const submitForm = () => {
        const meetupData = {
            title,
            subtitle,
            description,
            imageUrl,
            email,
            address,
        };

        if (id) {
            meetups.updateMeetup(id, meetupData);
        } else {
            fetch("https://meet-svelte-default-rtdb.europe-west1.firebasedatabase.app/meetups.json", {
                method: "POST",
                body: JSON.stringify({...meetupData, isFavorite: false}),
                headers: {"Content-Type": "application/json"},
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Error occurred, please try again");
                    }
                    res.json();
                })
                .then(data => {
                    meetups.addMeetup({...meetupData, isFavorite: false, id: data.name});
                })
                .catch(err => {
                    console.log(err);
                });
        }
        dispatch("save");
    };

    const deleteMeetup = () => {
        meetups.removeMeetup(id);
        dispatch("save");
    };

    const cancel = () => {
        dispatch("cancel");
    };
</script>

<style>
    form {
        width: 100%;
    }
</style>

<Modal title="Edit Meetup" on:cancel>
    <form on:submit|preventDefault={submitForm}>
        <TextInput
                id="title"
                label="Title"
                value={title}
                valid={titleValid}
                validityMessage="Enter a valid title"
                on:input={e => (title = e.target.value)}/>
        <TextInput
                id="subtitle"
                label="Subtitle"
                value={subtitle}
                valid={subtitleValid}
                validityMessage="Enter a valid subtitle"
                on:input={e => (subtitle = e.target.value)}/>
        <TextInput
                id="address"
                label="Address"
                value={address}
                valid={addressValid}
                validityMessage="Enter a valid address"
                on:input={e => (address = e.target.value)}/>
        <TextInput
                id="imageUrl"
                label="Image URL"
                value={imageUrl}
                valid={imageUrlValid}
                validityMessage="Enter a valid image url"
                on:input={e => (imageUrl = e.target.value)}/>
        <TextInput
                id="email"
                label="E-Mail"
                type="email"
                value={email}
                valid={emailValid}
                validityMessage="Enter a valid e-mail"
                on:input={e => (email = e.target.value)}/>
        <TextInput
                id="description"
                label="Description"
                controlType="textarea"
                valid={descriptionValid}
                validityMessage="Enter a valid description"
                bind:value={description}/>
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
        {#if id}
            <Button type="button" on:click={deleteMeetup}>Delete</Button>
        {/if}
    </div>
</Modal>