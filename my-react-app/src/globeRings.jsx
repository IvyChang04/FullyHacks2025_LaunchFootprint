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

    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
  }, []);

  const createMarkerElement = (launch) => {
    const el = document.createElement('div');
    el.className = 'html-marker';
    el.style.color = '#fff';
    el.style.background = 'rgba(0,0,0,0.6)';
    el.style.padding = '4px 8px';
    el.style.borderRadius = '4px';
    el.style.whiteSpace = 'nowrap';
    el.style.fontSize = '10px';
    el.innerHTML = `<b>${launch.RocketName || 'Launch'}</b><br>${launch.Emissions} CO₂e`;
    return el;
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

