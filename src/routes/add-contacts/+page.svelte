<script>
    import { goto } from '$app/navigation';

    let name = $state('');
    let address = $state('');
    let phone = $state('');

    async function save_contact() {
        const response = await fetch('/api/add-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address, phone })
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
            goto('/');
        }
    }
</script>


<main class="white-block">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <input bind:value={name} placeholder="Name" class="text-input" />
        <input bind:value={address} placeholder="Address" class="text-input" />
        <input bind:value={phone} placeholder="Phone number" class="text-input" />
    </div>

    <div style="text-align: center; margin-top: 1rem;">
        <button onclick={save_contact} class="button-style">
        Save
        </button>
    </div>
</main>

<style>
    .white-block {
        background: #fff;
        padding: 1rem;
        border-radius: 8px;
    }
    .text-input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .button-style {
        background: #0070f3;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>