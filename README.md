# Luxe Mall - Full Stack E-Commerce Website

A professional luxury mall website with complete frontend and backend functionality.

## Features

### Frontend
- 🛍️ Product catalog with 39+ premium brands
- 🛒 Shopping cart with real-time updates
- 💳 Complete checkout process (3 steps)
- 📦 Order history and tracking
- 🏪 Tenant login and dashboard
- 📊 Analytics and inventory management
- ⭐ Favorites and wishlist
- 🔍 Search and filter functionality
- 📱 Fully responsive design

### Backend
- 🔌 RESTful API with Express.js
- 💾 File-based database (JSON)
- 🔐 Tenant authentication
- 📦 Order management
- 🛍️ Product CRUD operations
- 📊 Analytics endpoints
- 🔄 Real-time data sync

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
```

3. **For development (with auto-reload):**
```bash
npm run dev
```

4. **Open your browser:**
```
http://localhost:3000
```

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Tenants
- `POST /api/tenants/login` - Tenant login
- `POST /api/tenants/register` - Register new tenant
- `GET /api/tenants/:email/orders` - Get tenant orders

### Analytics
- `GET /api/analytics/stats` - Get dashboard statistics

## Tenant Login Credentials

Use these demo accounts to access the tenant dashboard:

| Brand | Email | Password |
|-------|-------|----------|
| Gucci | gucci@luxemall.com | Gucci2026 |
| Nike | nike@luxemall.com | Nike2026 |
| Apple | apple@luxemall.com | Apple2026 |
| Zara | zara@luxemall.com | Zara2026 |
| Sephora | sephora@luxemall.com | Sephora2026 |

## Deployment

### Deploy to Heroku

1. Create a Heroku account
2. Install Heroku CLI
3. Run:
```bash
heroku create luxe-mall
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Railway

1. Go to https://railway.app
2. Click "New Project"
3. Connect your GitHub repo
4. Deploy automatically

## Database

The backend uses a simple JSON file (`database.json`) for data storage. For production, consider upgrading to:
- MongoDB
- PostgreSQL
- MySQL
- Firebase

## Project Structure

```
luxe-mall/
├── INDEX.HTML          # Frontend (single page)
├── server.js           # Backend server
├── package.json        # Dependencies
├── database.json       # Data storage (auto-generated)
└── README.md          # Documentation
```

## Technologies Used

### Frontend
- HTML5
- CSS3 (Custom styling)
- Vanilla JavaScript
- Google Fonts (Playfair Display, Montserrat)

### Backend
- Node.js
- Express.js
- CORS
- File System (fs)

## Features in Detail

### Shopping Cart
- Add/remove items
- Update quantities
- Real-time price calculation
- Persistent storage

### Checkout Process
1. Shipping information
2. Payment details
3. Order review
4. Confirmation

### Tenant Dashboard
- Sales statistics
- Order management
- Inventory tracking
- Product management
- Analytics

### Order Management
- View order history
- Track order status
- Reorder functionality
- Order details

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
MIT License - feel free to use for personal or commercial projects

## Support
For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for Luxe Mall
