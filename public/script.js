document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const input = document.querySelector('input[type="text"]');
  const categorySelect = document.getElementById('categorySelect');

  // ✅ Initialize the map once, outside the event
  const map = L.map('map').setView([36.8, 10.17], 11);

  // ✅ Use satellite tiles (Esri)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Earthstar Geographics'
  }).addTo(map);

  let currentMarkers = [];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = input.value.trim();
    const category = categorySelect.value;
    
    console.log("Search for:", query);

    if (!query && !category) return;

    const res = await fetch(`/api/products?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
    const data = await res.json();

    // ✅ Remove old markers from map
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];

    if (data.length === 0) {
      alert("🚫 لم يتم العثور على منتجات.");
      return;
    }

    data.forEach(entry => {
      const { product, shop } = entry;
      const marker = L.marker([shop.lat, shop.lng]).addTo(map);
      currentMarkers.push(marker); // Keep track of markers

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

    // Zoom to first result
    const { shop } = data[0];
    map.setView([shop.lat, shop.lng], 14);
  });
});


