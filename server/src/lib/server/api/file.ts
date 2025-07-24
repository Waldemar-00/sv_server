import * as fs from 'fs/promises';
import { join } from 'path';
class Files {
	basePath: string;
	constructor(basePath: string) {
		this.basePath = basePath;
	}
	async readFile(path: string) {
		try {
			const PATH = join(this.basePath, path);
			const content = JSON.parse(await fs.readFile(PATH, 'utf-8'));
			return { ok: true, content };
		} catch (error) {
			const content = error instanceof Error ? error : new Error(String(error));
			return { ok: false, content };
		}
	}
	async writeFile(path: string, newDB: any) {
		try {
			const PATH = join(this.basePath, path);
			const db = JSON.stringify(newDB);
			await fs.writeFile(PATH, db, 'utf-8');
			return { message: 'DB has been written' };
		} catch (error) {
			if (error instanceof Error) return { error };
			else return new Error('Something went wrong!');
		}
	}
}

const basePath = join(process.cwd(), 'src', 'lib', 'server');
export const file = new Files(basePath);
