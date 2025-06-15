export default function handler(req, res) {
  const { q } = req.query;

  const allProducts = [
    {
      name: 'دراجة',
      price: '300 TND',
      shop: {
        name: 'Shop A',
        phone: '12345678',
        location: [36.4897, 10.1010]
      },
      image: '/bike.jpg'
    },
    {
      name: 'دراجة',
      price: '280 TND',
      shop: {
        name: 'Shop B',
        phone: '98765432',
        location: [36.4877, 10.1025]
      },
      image: '/bike.jpg'
    }
  ];

  const filtered = allProducts.filter(p => p.name.includes(q));
  res.status(200).json(filtered);
}
