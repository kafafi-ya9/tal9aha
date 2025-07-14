document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const input = document.querySelector('input[type="text"]');
  const categorySelect = document.getElementById('categorySelect');
  const mapContainer = document.getElementById('map');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = input.value.trim();
    const category = categorySelect.value;

    // Skip if no search and no category
    if (!query && !category) return;

    // Fetch products with both query and category
    const res = await fetch(`/api/products?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
    const data = await res.json();

    mapContainer.innerHTML = ''; // Clear previous map or messages

    if (data.length === 0) {
      mapContainer.innerHTML = '<p>🚫 لم يتم العثور على منتجات.</p>';
      return;
    }

    // Initialize map
    const map = L.map('map').setView([36.8, 10.17], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Show markers for each result
    data.forEach(entry => {
      const { product, shop } = entry;
      const marker = L.marker([shop.lat, shop.lng]).addTo(map);

      const popupContent = `
        <strong>${product.name}</strong><br>
        ${product.description}<br>
        <strong>💰 السعر:</strong> ${product.price}<br>
        <strong>🏪 المتجر:</strong> ${shop.name}<br>
        <strong>📞 الهاتف:</strong> ${shop.phone}<br>
        <img src="${shop.images[0]}" width="100%" style="margin-top:10px; border-radius: 8px;">
      `;
      marker.bindPopup(popupContent);
    });
  });
});
