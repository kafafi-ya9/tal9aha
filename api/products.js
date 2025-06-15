// api/products.js
export default function handler(req, res) {
  const query = req.query.q?.toLowerCase();
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

  if (!query) return res.status(200).json([]);

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

  res.status(200).json(results);
}
