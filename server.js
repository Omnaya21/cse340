// IMPORTS
import { fileURLToPath } from 'url';
import path from 'path';
// Import express using ESM syntax
import express from 'express';

/**
 * Declare Important Variables
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const name = process.env.NAME || 'CSE 340 World';
// Define the port number the server will listen on
const PORT = process.PORT || 3000;

/**
 * Setup Express Server
 */
// Create an instance of an Express application
const app = express();

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Declare Routes
 */
/**
 * Routes
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/about.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/products.html'));
});

/**
 * Create an Express route that serves a static HTML file and meets the following requirements:
 * 1. The route should be accessible at the URL path '/test-1'.
 * 2. The HTML file should be named 'test-1.html' and located in the 'src/views' directory.
 * 3. You should serve the file using an absolute path, not a relative path.
 */
app.get('/test-1', (req, res) => {
    res.sendFile(path.join(__dirname,'src/views/test-1.html'));
});

/**
 * Create an Express route that serves a static HTML file and meets the following requirements:
 * 1. The route should be accessible at the URL path '/test-2'.
 * 2. The HTML file should be named 'test-2.html' and located in the 'src/views' directory.
 * 3. You should serve the file using a relative path, not a absolute path.
 */
app.get('/test-2', (req, res) => {
    //res.sendFile(path.join(__dirname, 'test-2.html'));
    res.sendFile('src/views/test-2.html', {root: __dirname});
    //res.sendFile('test-2.html', { 
    //    root: path.join(__dirname, '/src/views/') // Root directory for relative paths
    //});
});


// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});