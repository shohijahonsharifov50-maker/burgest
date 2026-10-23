import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/** Round red badge with a fork-and-knife glyph, plus a thin stem pointing at the exact spot. */
const PIN_SVG = `
<svg width="40" height="56" viewBox="0 0 40 56" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.3 40.5 L20 53 L21.7 40.5 Z" fill="#E3261C"/>
  <circle cx="20" cy="53" r="1.6" fill="#E3261C"/>
  <circle cx="20" cy="19" r="18.5" fill="#E3261C" stroke="#fff" stroke-width="2.5"/>
  <g transform="translate(10.5,9.5) scale(0.78)" fill="#fff">
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
  </g>
</svg>`;

const pinIcon = L.divIcon({
  className: 'map-pin',
  html: PIN_SVG,
  iconSize: [40, 56],
  iconAnchor: [20, 55],
  tooltipAnchor: [20, -40],
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

    // Voyager basemap (no labels): same road/park colors as OSM but without other businesses' names.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
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
