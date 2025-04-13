// src/App.jsx
import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

const GlobeRings = () => {
    const globeEl = useRef();
    const [ringsData, setRingsData] = useState([]);
    // const [launches, setLaunches] = useState([]);

    useEffect(() => {
        // const N = 30;
        const emissionLevels = (emission) => {
            const value = parseInt(emission);
            if (value > 2000000) return 15;
                else if (value > 1000000) return 12;
                    else if (value > 400000) return 6;
                        else if (value > 100000) return 4;
                            else return 1;
        };

        const emissionColors = (emission) => {
            const value = parseInt(emission);
            if (value > 2000000) return "#8b0000";
                else if (value > 1000000) return "#ffd700";
                    else if (value > 400000) return "#1e90ff";
                        else if (value > 100000) return "#008000";
                            else return "#adff2f";
        };
        fetch("https://fullyhacks2025-launchfootprint.onrender.com/launches")
            .then((res) => res.json())
            .then((data) => {
                // setLaunches(data);
                console.log(Object.keys(data));
                const launchData = data.map((launch) => ({
                    lat: launch.Latitude,
                    lng: launch.Longitude,
                    maxR: parseInt(emissionLevels(launch.Emissions)),
                    propagationSpeed: 0,
                    repeatPeriod: Math.random() * 2000 + 1000,
                    color: emissionColors(launch.Emissions),
                }));

                setRingsData(launchData);
            });
        globeEl.current.controls().autoRotate = false;
        globeEl.current.controls().autoRotateSpeed = 0.5;
    }, []);

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                showAtmosphere={true}
                atmosphereColor="#3a9bdc"
                atmosphereAltitude={0.25}
                ringsData={ringsData}
                ringColor={(d) => d.color}
                ringMaxRadius="maxR"
                ringPropagationSpeed="propagationSpeed"
                ringRepeatPeriod="repeatPeriod"
            />
        </div>
    );
};

export default GlobeRings;
