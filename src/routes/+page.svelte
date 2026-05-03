<script>
    import { onMount } from 'svelte';

    let contacts = $state([]);
    let filteredContacts = [];

    async function read_contacts() {
        console.log('Reading contacts');
        const response = await fetch('/api/read-contacts', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();

        console.log('Contacts: ', result.contacts);
        return result.contacts;
    }

    async function delete_contact(name, address, phone) {
        const response = await fetch('/api/delete-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address, phone })
        });

        const result = await response.json();

        if (result.success) {
            contacts = contacts.filter(
                c => !(c.name === name && c.address === address && c.phone === phone)
            );
        }
    }

    onMount(async () => {
        contacts = await read_contacts();
        filteredContacts = contacts;
    });
</script>


<main class="white-block">
    {#if contacts.length === 0}
        <p class="no-contacts">No contacts yet. Add one via /add-contacts</p>
    {:else}
        <h1>Contact List</h1>
        {#each contacts as contact}
        <div class="contact-card">
            <h3>{contact.name}</h3>
            <p>{contact.address}</p>
            <p>{contact.phone}</p>
            <button onclick={() => delete_contact(contact.name, contact.address, contact.phone)}>
            <img src="/trash.svg" alt="Trash" style="width: 20px; height: 20px;"/>
            </button>
        </div>
        {/each}
    {/if}

    <div style="margin-top: 2rem;">
        <a href="/add-contacts" class="button-style">
        Add New Contact
        </a>
    </div>
    </main>

    <style>
    .white-block {
        background: #fff;
        padding: 1rem;
        border-radius: 8px;
    }
    .contact-card {
        border: 1px solid #ddd;
        padding: 0.5rem;
        margin: 0.5rem 0;
        border-radius: 4px;
    }
    .no-contacts {
        font-style: italic;
        color: #666;
    }
</style>

