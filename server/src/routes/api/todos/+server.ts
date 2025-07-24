import { json, redirect } from '@sveltejs/kit';
import { file } from '$lib/server/api/file.js';
export async function POST({ request }) {
	const formData = await request.formData();
	const todo = formData.get('todo');
	try {
		const db = await file.readFile('db/db.json');
		if (db.ok) {
			db.content = [...db.content, { id: Date.now(), text: todo, done: false }];
			await file.writeFile('db/db.json', db.content);
		}
	} catch (error) {}
	return json(todo);
}
