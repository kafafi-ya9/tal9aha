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
        category: 'bicycles',
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
        category: 'produits de nettoyage',
        price: '10 DT',
        image: '/images/superdegraissant.jpg'
      },
      {
        name:'gel machine سائل غسيل',
        description:'gel machine automatique SUPER ANTI-TACHES 3L سائل غسيل بالآلة',
        category:'produits de nettoyage',
        price: 'el bahja:12.5 DT ,magic marseille:13.5 ,magic ocean:12.5 ,noir,amigo:14.5 ,gold,light:16.5',
        image: '/images/gelmachineautomatiquesuper.jpg'
      },
      {
        name:'huile essentielle زيوت',
        description:'huile essentielle doux زيوت',
        category:'produits de nettoyage',
        price: '7 DT',
        image: '/images/huileessentielledoux.jpg'
      },
      {
        name:'huile essentielle زيوت',
        description:'huile essentielle golden زيوت',
        category:'produits de nettoyage',
        price: '7 DT',
        image: '/images/huileessentiellegolden.jpg'
      },
      {
        name:'huile essentielle زيوت',
        description:'huile essentielle dangerous زيوت',
        category:'produits de nettoyage',
        price: '7 DT',
        image: '/images/huileessentielledangerous.jpg'
      },
      {
        name:'huile essentielle زيوت',
        description:'huile essentielle madame زيوت',
        category:'produits de nettoyage',
        price: '7 DT',
        image: '/images/huileessentiellemadame.jpg'
      },
      {
        name:'parfum de linge معطر',
        description:'parfum de linge معطر مركز للثياب',
        category:'produits de nettoyage',
        price: '5 DT',
        image: '/images/parfumdelinge.jpg'
      },
      {
        name:'parfum de linge معطر',
        description:'parfum de linge معطر مركز للثياب',
        category:'produits de nettoyage',
        price: '5 DT',
        image: '/images/parfumdelinge.jpg'
      },
      {
        name:'gel lavant سائل غسيل',
        description:'gel lavant mains corps et visage  سائل غسيل',
        category:'produits de nettoyage',
        price: '4.5 DT',
        image: '/images/gellavant.jpg'
      },
      {
        name:'lave sol منظف ارضيات',
        description:'lave sol parfums et brillance 900 mL منظف ارضيات',
        category:'produits de nettoyage',
        price: '5 DT',
        image: '/images/lavesol.jpg'
      },
      {
        name:'liquide vaisselle سائل غسيل',
        description:'liquide vaisselle سائل غسيل',
        category:'produits de nettoyage',
        price: '580mL:3.9 DT ,3L:14.5 DT',
        image: '/images/liquidevaisselle.jpg'
      },
      {
        name:'fresh linge معطر ثياب بعد الغسيل',
        description:'fresh linge 250mL معطر ثياب بعد الغسيل',
        category:'produits de nettoyage',
        price: '6.5 DT',
        image: '/images/freshlinge.jpg'
      },
      {
        name:'parfum concentre معطر مركز',
        description:'parfum concentre pour toutes les surfaces 580mL معطر مركز',
        category:'produits de nettoyage',
        price: '9 DT',
        image: '/images/parfumconcentre.jpg'
      },   
      {
        name:'air fresh معطر جو',
        description:'air fresh 250mL معطر جو',
        category:'produits de nettoyage',
        price: '4 DT',
        image: '/images/airfresh.jpg'
      }, 
      {
        name:'nettoyant multi usages منظف',
        description:'nettoyant multi usages منظف',
        category:'produits de nettoyage',
        price: '8.5 DT',
        image: '/images/nettoyantmultiusages.jpg'
      },
      {
        name:'brillant sol ملمع ارضيات',
        description:'brillant sol brillance et parfum ملمع ارضيات',
        category:'produits de nettoyage',
        price: '5 DT',
        image: '/images/brillantsol.jpg'
      },
      {
        name:'nettoyant salle de bain منظف الحمام',
        description:'nettoyant salle de bain 1L منظف الحمام',
        category:'produits de nettoyage',
        price: '11 DT',
        image: '/images/nettoyantsalledebain.jpg'
      },
      {
        name:'deboucheur granules',
        description:'deboucheur granules',
        category:'produits de nettoyage',
        price: '4.3 DT',
        image: '/images/deboucheurgranules.jpg'
      },
      {
        name:'orient sol',
        description:'orient sol brillance et parfum',
        category:'produits de nettoyage',
        price: '5 DT',
        image: '/images/orientsol.jpg'
      }, 
      {
        name:'orient sol',
        description:'orient sol brillance et parfum',
        category:'produits de nettoyage',
        price: '5 DT',
        image: '/images/orientsol.jpg'
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


