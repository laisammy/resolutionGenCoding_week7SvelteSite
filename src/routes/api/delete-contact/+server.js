import { json } from '@sveltejs/kit';
import db from '$lib/server/db';

export async function POST({ request }) {
    const { name, address, phone } = await request.json();

    const stmt = db.prepare(
        'DELETE FROM contacts WHERE name = @name AND address = @address AND phone = @phone'
    );
    stmt.run({ name, address, phone });

    return json({ success: true });
}