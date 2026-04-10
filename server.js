const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Simple file-based database
const DB_FILE = 'database.json';

// Initialize database
function initDB() {
    if (!fs.existsSync(DB_FILE)) {
        const initialData = {
            orders: [],
            tenants: [],
            products: [],
            users: []
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    }
}

function readDB() {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

initDB();

// ============ ORDERS API ============

// Get all orders
app.get('/api/orders', (req, res) => {
    const db = readDB();
    res.json(db.orders);
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
    const db = readDB();
    const order = db.orders.find(o => o.orderNumber === req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});

// Create new order
app.post('/api/orders', (req, res) => {
    const db = readDB();
    const order = {
        orderNumber: 'ORD-' + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        ...req.body,
        status: 'processing'
    };
    db.orders.push(order);
    writeDB(db);
    res.status(201).json(order);
});

// Update order status
app.patch('/api/orders/:id', (req, res) => {
    const db = readDB();
    const orderIndex = db.orders.findIndex(o => o.orderNumber === req.params.id);
    if (orderIndex !== -1) {
        db.orders[orderIndex] = { ...db.orders[orderIndex], ...req.body };
        writeDB(db);
        res.json(db.orders[orderIndex]);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});

// ============ PRODUCTS API ============

// Get all products
app.get('/api/products', (req, res) => {
    const db = readDB();
    res.json(db.products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
    const db = readDB();
    const product = db.products.find(p => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Create new product
app.post('/api/products', (req, res) => {
    const db = readDB();
    const product = {
        id: 'PROD-' + Date.now(),
        createdAt: new Date().toISOString(),
        ...req.body
    };
    db.products.push(product);
    writeDB(db);
    res.status(201).json(product);
});

// Update product
app.put('/api/products/:id', (req, res) => {
    const db = readDB();
    const productIndex = db.products.findIndex(p => p.id === req.params.id);
    if (productIndex !== -1) {
        db.products[productIndex] = { ...db.products[productIndex], ...req.body };
        writeDB(db);
        res.json(db.products[productIndex]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
    const db = readDB();
    const productIndex = db.products.findIndex(p => p.id === req.params.id);
    if (productIndex !== -1) {
        db.products.splice(productIndex, 1);
        writeDB(db);
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// ============ TENANTS API ============

// Tenant login
app.post('/api/tenants/login', (req, res) => {
    const { email, password } = req.body;
    
    // Demo accounts
    const tenantAccounts = {
        'gucci@luxemall.com': { password: 'Gucci2026', storeName: 'Gucci', category: 'Luxury Fashion' },
        'nike@luxemall.com': { password: 'Nike2026', storeName: 'Nike', category: 'Sportswear' },
        'apple@luxemall.com': { password: 'Apple2026', storeName: 'Apple Store', category: 'Technology' },
        'zara@luxemall.com': { password: 'Zara2026', storeName: 'Zara', category: 'Contemporary Fashion' },
        'sephora@luxemall.com': { password: 'Sephora2026', storeName: 'Sephora', category: 'Beauty & Cosmetics' }
    };
    
    if (tenantAccounts[email] && tenantAccounts[email].password === password) {
        res.json({
            success: true,
            tenant: {
                email: email,
                storeName: tenantAccounts[email].storeName,
                category: tenantAccounts[email].category
            }
        });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

// Register tenant
app.post('/api/tenants/register', (req, res) => {
    const db = readDB();
    const tenant = {
        id: 'TENANT-' + Date.now(),
        createdAt: new Date().toISOString(),
        ...req.body
    };
    db.tenants.push(tenant);
    writeDB(db);
    res.status(201).json({ success: true, tenant });
});

// Get tenant orders
app.get('/api/tenants/:email/orders', (req, res) => {
    const db = readDB();
    // Filter orders that contain products from this tenant
    const tenantOrders = db.orders.filter(order => 
        order.items && order.items.some(item => item.brand === req.params.email)
    );
    res.json(tenantOrders);
});

// ============ ANALYTICS API ============

// Get dashboard stats
app.get('/api/analytics/stats', (req, res) => {
    const db = readDB();
    const stats = {
        totalOrders: db.orders.length,
        totalProducts: db.products.length,
        totalRevenue: db.orders.reduce((sum, order) => sum + (order.total || 0), 0),
        totalTenants: db.tenants.length
    };
    res.json(stats);
});

// ============ SERVE FRONTEND ============

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'INDEX.HTML'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Luxe Mall Backend Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});
