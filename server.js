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
const NODE_ENV = process.env.NODE_ENV || 'production';
// Define the port number the server will listen on
const PORT = process.PORT || 3000;

// When in development mode, start a WebSocket server for live reloading
if (NODE_ENV.includes('dev')) {
    const ws = await import('ws');

    try {
        const wsPort = parseInt(PORT) + 1;
        const wsServer = new ws.WebSocketServer({ port: wsPort });

        wsServer.on('listening', () => {
            console.log(`WebSocket server is running on port ${wsPort}`);
        });

        wsServer.on('error', (error) => {
            console.error('WebSocket server error:', error);
        });
    } catch (error) {
        console.error('Failed to start WebSocket server:', error);
    }
}

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

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Global template variables middleware
 * 
 * Makes common variables available to all EJS templates without having to pass
 * them individually from each route handler
 */
app.use((req, res, next) => {
    // Make NODE_ENV available to all templates
    res.locals.NODE_ENV = NODE_ENV.toLowerCase() || 'production';

    // Continue to the next middleware or route handler
    next();
});

/**
 * Declare Routes
 */
/**
 * Routes
 */
app.get('/', (req, res) => {
    const title = 'Home Page';
    res.render('home', { title });
    //res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

app.get('/about', (req, res) => {
    const title = 'About Page';
    res.render('about', { title });
    //res.sendFile(path.join(__dirname, 'src/views/about.html'));
});

app.get('/products', (req, res) => {
    const title = 'Products Page';
    res.render('products', { title });
    //  res.sendFile(path.join(__dirname, 'src/views/products.html'));
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