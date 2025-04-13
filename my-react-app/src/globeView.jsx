import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Globe from 'https://esm.sh/react-globe.gl?external=react';

const markerSvg = `<svg viewBox="-4 0 36 36">
  <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
  <circle fill="black" cx="14" cy="14" r="7"></circle>
</svg>`;

const GlobeView = () => {
  useEffect(() => {
    const gData = [...Array(30).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: 7 + Math.random() * 30,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));

    createRoot(document.getElementById('globeViz')).render(
      <Globe
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
        htmlElementsData={gData}
        htmlElement={(d) => {
          const el = document.createElement('div');
          el.innerHTML = markerSvg;
          el.style.color = d.color;
          el.style.width = `${d.size}px`;
          el.style.transition = 'opacity 250ms';
          el.style['pointer-events'] = 'auto';
          el.style.cursor = 'pointer';
          el.onclick = () => console.info(d);
          return el;
        }}
        htmlElementVisibilityModifier={(el, isVisible) =>
          (el.style.opacity = isVisible ? 1 : 0)
        }
      />
    );
  }, []);

  return <div id="globeViz" style={{ width: '100%', height: '100vh' }}></div>;
};

export default GlobeView;
