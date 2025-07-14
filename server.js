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
        category: 'رياضة',
        price: '800 DT',
        image: 'bike.jpg'
      }
    ]
  },
  { id: 2,
    name: 'الأمين',
    phone: '+216 54996952',
    lat: 36.591400,
    lng: 10.504000,
    images: ['hamma1.jpg', 'hamma2.jpg'],
    products: [
      {
        name: 'degraissant مزيل دهون',
        description:' 1L degraissant super eclat et brillance مزيل الدهون',
        category: 'مواد تنظيف',
        price: '10 DT',
        image: 'WhatsApp Image 2025-07-08 at 18.31.25.jpeg'
      },
      {
        name:'gel machine سائل غسيل',
        description:'gel machine automatique SUPER ANTI-TACHES 3L سائل غسيل بالآلة',
        category: 'مواد تنظيف',
        price: '12.5 DT',
        image: ''
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
  const query = (req.query.q || '').toLowerCase().trim();
  const categoryFilter = (req.query.category || '').toLowerCase().trim();

  const results = [];

  for (const shop of shops) {
    for (const product of shop.products) {
      const text = `${product.name} ${product.description}`.toLowerCase();
      const matchesQuery = query
        .split(/\s+/)
        .every(word => text.includes(word));

      const matchesCategory = !categoryFilter || (product.category && product.category.toLowerCase() === categoryFilter);

      if (matchesQuery && matchesCategory) {
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


