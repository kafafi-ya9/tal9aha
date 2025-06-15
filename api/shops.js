// api/shops.js

export default function handler(req, res) {
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

  res.status(200).json(shops);
}
