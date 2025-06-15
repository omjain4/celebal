import { createServer } from 'http';
import { promises as fs } from 'fs';
import { join, basename } from 'path';
import { parse } from 'url';

const PORT = 3000;
const BASE_DIR = './files';

// Ensure base directory exists
async function initDir() {
  try {
    await fs.mkdir(BASE_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating directory:', err);
  }
}

const server = createServer(async (req, res) => {
  const { method, url } = req;
  const { pathname } = parse(url, true);
  const fileName = basename(pathname);
  const filePath = join(BASE_DIR, fileName);

  res.setHeader('Content-Type', 'application/json');

  try {
    if (method === 'POST' && fileName) {
      // Create file
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', async () => {
        await fs.writeFile(filePath, data);
        res.statusCode = 201;
        res.end(JSON.stringify({ message: `File ${fileName} created` }));
      });
    } else if (method === 'GET' && fileName) {
      // Read file
      const content = await fs.readFile(filePath, 'utf8');
      res.statusCode = 200;
      res.end(JSON.stringify({ fileName, content }));
    } else if (method === 'DELETE' && fileName) {
      // Delete file
      await fs.unlink(filePath);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: `File ${fileName} deleted` }));
    } else {
      // Invalid request
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid request' }));
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'File not found' }));
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Server error' }));
    }
  }
});

initDir().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});