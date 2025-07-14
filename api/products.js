export default function handler(req, res) {
  const shops = [/* your sample data */];
  const query = req.query.q?.toLowerCase();
  const results = [];

  for (const shop of shops) {
    for (const product of shop.products) {
      if (product.name.toLowerCase().includes(query)) {
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

