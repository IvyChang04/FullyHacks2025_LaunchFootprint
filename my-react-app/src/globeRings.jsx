// src/App.jsx
import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobeRings = () => {
  const globeEl = useRef();
  const [ringsData, setRingsData] = useState([]);

  useEffect(() => {
    // const N = 30;
    fetch()
        .then((res) => res.json())
        .then((data) => {
            setRingsData([...Array(N).keys()].map(() => ({
                    lat: data.latitude,
                    lng: data.longitude,
                    maxR: 30,
                    propagationSpeed: 5,
                    repeatPeriod: Math.random() * 2000 + 1000
                })))
        })
    // const rings = [...Array(N).keys()].map(() => ({
    //   lat: (Math.random() - 0.5) * 180,
    //   lng: (Math.random() - 0.5) * 360,
    //   maxR: Math.random() * 20 + 5,
    //   propagationSpeed: Math.random() * 2 + 0.5,
    //   repeatPeriod: Math.random() * 2000 + 1000
    // }));

    // setRingsData(rings);

    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="#000000"
        ringsData={ringsData}
        ringColor={() => ['#ff5733', '#33ff99', '#3385ff'][Math.floor(Math.random() * 3)]}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      />
    </div>
  );
};

export default GlobeRings;

