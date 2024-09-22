import { readdir, readFile, writeFile } from 'fs/promises';
import { resolve, join } from 'path';

const dir = resolve('dist');

async function updateFiles() {
  try {
    const files = await readdir(dir);

    await Promise.all(files.map(async (file) => {
      if (file.endsWith('.js')) {
        const filePath = join(dir, file);
        const data = await readFile(filePath, 'utf8');

        const updatedData = data.replace(/(from\s+['"])([^'"]+)(['"])/g, (match, p1, p2, p3) => {
          return `${p1}${p2}.js${p3}`;
        });

        await writeFile(filePath, updatedData, 'utf8');
      }
    }));
  } catch (err) {
    console.error('Error:', err);
  }
}

updateFiles();