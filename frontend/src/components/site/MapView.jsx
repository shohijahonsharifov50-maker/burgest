import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PIN_SVG = `
<svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 0C7.6 0 0 7.6 0 17c0 12.4 17 27 17 27s17-14.6 17-27C34 7.6 26.4 0 17 0z" fill="#E3261C"/>
  <circle cx="17" cy="17" r="7.5" fill="#fff"/>
</svg>`;

const pinIcon = L.divIcon({
  className: 'map-pin',
  html: PIN_SVG,
  iconSize: [34, 44],
  iconAnchor: [17, 44],
  tooltipAnchor: [17, -30],
});

/** OSM-based map styled like a POI card: red pin + white name/rating pill. No API key needed. */
export function MapView({ lat, lng, zoom = 17, name = 'Burgesta', rating = '4.8', category = 'Restoran' }) {
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;
    const map = L.map(elRef.current, {
      center: [lat, lng],
      zoom,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    map.attributionControl.setPosition('bottomleft');

    L.marker([lat, lng], { icon: pinIcon })
      .addTo(map)
      .bindTooltip(
        `<div class="map-pill">
           <div class="map-pill__title">${name} <span class="map-pill__star">★</span>${rating}</div>
           <div class="map-pill__sub">${category}</div>
         </div>`,
        { permanent: true, direction: 'right', offset: [10, -34], className: 'map-pill-wrap', interactive: false },
      )
      .openTooltip();

    return () => map.remove();
  }, [lat, lng, zoom, name, rating, category]);

  return <div ref={elRef} className="map-canvas" />;
}
