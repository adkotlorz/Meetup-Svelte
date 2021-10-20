<script>
    import Modal from "./Modal.svelte";

    export let message;
</script>

<Modal title="Error occurred" on:cancel>
    <p>{message}</p>
</Modal>