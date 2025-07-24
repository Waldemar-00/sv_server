import { file } from '$lib/server/api/file';

export const load = async () => {
	const content = await file.readFile('db/db.json');
	return { content };
};
