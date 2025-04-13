// src/App.jsx
import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobeRings = () => {
  const globeEl = useRef();
  const [ringsData, setRingsData] = useState([]);
  // const [launches, setLaunches] = useState([]);

  useEffect(() => {
    // const N = 30;
    fetch('http://10.67.125.232:6969/launches')
        .then((res) => res.json())
        .then((data) => {
            // setLaunches(data);
            console.log(Object.keys(data))
            const launchData = data.map((launch) => ({
                    lat: launch.Latitude,
                    lng: launch.Longitude,
                    maxR: 30,
                    propagationSpeed: 5,
                    repeatPeriod: Math.random() * 2000 + 1000
            }));

            setRingsData(launchData);
        })

    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
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

