// src/App.jsx
import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobeRings = () => {
  const globeEl = useRef();
  const [ringsData, setRingsData] = useState([]);
  const [htmlMarkers, setHtmlMarkers] = useState([]);
  // const [launches, setLaunches] = useState([]);

  useEffect(() => {
    // const N = 30;
    console.log("bam");
    fetch('https://fullyhacks2025-launchfootprint.onrender.com/launches')
        .then((res) => res.json())
        .then((data) => {
            // setLaunches(data);
            console.log(Object.keys(data))
            const launchData = data.map((launch) => ({
                    lat: launch.Latitude,
                    lng: launch.Longitude,
                    maxR: launch.Emissions > 1000000 ? 10 : 2,
                    propagationSpeed: 5,
                    repeatPeriod: Math.random() * 2000 + 1000,
                    color: launch.Emissions > 1000000 ?  '#ff0000' : '#adff2f'
                  
            }));

            setRingsData(launchData);

            const markerData = data.map((launch) => ({
              lat: launch.Latitude,
              lng: launch.Longitude,
              element: createMarkerElement(launch)
            }));
    
            setHtmlMarkers(markerData);
        })

    globeEl.current.controls().autoRotate = false;
    globeEl.current.controls().autoRotateSpeed = 0.5;
  }, []);

  const createMarkerElement = (launch) => {
    const container = document.createElement('div');
    container.className = 'html-marker-container';
  
    const marker = document.createElement('div');
    marker.className = 'html-marker-dot';
  
    const tooltip = document.createElement('div');
    tooltip.className = 'html-marker-tooltip';
    tooltip.innerHTML = `<b>${launch.RocketName || 'Launch'}</b><br>${launch.Emissions} CO₂e`;
  
    // Set initial tooltip visibility
    tooltip.style.opacity = '0';
  
    // Add hover logic directly on the container using inline events
    container.onmouseenter = () => {
      console.log('mouse enter');
      tooltip.style.opacity = '1';
    };
  
    container.onmouseleave = () => {
      console.log('mouse leave');
      tooltip.style.opacity = '0';
    };
  
    container.appendChild(marker);
    container.appendChild(tooltip);
  
    return container;
  };
  

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="#000000"
        ringsData={ringsData}
        ringColor={(d) => d.color}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        htmlElementsData={htmlMarkers}
        htmlLat={(d) => d.lat}
        htmlLng={(d) => d.lng}
        htmlElement={(d) => d.element}
      />
    </div>
  );
};

export default GlobeRings;

