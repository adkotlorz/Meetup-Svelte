<script>
    import {createEventDispatcher} from "svelte";
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import Modal from "../UI/Modal.svelte";

    let title = "";
    let subtitle = "";
    let address = "";
    let email = "";
    let description = "";
    let imageUrl = "";

    const dispatch = createEventDispatcher();

    const submitForm = () => {
        dispatch("save", {
            title,
            subtitle,
            address,
            email,
            description,
            imageUrl,
        });
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
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={submitForm}>Save</Button>
    </div>
</Modal>