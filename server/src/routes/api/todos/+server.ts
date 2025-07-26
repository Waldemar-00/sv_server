import { json } from '@sveltejs/kit';
import { file } from '$lib/server/api/file.js';
export async function POST ( { request } )
{
	const formData = await request.formData()
	const marker = formData.get('marker')
	switch ( marker )
	{
		case 'ADD':
			const todo = formData.get('todo');
			try {
				const db = await file.readFile('db/db.json');
				if (db.ok) {
					db.content = [...db.content, { id: Date.now(), text: todo, done: false }];
					await file.writeFile('db/db.json', db.content);
				}
			} catch ( error )
			{
				throw {ok: false, error}
			}
			return json( {ok: true, todo} );
		case 'TOGGLE':
			const id = formData.get('id');
			const done = formData.get('done');
			try {
				let { ok, content } = await file.readFile( 'db/db.json' );
				if (ok) {
					content = content.map((todo: any) => {
						if (todo.id === Number(id)) {
							done === 'on' ? todo.done = true : todo.done = false
						}
						return todo;
					});
					await file.writeFile('db/db.json', content);
				}
			} catch ( error )
			{
				throw {ok: false, error}
			}
			return json( { ok: true, id } );
		case 'DELETE':
			const deleteId = formData.get('deleteId');
			try {
				let { ok, content } = await file.readFile( 'db/db.json' );
				if (ok) {
					content = content.filter((todo: any) => todo.id !== Number(deleteId));
					await file.writeFile('db/db.json', content);
				}
			} catch ( error )
			{
				throw {ok: false, error}
			}
			return json( { ok: true, deleteId } );
		default:
			return json( {ok: false, error: 'Unknown marker'} );
	}
}
