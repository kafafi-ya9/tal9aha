const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample data
const shops = [
  {
    id: 1,
    name: 'Hamma',
    phone: '+21612345678',
    lat: 36.5962299,
    lng: 10.4900571,
    images: ['hamma1.jpg', 'hamma2.jpg'],
    products: [
      {
        name: 'دراجة',
        description: 'دراجة هوائية جبلية',
        price: '800 DT',
        image: 'bike.jpg'
      }
    ]
  }
];

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoints
app.get('/api/shops', (req, res) => {
  res.json(shops);
});

app.get('/api/products', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.json([]);

  const results = [];

  for (const shop of shops) {
    for (const product of shop.products) {
      if (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      ) {
        results.push({
          product,
          shop: {
            name: shop.name,
            phone: shop.phone,
            lat: shop.lat,
            lng: shop.lng,
            images: shop.images
          }
        });
      }
    }
  }

  res.json(results);
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


