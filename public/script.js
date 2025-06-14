document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const input = document.querySelector('input[type="text"]');
  const mapContainer = document.getElementById('map');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) return;

    const res = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    mapContainer.innerHTML = ''; // Clear old map

    if (data.length === 0) {
      mapContainer.innerHTML = '<p>No products found.</p>';
      return;
    }

    const map = L.map('map').setView([36.8, 10.17], 11); // Adjust default location
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    data.forEach(entry => {
      const { product, shop } = entry;
      const marker = L.marker([shop.lat, shop.lng]).addTo(map);

      const popupContent = `
        <strong>${product.name}</strong><br>
        ${product.description}<br>
        <strong>Price:</strong> ${product.price}<br>
        <strong>Shop:</strong> ${shop.name}<br>
        <strong>Phone:</strong> ${shop.phone}<br>
        <img src="${shop.images[0]}" width="100%">
      `;
      marker.bindPopup(popupContent);
    });
  });
});
