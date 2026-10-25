
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls, Stars, Html } from '@react-three/drei';
// import * as THREE from 'three';
// import {
//   Orbit,
//   RotateCcw,
//   ZoomIn,
//   Sparkles,
//   Play,
//   Pause,
//   Gauge,
//   GitCompareArrows,
//   X,
//   Focus,
//   Sun as SunIcon,
// } from 'lucide-react';

// const planets = [
//   {
//     name: 'Mercury', color: '#a9a9a9', size: 0.22, distance: 2.2,
//     speed: 1.6, diameter: 4879, sunDistance: 57.9,
//     day: '58.6 Earth days', year: '88 Earth days',
//     description: 'The smallest planet and the closest planet to the Sun.',
//   },
//   {
//     name: 'Venus', color: '#e6bd87', size: 0.34, distance: 3.3,
//     speed: 1.15, diameter: 12104, sunDistance: 108.2,
//     day: '243 Earth days', year: '225 Earth days',
//     description: 'A rocky world with a thick atmosphere and extreme surface heat.',
//   },
//   {
//     name: 'Earth', color: '#438bff', size: 0.38, distance: 4.5,
//     speed: 0.85, diameter: 12742, sunDistance: 149.6,
//     day: '24 hours', year: '365.25 days',
//     description: 'Our home planet, with liquid water on its surface and known life.',
//   },
//   {
//     name: 'Mars', color: '#e76f51', size: 0.29, distance: 5.7,
//     speed: 0.68, diameter: 6779, sunDistance: 227.9,
//     day: '24.6 hours', year: '687 Earth days',
//     description: 'The Red Planet, known for its dusty surface and enormous volcanoes.',
//   },
//   {
//     name: 'Jupiter', color: '#d8b18b', size: 0.75, distance: 7.6,
//     speed: 0.38, diameter: 139820, sunDistance: 778.6,
//     day: '9.9 hours', year: '11.86 Earth years',
//     description: 'The largest planet, with powerful storms and many moons.',
//   },
//   {
//     name: 'Saturn', color: '#e8d29a', size: 0.64, distance: 9.8,
//     speed: 0.27, diameter: 116460, sunDistance: 1430,
//     day: '10.7 hours', year: '29.4 Earth years',
//     description: 'A gas giant famous for its spectacular rings.',
//   },
//   {
//     name: 'Uranus', color: '#85d8df', size: 0.47, distance: 11.7,
//     speed: 0.19, diameter: 50724, sunDistance: 2870,
//     day: '17.2 hours', year: '84 Earth years',
//     description: 'An ice giant that rotates on an unusually tilted axis.',
//   },
//   {
//     name: 'Neptune', color: '#4169e1', size: 0.46, distance: 13.5,
//     speed: 0.14, diameter: 49244, sunDistance: 4500,
//     day: '16.1 hours', year: '165 Earth years',
//     description: 'A distant ice giant with extremely fast winds.',
//   },
// ];

// function OrbitPath({ radius }) {
//   const geometry = useMemo(() => {
//     const curve = new THREE.EllipseCurve(
//       0, 0, radius, radius, 0, Math.PI * 2, false, 0
//     );

//     const points = curve.getPoints(180).map(
//       (point) => new THREE.Vector3(point.x, 0, point.y)
//     );

//     return new THREE.BufferGeometry().setFromPoints(points);
//   }, [radius]);

//   useEffect(() => () => geometry.dispose(), [geometry]);

//   return (
//     <line geometry={geometry}>
//       <lineBasicMaterial
//         color="#777da7"
//         transparent
//         opacity={0.28}
//       />
//     </line>
//   );
// }

// function Sun() {
//   const sunRef = useRef();

//   useFrame((_, delta) => {
//     if (sunRef.current) sunRef.current.rotation.y += delta * 0.12;
//   });

//   return (
//     <group>
//       <mesh ref={sunRef}>
//         <sphereGeometry args={[1.05, 48, 48]} />
//         <meshBasicMaterial color="#ffb84d" />
//       </mesh>

//       <mesh>
//         <sphereGeometry args={[1.25, 32, 32]} />
//         <meshBasicMaterial
//           color="#ff8c32"
//           transparent
//           opacity={0.12}
//           depthWrite={false}
//         />
//       </mesh>

//       <pointLight
//         color="#ffd08a"
//         intensity={100}
//         distance={40}
//         decay={2}
//       />
//     </group>
//   );
// }

// function Planet({
//   planet,
//   selected,
//   onSelect,
//   paused,
//   simulationSpeed,
// }) {
//   const groupRef = useRef();
//   const meshRef = useRef();

//   useFrame((_, delta) => {
//     if (!paused && groupRef.current) {
//       groupRef.current.rotation.y +=
//         delta * planet.speed * 0.12 * simulationSpeed;
//     }

//     if (meshRef.current && !paused) {
//       meshRef.current.rotation.y += delta * 0.35 * simulationSpeed;
//     }
//   });

//   return (
//     <group>
//       <OrbitPath radius={planet.distance} />

//       <group ref={groupRef}>
//         <group position={[planet.distance, 0, 0]}>
//           <mesh
//             ref={meshRef}
//             onClick={(event) => {
//               event.stopPropagation();
//               onSelect(planet);
//             }}
//           >
//             <sphereGeometry args={[planet.size, 40, 40]} />
//             <meshStandardMaterial
//               color={planet.color}
//               roughness={0.78}
//               emissive={selected ? planet.color : '#000000'}
//               emissiveIntensity={selected ? 0.25 : 0}
//             />
//           </mesh>

//           {planet.name === 'Saturn' && (
//             <mesh rotation={[Math.PI / 2.5, 0, 0]}>
//               <ringGeometry
//                 args={[planet.size * 1.25, planet.size * 1.9, 80]}
//               />
//               <meshStandardMaterial
//                 color="#d9c49b"
//                 side={THREE.DoubleSide}
//                 transparent
//                 opacity={0.8}
//               />
//             </mesh>
//           )}

//           <Html
//             distanceFactor={18}
//             position={[0, planet.size + 0.3, 0]}
//             center
//           >
//             <button
//               type="button"
//               onClick={(event) => {
//                 event.stopPropagation();
//                 onSelect(planet);
//               }}
//               style={{
//                 color: selected ? '#ffffff' : '#b9bfd8',
//                 background: selected
//                   ? 'rgba(94,82,170,.9)'
//                   : 'rgba(9,12,30,.8)',
//                 border: `1px solid ${
//                   selected ? planet.color : 'rgba(180,180,220,.25)'
//                 }`,
//                 borderRadius: 20,
//                 padding: '5px 9px',
//                 fontSize: 10,
//                 cursor: 'pointer',
//                 whiteSpace: 'nowrap',
//               }}
//             >
//               {planet.name}
//             </button>
//           </Html>
//         </group>
//       </group>
//     </group>
//   );
// }

// function CameraFocus({ focusPlanet, controlsRef }) {
//   const { camera } = useThree();
//   const destination = useRef(null);

//   useEffect(() => {
//     if (focusPlanet === 'Sun') {
//       destination.current = {
//         position: new THREE.Vector3(0, 5, 8),
//         target: new THREE.Vector3(0, 0, 0),
//       };
//     } else if (focusPlanet) {
//       const planet = planets.find((item) => item.name === focusPlanet);

//       if (planet) {
//         destination.current = {
//           position: new THREE.Vector3(
//             planet.distance + 3,
//             3.5,
//             planet.distance + 5
//           ),
//           target: new THREE.Vector3(planet.distance, 0, 0),
//         };
//       }
//     }
//   }, [focusPlanet, camera]);

//   useFrame(() => {
//     const destinationValue = destination.current;
//     const controls = controlsRef.current;

//     if (!destinationValue || !controls) return;

//     camera.position.lerp(destinationValue.position, 0.045);
//     controls.target.lerp(destinationValue.target, 0.045);
//     controls.update();

//     if (
//       camera.position.distanceTo(destinationValue.position) < 0.06 &&
//       controls.target.distanceTo(destinationValue.target) < 0.06
//     ) {
//       destination.current = null;
//     }
//   });

//   return null;
// }

// function SolarScene({
//   selected,
//   onSelect,
//   paused,
//   simulationSpeed,
//   focusPlanet,
//   controlsRef,
// }) {
//   return (
//     <Canvas
//       camera={{ position: [0, 15, 21], fov: 48 }}
//       dpr={[1, 1.5]}
//       onPointerMissed={() => {}}
//     >
//       <color attach="background" args={['#050713']} />
//       <ambientLight intensity={0.65} />
//       <Stars
//         radius={90}
//         depth={50}
//         count={2500}
//         factor={4}
//         fade
//         speed={paused ? 0 : 0.5}
//       />

//       <Sun />

//       {planets.map((planet) => (
//         <Planet
//           key={planet.name}
//           planet={planet}
//           selected={selected?.name === planet.name}
//           onSelect={onSelect}
//           paused={paused}
//           simulationSpeed={simulationSpeed}
//         />
//       ))}

//       <CameraFocus
//         focusPlanet={focusPlanet}
//         controlsRef={controlsRef}
//       />

//       <OrbitControls
//         ref={controlsRef}
//         enablePan
//         enableZoom
//         minDistance={3}
//         maxDistance={42}
//         minPolarAngle={0.15}
//         maxPolarAngle={Math.PI / 2}
//         autoRotate={false}
//       />
//     </Canvas>
//   );
// }

// function formatDistance(millionsKm) {
//   if (millionsKm >= 1000) {
//     return `${(millionsKm / 1000).toFixed(2)} billion km`;
//   }

//   return `${millionsKm.toFixed(1)} million km`;
// }

// export default function SolarSystem() {
//   const [selected, setSelected] = useState(planets[2]);
//   const [paused, setPaused] = useState(false);
//   const [simulationSpeed, setSimulationSpeed] = useState(1);
//   const [compareMode, setCompareMode] = useState(false);
//   const [comparePlanet, setComparePlanet] = useState(planets[3]);
//   const [focusPlanet, setFocusPlanet] = useState(null);
//   const controlsRef = useRef();

//   function resetView() {
//     setFocusPlanet(null);

//     const controls = controlsRef.current;

//     if (controls) {
//       controls.target.set(0, 0, 0);
//       controls.object.position.set(0, 15, 21);
//       controls.update();
//     }
//   }

//   function focusOn(name) {
//     setFocusPlanet(name);
//   }

//   const secondPlanet =
//     comparePlanet.name === selected.name
//       ? planets.find((planet) => planet.name !== selected.name)
//       : comparePlanet;

//   const comparisonRows = [
//     {
//       label: 'Diameter',
//       valueA: `${selected.diameter.toLocaleString()} km`,
//       valueB: `${secondPlanet.diameter.toLocaleString()} km`,
//     },
//     {
//       label: 'Distance from Sun',
//       valueA: formatDistance(selected.sunDistance),
//       valueB: formatDistance(secondPlanet.sunDistance),
//     },
//     {
//       label: 'Rotation period',
//       valueA: selected.day,
//       valueB: secondPlanet.day,
//     },
//     {
//       label: 'Orbital period',
//       valueA: selected.year,
//       valueB: secondPlanet.year,
//     },
//   ];

//   return (
//     <main className="solar-page">
//       <style>{`
//         .solar-page {
//           max-width: 1600px;
//           margin: 0 auto;
//           padding: clamp(20px, 4vw, 56px);
//           color: #f3f3ff;
//           font-family: inherit;
//         }
//         .solar-header { max-width: 760px; margin-bottom: 30px; }
//         .solar-tagline { color: #c0a7ff; font-style: italic; font-size: 15px; }
//         .solar-eyebrow { color: #9993c9; letter-spacing: 2px; font-size: 10px; font-weight: 700; }
//         .solar-title { font-family: Cinzel, serif; font-size: clamp(42px, 6vw, 76px); letter-spacing: -2px; line-height: 1.08; margin: 12px 0; font-weight: 500; }
//         .solar-accent { color: #aa94ff; }
//         .solar-subtitle { color: #a7abc4; line-height: 1.8; max-width: 590px; font-size: 14px; }
//         .solar-workspace { display: grid; grid-template-columns: minmax(0,1fr) minmax(260px,320px); gap: 18px; align-items: stretch; }
//         .solar-scene-panel, .solar-info-panel, .solar-compare-panel { min-width: 0; border: 1px solid rgba(160,160,200,.2); border-radius: 18px; background: rgba(12,14,34,.85); overflow: hidden; }
//         .solar-scene-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; padding: 14px 18px; border-bottom: 1px solid rgba(160,160,200,.14); color: #b8b7d5; font-size: 10px; letter-spacing: 1px; }
//         .solar-scene-top span, .solar-hint span { display: inline-flex; align-items: center; gap: 7px; }
//         .solar-status-dot { width: 6px; height: 6px; background: #64e2c2; border-radius: 50%; display: inline-block; }
//         .solar-canvas { height: min(62vh,600px); min-height: 380px; cursor: grab; }
//         .solar-canvas:active { cursor: grabbing; }
//         .solar-hint { display: flex; flex-wrap: wrap; gap: 16px; padding: 14px 18px; color: #8589aa; font-size: 11px; border-top: 1px solid rgba(160,160,200,.14); }
//         .solar-controls { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 16px; border-top: 1px solid rgba(160,160,200,.1); }
//         .solar-control-button, .solar-action-button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid rgba(160,160,200,.2); border-radius: 9px; padding: 9px 12px; color: #e7e7f5; background: rgba(255,255,255,.035); cursor: pointer; font: inherit; font-size: 11px; }
//         .solar-control-button:hover, .solar-action-button:hover { border-color: #aa94ff; }
//         .solar-speed-control { display: flex; align-items: center; gap: 9px; margin-left: auto; color: #a7abc4; font-size: 11px; }
//         .solar-speed-control select, .solar-compare-select { background: #11142b; border: 1px solid rgba(160,160,200,.25); border-radius: 8px; color: #f3f3ff; padding: 8px; font: inherit; font-size: 11px; }
//         .solar-info-panel { padding: 22px; }
//         .solar-planet-orb { width: 96px; height: 96px; border-radius: 50%; margin: 26px 0 22px; border: 1px solid rgba(255,255,255,.12); }
//         .solar-planet-index { color: #8589aa; font-size: 10px; letter-spacing: 1.5px; }
//         .solar-planet-title { font-family: Cinzel, serif; font-size: 31px; margin: 8px 0 12px; font-weight: 500; }
//         .solar-description { color: #a7abc4; font-size: 13px; line-height: 1.7; }
//         .solar-facts { margin-top: 20px; border-top: 1px solid rgba(160,160,200,.16); }
//         .solar-fact { display: flex; flex-direction: column; gap: 6px; padding: 13px 0; border-bottom: 1px solid rgba(160,160,200,.12); }
//         .solar-fact span { color: #8589aa; font-size: 11px; }
//         .solar-fact strong { font-size: 12px; font-weight: 500; }
//         .solar-footnote { color: #777d9d; font-size: 10px; line-height: 1.7; margin-top: 18px; }
//         .solar-selector { margin-top: 28px; }
//         .solar-planet-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
//         .solar-planet-button { display: inline-flex; align-items: center; gap: 8px; border: 1px solid; border-radius: 30px; padding: 10px 15px; color: #e7e7f5; cursor: pointer; font-size: 12px; }
//         .solar-planet-dot { width: 9px; height: 9px; border-radius: 50%; }
//         .solar-compare-panel { margin-top: 24px; padding: 22px; }
//         .solar-compare-heading { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
//         .solar-compare-title { font-family: Cinzel, serif; font-size: 23px; margin: 9px 0; font-weight: 500; }
//         .solar-compare-controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
//         .solar-compare-table-wrap { width: 100%; overflow-x: auto; margin-top: 18px; }
//         .solar-compare-table { width: 100%; border-collapse: collapse; min-width: 500px; font-size: 12px; text-align: left; }
//         .solar-compare-table th, .solar-compare-table td { padding: 13px 12px; border-bottom: 1px solid rgba(160,160,200,.12); }
//         .solar-compare-table th { color: #a7abc4; font-size: 10px; font-weight: 600; }
//         .solar-compare-table td:first-child { color: #8589aa; }
//         .solar-scale-note { color: #777d9d; font-size: 10px; line-height: 1.7; margin-top: 14px; }
//         @media (max-width: 900px) {
//           .solar-workspace { grid-template-columns: 1fr; }
//           .solar-info-panel { display: grid; grid-template-columns: 110px minmax(0,1fr); column-gap: 18px; }
//           .solar-info-panel > .solar-eyebrow { grid-column: 1 / -1; }
//           .solar-planet-orb { grid-row: span 3; margin: 18px 0; }
//           .solar-planet-index { align-self: end; }
//           .solar-planet-title { margin: 4px 0; }
//           .solar-description { grid-column: 2; margin-top: 0; }
//           .solar-facts, .solar-footnote { grid-column: 1 / -1; }
//         }
//         @media (max-width: 560px) {
//           .solar-page { padding: 20px 14px; }
//           .solar-canvas { height: 420px; min-height: 320px; }
//           .solar-info-panel { display: block; padding: 18px; }
//           .solar-planet-orb { margin: 22px 0; }
//           .solar-speed-control { margin-left: 0; width: 100%; }
//           .solar-speed-control select { flex: 1; }
//           .solar-compare-panel { padding: 16px; }
//         }
//       `}</style>

//       <header className="solar-header">
//         <p className="solar-tagline">A little perspective on our place in space</p>
//         <p className="solar-eyebrow">COSMIC ARCHIVE / EXPLORATION</p>
//         <h1 className="solar-title">
//           Solar <span className="solar-accent">System.</span>
//         </h1>
//         <p className="solar-subtitle">
//           Eight planets. One star. Countless things to discover.
//           Select a planet, explore its profile, and compare worlds.
//         </p>
//       </header>

//       <section className="solar-workspace">
//         <div className="solar-scene-panel">
//           <div className="solar-scene-top">
//             <span><Orbit size={14} /> SOLAR SYSTEM SIMULATION</span>
//             <span><span className="solar-status-dot" /> {paused ? 'SIMULATION PAUSED' : 'ANIMATED MODEL'}</span>
//           </div>

//           <div className="solar-canvas">
//             <SolarScene
//               selected={selected}
//               onSelect={setSelected}
//               paused={paused}
//               simulationSpeed={simulationSpeed}
//               focusPlanet={focusPlanet}
//               controlsRef={controlsRef}
//             />
//           </div>

//           <div className="solar-hint">
//             <span><RotateCcw size={13} /> Drag to rotate</span>
//             <span><ZoomIn size={13} /> Scroll to zoom</span>
//             <span><Sparkles size={13} /> Select a planet</span>
//           </div>

//           <div className="solar-controls">
//             <button
//               type="button"
//               className="solar-control-button"
//               onClick={() => setPaused((value) => !value)}
//             >
//               {paused ? <Play size={14} /> : <Pause size={14} />}
//               {paused ? 'Resume' : 'Pause'}
//             </button>

//             <button
//               type="button"
//               className="solar-control-button"
//               onClick={resetView}
//             >
//               <RotateCcw size={14} /> Reset view
//             </button>

//             <div className="solar-speed-control">
//               <Gauge size={14} />
//               <label htmlFor="solar-speed">Simulation speed</label>
//               <select
//                 id="solar-speed"
//                 value={simulationSpeed}
//                 onChange={(event) => setSimulationSpeed(Number(event.target.value))}
//               >
//                 <option value={0.25}>0.25×</option>
//                 <option value={0.5}>0.5×</option>
//                 <option value={1}>1×</option>
//                 <option value={2}>2×</option>
//                 <option value={4}>4×</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <aside className="solar-info-panel">
//           <p className="solar-eyebrow">PLANET PROFILE</p>

//           <div
//             className="solar-planet-orb"
//             style={{
//               background: `radial-gradient(circle at 32% 28%, #ffffff66, ${selected.color} 36%, #101323 100%)`,
//               boxShadow: `0 0 50px ${selected.color}33`,
//             }}
//           />

//           <p className="solar-planet-index">
//             SOLAR BODY / {String(planets.findIndex((planet) => planet.name === selected.name) + 1).padStart(2, '0')}
//           </p>

//           <h2 className="solar-planet-title">{selected.name}</h2>
//           <p className="solar-description">{selected.description}</p>

//           <div className="solar-facts">
//             <div className="solar-fact">
//               <span>Diameter</span>
//               <strong>{selected.diameter.toLocaleString()} km</strong>
//             </div>
//             <div className="solar-fact">
//               <span>Distance from Sun</span>
//               <strong>{formatDistance(selected.sunDistance)}</strong>
//             </div>
//             <div className="solar-fact">
//               <span>Rotation period</span>
//               <strong>{selected.day}</strong>
//             </div>
//             <div className="solar-fact">
//               <span>Orbital period</span>
//               <strong>{selected.year}</strong>
//             </div>
//           </div>

//           <button
//             type="button"
//             className="solar-action-button"
//             style={{ marginTop: 16 }}
//             onClick={() => focusOn(selected.name)}
//           >
//             <Focus size={14} /> Focus on {selected.name}
//           </button>

//           <p className="solar-footnote">
//             The animation is illustrative, not a real-time ephemeris.
//             Planet sizes, distances, and orbital speeds are not shown to scale.
//           </p>
//         </aside>
//       </section>

//       <section className="solar-selector">
//         <p className="solar-eyebrow">CHOOSE YOUR DESTINATION</p>

//         <div className="solar-planet-list">
//           <button
//             type="button"
//             className="solar-planet-button"
//             style={{
//               borderColor: focusPlanet === 'Sun' ? '#ffb84d' : 'rgba(160,160,200,.18)',
//               background: focusPlanet === 'Sun' ? 'rgba(255,184,77,.1)' : 'rgba(255,255,255,.02)',
//             }}
//             onClick={() => focusOn('Sun')}
//           >
//             <SunIcon size={14} color="#ffb84d" /> Sun
//           </button>

//           {planets.map((planet) => (
//             <button
//               type="button"
//               key={planet.name}
//               className="solar-planet-button"
//               onClick={() => {
//                 setSelected(planet);
//                 focusOn(planet.name);
//               }}
//               style={{
//                 borderColor: selected.name === planet.name ? planet.color : 'rgba(160,160,200,.18)',
//                 background: selected.name === planet.name ? `${planet.color}18` : 'rgba(255,255,255,.02)',
//               }}
//             >
//               <span className="solar-planet-dot" style={{ background: planet.color }} />
//               {planet.name}
//             </button>
//           ))}
//         </div>
//       </section>

//       <section className="solar-compare-panel">
//         <div className="solar-compare-heading">
//           <div>
//             <p className="solar-eyebrow">PLANETARY DATA</p>
//             <h2 className="solar-compare-title">Compare two worlds.</h2>
//           </div>

//           <button
//             type="button"
//             className="solar-control-button"
//             onClick={() => setCompareMode((value) => !value)}
//           >
//             {compareMode ? <X size={14} /> : <GitCompareArrows size={14} />}
//             {compareMode ? 'Close comparison' : 'Compare planets'}
//           </button>
//         </div>

//         {compareMode && (
//           <>
//             <div className="solar-compare-controls" style={{ marginTop: 16 }}>
//               <span className="solar-eyebrow">COMPARE {selected.name.toUpperCase()} WITH</span>
//               <select
//                 className="solar-compare-select"
//                 aria-label="Choose the second planet"
//                 value={secondPlanet.name}
//                 onChange={(event) => {
//                   const planet = planets.find((item) => item.name === event.target.value);
//                   if (planet) setComparePlanet(planet);
//                 }}
//               >
//                 {planets
//                   .filter((planet) => planet.name !== selected.name)
//                   .map((planet) => (
//                     <option key={planet.name} value={planet.name}>
//                       {planet.name}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             <div className="solar-compare-table-wrap">
//               <table className="solar-compare-table">
//                 <thead>
//                   <tr>
//                     <th>PROPERTY</th>
//                     <th>{selected.name.toUpperCase()}</th>
//                     <th>{secondPlanet.name.toUpperCase()}</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {comparisonRows.map((row) => (
//                     <tr key={row.label}>
//                       <td>{row.label}</td>
//                       <td>{row.valueA}</td>
//                       <td>{row.valueB}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}

//         <p className="solar-scale-note">
//           Distances are approximate average distances from the Sun.
//           Orbital and rotation periods are simplified reference values.
//         </p>
//       </section>
//     </main>
//   );
// }



import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  Orbit,
  RotateCcw,
  ZoomIn,
  Sparkles,
  Play,
  Pause,
  Gauge,
  GitCompareArrows,
  X,
  Focus,
  Sun as SunIcon,
} from 'lucide-react';

const planets = [
  {
    name: 'Mercury', color: '#a9a9a9', size: 0.22, distance: 2.2,
    speed: 1.6, diameter: 4879, sunDistance: 57.9,
    day: '58.6 Earth days', year: '88 Earth days',
    description: 'The smallest planet and the closest planet to the Sun.',
  },
  {
    name: 'Venus', color: '#e6bd87', size: 0.34, distance: 3.3,
    speed: 1.15, diameter: 12104, sunDistance: 108.2,
    day: '243 Earth days', year: '225 Earth days',
    description: 'A rocky world with a thick atmosphere and extreme surface heat.',
  },
  {
    name: 'Earth', color: '#438bff', size: 0.38, distance: 4.5,
    speed: 0.85, diameter: 12742, sunDistance: 149.6,
    day: '24 hours', year: '365.25 days',
    description: 'Our home planet, with liquid water on its surface and known life.',
  },
  {
    name: 'Mars', color: '#e76f51', size: 0.29, distance: 5.7,
    speed: 0.68, diameter: 6779, sunDistance: 227.9,
    day: '24.6 hours', year: '687 Earth days',
    description: 'The Red Planet, known for its dusty surface and enormous volcanoes.',
  },
  {
    name: 'Jupiter', color: '#d8b18b', size: 0.75, distance: 7.6,
    speed: 0.38, diameter: 139820, sunDistance: 778.6,
    day: '9.9 hours', year: '11.86 Earth years',
    description: 'The largest planet, with powerful storms and many moons.',
  },
  {
    name: 'Saturn', color: '#e8d29a', size: 0.64, distance: 9.8,
    speed: 0.27, diameter: 116460, sunDistance: 1430,
    day: '10.7 hours', year: '29.4 Earth years',
    description: 'A gas giant famous for its spectacular rings.',
  },
  {
    name: 'Uranus', color: '#85d8df', size: 0.47, distance: 11.7,
    speed: 0.19, diameter: 50724, sunDistance: 2870,
    day: '17.2 hours', year: '84 Earth years',
    description: 'An ice giant that rotates on an unusually tilted axis.',
  },
  {
    name: 'Neptune', color: '#4169e1', size: 0.46, distance: 13.5,
    speed: 0.14, diameter: 49244, sunDistance: 4500,
    day: '16.1 hours', year: '165 Earth years',
    description: 'A distant ice giant with extremely fast winds.',
  },
];

function OrbitPath({ radius }) {
  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0, radius, radius, 0, Math.PI * 2, false, 0
    );

    const points = curve.getPoints(180).map(
      (point) => new THREE.Vector3(point.x, 0, point.y)
    );

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color="#777da7"
        transparent
        opacity={0.28}
      />
    </line>
  );
}

function Sun() {
  const sunRef = useRef();

  useFrame((_, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.05, 48, 48]} />
        <meshBasicMaterial color="#ffb84d" />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial
          color="#ff8c32"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      <pointLight
        color="#ffd08a"
        intensity={100}
        distance={40}
        decay={2}
      />
    </group>
  );
}

function Planet({
  planet,
  selected,
  onSelect,
  paused,
  simulationSpeed,
}) {
  const groupRef = useRef();
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (!paused && groupRef.current) {
      groupRef.current.rotation.y +=
        delta * planet.speed * 0.12 * simulationSpeed;
    }

    if (meshRef.current && !paused) {
      meshRef.current.rotation.y += delta * 0.35 * simulationSpeed;
    }
  });

  return (
    <group>
      <OrbitPath radius={planet.distance} />

      <group ref={groupRef}>
        <group position={[planet.distance, 0, 0]}>
          <mesh
            ref={meshRef}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(planet);
            }}
          >
            <sphereGeometry args={[planet.size, 40, 40]} />
            <meshStandardMaterial
              color={planet.color}
              roughness={0.78}
              emissive={selected ? planet.color : '#000000'}
              emissiveIntensity={selected ? 0.25 : 0}
            />
          </mesh>

          {planet.name === 'Saturn' && (
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
              <ringGeometry
                args={[planet.size * 1.25, planet.size * 1.9, 80]}
              />
              <meshStandardMaterial
                color="#d9c49b"
                side={THREE.DoubleSide}
                transparent
                opacity={0.8}
              />
            </mesh>
          )}

          <Html
            distanceFactor={18}
            position={[0, planet.size + 0.3, 0]}
            center
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelect(planet);
              }}
              style={{
                color: selected ? '#ffffff' : '#b9bfd8',
                background: selected
                  ? 'rgba(94,82,170,.9)'
                  : 'rgba(9,12,30,.8)',
                border: `1px solid ${
                  selected ? planet.color : 'rgba(180,180,220,.25)'
                }`,
                borderRadius: 20,
                padding: '5px 9px',
                fontSize: 10,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {planet.name}
            </button>
          </Html>
        </group>
      </group>
    </group>
  );
}

function CameraFocus({ focusPlanet, controlsRef }) {
  const { camera } = useThree();
  const destination = useRef(null);

  useEffect(() => {
    if (focusPlanet === 'Sun') {
      destination.current = {
        position: new THREE.Vector3(0, 5, 8),
        target: new THREE.Vector3(0, 0, 0),
      };
    } else if (focusPlanet) {
      const planet = planets.find((item) => item.name === focusPlanet);

      if (planet) {
        destination.current = {
          position: new THREE.Vector3(
            planet.distance + 3,
            3.5,
            planet.distance + 5
          ),
          target: new THREE.Vector3(planet.distance, 0, 0),
        };
      }
    }
  }, [focusPlanet, camera]);

  useFrame(() => {
    const destinationValue = destination.current;
    const controls = controlsRef.current;

    if (!destinationValue || !controls) return;

    camera.position.lerp(destinationValue.position, 0.045);
    controls.target.lerp(destinationValue.target, 0.045);
    controls.update();

    if (
      camera.position.distanceTo(destinationValue.position) < 0.06 &&
      controls.target.distanceTo(destinationValue.target) < 0.06
    ) {
      destination.current = null;
    }
  });

  return null;
}

function SolarScene({
  selected,
  onSelect,
  paused,
  simulationSpeed,
  focusPlanet,
  controlsRef,
}) {
  return (
    <Canvas
      camera={{ position: [0, 15, 21], fov: 48 }}
      dpr={[1, 1.5]}
      onPointerMissed={() => {}}
    >
      <color attach="background" args={['#050713']} />
      <ambientLight intensity={0.65} />
      <Stars
        radius={90}
        depth={50}
        count={2500}
        factor={4}
        fade
        speed={paused ? 0 : 0.5}
      />

      <Sun />

      {planets.map((planet) => (
        <Planet
          key={planet.name}
          planet={planet}
          selected={selected?.name === planet.name}
          onSelect={onSelect}
          paused={paused}
          simulationSpeed={simulationSpeed}
        />
      ))}

      <CameraFocus
        focusPlanet={focusPlanet}
        controlsRef={controlsRef}
      />

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        minDistance={3}
        maxDistance={42}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
      />
    </Canvas>
  );
}

function formatDistance(millionsKm) {
  if (millionsKm >= 1000) {
    return `${(millionsKm / 1000).toFixed(2)} billion km`;
  }

  return `${millionsKm.toFixed(1)} million km`;
}

export default function SolarSystem() {
  const [selected, setSelected] = useState(planets[2]);
  const [paused, setPaused] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePlanet, setComparePlanet] = useState(planets[3]);
  const [focusPlanet, setFocusPlanet] = useState(null);
  const controlsRef = useRef();

  function resetView() {
    setFocusPlanet(null);

    const controls = controlsRef.current;

    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(0, 15, 21);
      controls.update();
    }
  }

  function focusOn(name) {
    setFocusPlanet(name);
  }

  const secondPlanet =
    comparePlanet.name === selected.name
      ? planets.find((planet) => planet.name !== selected.name)
      : comparePlanet;

  const comparisonRows = [
    {
      label: 'Diameter',
      valueA: `${selected.diameter.toLocaleString()} km`,
      valueB: `${secondPlanet.diameter.toLocaleString()} km`,
    },
    {
      label: 'Distance from Sun',
      valueA: formatDistance(selected.sunDistance),
      valueB: formatDistance(secondPlanet.sunDistance),
    },
    {
      label: 'Rotation period',
      valueA: selected.day,
      valueB: secondPlanet.day,
    },
    {
      label: 'Orbital period',
      valueA: selected.year,
      valueB: secondPlanet.year,
    },
  ];

  return (
    <main className="solar-page">
      <style>{`
        .solar-page {
          max-width: 1600px;
          margin: 0 auto;
          padding: clamp(20px, 4vw, 56px);
          color: #f3f3ff;
          font-family: inherit;
        }
        .solar-header { max-width: 760px; margin-bottom: 30px; }
        .solar-tagline { display: block; margin: 0 0 14px; color: #c0a7ff; font-family: 'Dancing Script', cursive; font-style: normal; font-size: clamp(28px, 3.5vw, 42px); line-height: 1.2; transform: rotate(-2deg); transform-origin: left center; }
        .solar-eyebrow { color: #9993c9; letter-spacing: 2px; font-size: 10px; font-weight: 700; }
        .solar-title { font-family: Cinzel, serif; font-size: clamp(42px, 6vw, 76px); letter-spacing: -2px; line-height: 1.08; margin: 12px 0; font-weight: 500; }
        .solar-accent { color: #aa94ff; }
        .solar-subtitle { color: #a7abc4; line-height: 1.8; max-width: 590px; font-size: 14px; }
        .solar-workspace { display: grid; grid-template-columns: minmax(0,1fr) minmax(260px,320px); gap: 18px; align-items: stretch; }
        .solar-scene-panel, .solar-info-panel, .solar-compare-panel { min-width: 0; border: 1px solid rgba(160,160,200,.2); border-radius: 18px; background: rgba(12,14,34,.85); overflow: hidden; }
        .solar-scene-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; padding: 14px 18px; border-bottom: 1px solid rgba(160,160,200,.14); color: #b8b7d5; font-size: 10px; letter-spacing: 1px; }
        .solar-scene-top span, .solar-hint span { display: inline-flex; align-items: center; gap: 7px; }
        .solar-status-dot { width: 6px; height: 6px; background: #64e2c2; border-radius: 50%; display: inline-block; }
        .solar-canvas { height: min(62vh,600px); min-height: 380px; cursor: grab; }
        .solar-canvas:active { cursor: grabbing; }
        .solar-hint { display: flex; flex-wrap: wrap; gap: 16px; padding: 14px 18px; color: #8589aa; font-size: 11px; border-top: 1px solid rgba(160,160,200,.14); }
        .solar-controls { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 16px; border-top: 1px solid rgba(160,160,200,.1); }
        .solar-control-button, .solar-action-button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid rgba(160,160,200,.2); border-radius: 9px; padding: 9px 12px; color: #e7e7f5; background: rgba(255,255,255,.035); cursor: pointer; font: inherit; font-size: 11px; }
        .solar-control-button:hover, .solar-action-button:hover { border-color: #aa94ff; }
        .solar-speed-control { display: flex; align-items: center; gap: 9px; margin-left: auto; color: #a7abc4; font-size: 11px; }
        .solar-speed-control select, .solar-compare-select { background: #11142b; border: 1px solid rgba(160,160,200,.25); border-radius: 8px; color: #f3f3ff; padding: 8px; font: inherit; font-size: 11px; }
        .solar-info-panel { padding: 22px; }
        .solar-planet-orb { width: 96px; height: 96px; border-radius: 50%; margin: 26px 0 22px; border: 1px solid rgba(255,255,255,.12); }
        .solar-planet-index { color: #8589aa; font-size: 10px; letter-spacing: 1.5px; }
        .solar-planet-title { font-family: Cinzel, serif; font-size: 31px; margin: 8px 0 12px; font-weight: 500; }
        .solar-description { color: #a7abc4; font-size: 13px; line-height: 1.7; }
        .solar-facts { margin-top: 20px; border-top: 1px solid rgba(160,160,200,.16); }
        .solar-fact { display: flex; flex-direction: column; gap: 6px; padding: 13px 0; border-bottom: 1px solid rgba(160,160,200,.12); }
        .solar-fact span { color: #8589aa; font-size: 11px; }
        .solar-fact strong { font-size: 12px; font-weight: 500; }
        .solar-footnote { color: #777d9d; font-size: 10px; line-height: 1.7; margin-top: 18px; }
        .solar-selector { margin-top: 28px; }
        .solar-planet-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
        .solar-planet-button { display: inline-flex; align-items: center; gap: 8px; border: 1px solid; border-radius: 30px; padding: 10px 15px; color: #e7e7f5; cursor: pointer; font-size: 12px; }
        .solar-planet-dot { width: 9px; height: 9px; border-radius: 50%; }
        .solar-compare-panel { margin-top: 24px; padding: 22px; }
        .solar-compare-heading { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
        .solar-compare-title { font-family: Cinzel, serif; font-size: 23px; margin: 9px 0; font-weight: 500; }
        .solar-compare-controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .solar-compare-table-wrap { width: 100%; overflow-x: auto; margin-top: 18px; }
        .solar-compare-table { width: 100%; border-collapse: collapse; min-width: 500px; font-size: 12px; text-align: left; }
        .solar-compare-table th, .solar-compare-table td { padding: 13px 12px; border-bottom: 1px solid rgba(160,160,200,.12); }
        .solar-compare-table th { color: #a7abc4; font-size: 10px; font-weight: 600; }
        .solar-compare-table td:first-child { color: #8589aa; }
        .solar-scale-note { color: #777d9d; font-size: 10px; line-height: 1.7; margin-top: 14px; }
        @media (max-width: 900px) {
          .solar-workspace { grid-template-columns: 1fr; }
          .solar-info-panel { display: grid; grid-template-columns: 110px minmax(0,1fr); column-gap: 18px; }
          .solar-info-panel > .solar-eyebrow { grid-column: 1 / -1; }
          .solar-planet-orb { grid-row: span 3; margin: 18px 0; }
          .solar-planet-index { align-self: end; }
          .solar-planet-title { margin: 4px 0; }
          .solar-description { grid-column: 2; margin-top: 0; }
          .solar-facts, .solar-footnote { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .solar-page { padding: 20px 14px; }
          .solar-canvas { height: 420px; min-height: 320px; }
          .solar-info-panel { display: block; padding: 18px; }
          .solar-planet-orb { margin: 22px 0; }
          .solar-speed-control { margin-left: 0; width: 100%; }
          .solar-speed-control select { flex: 1; }
          .solar-compare-panel { padding: 16px; }
        }
      `}</style>

      <header className="solar-header">
        <p className="solar-tagline">Worlds in quiet motion</p>
        <p className="solar-eyebrow">COSMIC ARCHIVE / EXPLORATION</p>
        <h1 className="solar-title">
          Solar <span className="solar-accent">System.</span>
        </h1>
        <p className="solar-subtitle">
          Eight planets. One star. Countless things to discover.
          Select a planet, explore its profile, and compare worlds.
        </p>
      </header>

      <section className="solar-workspace">
        <div className="solar-scene-panel">
          <div className="solar-scene-top">
            <span><Orbit size={14} /> SOLAR SYSTEM SIMULATION</span>
            <span><span className="solar-status-dot" /> {paused ? 'SIMULATION PAUSED' : 'ANIMATED MODEL'}</span>
          </div>

          <div className="solar-canvas">
            <SolarScene
              selected={selected}
              onSelect={setSelected}
              paused={paused}
              simulationSpeed={simulationSpeed}
              focusPlanet={focusPlanet}
              controlsRef={controlsRef}
            />
          </div>

          <div className="solar-hint">
            <span><RotateCcw size={13} /> Drag to rotate</span>
            <span><ZoomIn size={13} /> Scroll to zoom</span>
            <span><Sparkles size={13} /> Select a planet</span>
          </div>

          <div className="solar-controls">
            <button
              type="button"
              className="solar-control-button"
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
              {paused ? 'Resume' : 'Pause'}
            </button>

            <button
              type="button"
              className="solar-control-button"
              onClick={resetView}
            >
              <RotateCcw size={14} /> Reset view
            </button>

            <div className="solar-speed-control">
              <Gauge size={14} />
              <label htmlFor="solar-speed">Simulation speed</label>
              <select
                id="solar-speed"
                value={simulationSpeed}
                onChange={(event) => setSimulationSpeed(Number(event.target.value))}
              >
                <option value={0.25}>0.25×</option>
                <option value={0.5}>0.5×</option>
                <option value={1}>1×</option>
                <option value={2}>2×</option>
                <option value={4}>4×</option>
              </select>
            </div>
          </div>
        </div>

        <aside className="solar-info-panel">
          <p className="solar-eyebrow">PLANET PROFILE</p>

          <div
            className="solar-planet-orb"
            style={{
              background: `radial-gradient(circle at 32% 28%, #ffffff66, ${selected.color} 36%, #101323 100%)`,
              boxShadow: `0 0 50px ${selected.color}33`,
            }}
          />

          <p className="solar-planet-index">
            SOLAR BODY / {String(planets.findIndex((planet) => planet.name === selected.name) + 1).padStart(2, '0')}
          </p>

          <h2 className="solar-planet-title">{selected.name}</h2>
          <p className="solar-description">{selected.description}</p>

          <div className="solar-facts">
            <div className="solar-fact">
              <span>Diameter</span>
              <strong>{selected.diameter.toLocaleString()} km</strong>
            </div>
            <div className="solar-fact">
              <span>Distance from Sun</span>
              <strong>{formatDistance(selected.sunDistance)}</strong>
            </div>
            <div className="solar-fact">
              <span>Rotation period</span>
              <strong>{selected.day}</strong>
            </div>
            <div className="solar-fact">
              <span>Orbital period</span>
              <strong>{selected.year}</strong>
            </div>
          </div>

          <button
            type="button"
            className="solar-action-button"
            style={{ marginTop: 16 }}
            onClick={() => focusOn(selected.name)}
          >
            <Focus size={14} /> Focus on {selected.name}
          </button>

          <p className="solar-footnote">
            The animation is illustrative, not a real-time ephemeris.
            Planet sizes, distances, and orbital speeds are not shown to scale.
          </p>
        </aside>
      </section>

      <section className="solar-selector">
        <p className="solar-eyebrow">CHOOSE YOUR DESTINATION</p>

        <div className="solar-planet-list">
          <button
            type="button"
            className="solar-planet-button"
            style={{
              borderColor: focusPlanet === 'Sun' ? '#ffb84d' : 'rgba(160,160,200,.18)',
              background: focusPlanet === 'Sun' ? 'rgba(255,184,77,.1)' : 'rgba(255,255,255,.02)',
            }}
            onClick={() => focusOn('Sun')}
          >
            <SunIcon size={14} color="#ffb84d" /> Sun
          </button>

          {planets.map((planet) => (
            <button
              type="button"
              key={planet.name}
              className="solar-planet-button"
              onClick={() => {
                setSelected(planet);
                focusOn(planet.name);
              }}
              style={{
                borderColor: selected.name === planet.name ? planet.color : 'rgba(160,160,200,.18)',
                background: selected.name === planet.name ? `${planet.color}18` : 'rgba(255,255,255,.02)',
              }}
            >
              <span className="solar-planet-dot" style={{ background: planet.color }} />
              {planet.name}
            </button>
          ))}
        </div>
      </section>

      <section className="solar-compare-panel">
        <div className="solar-compare-heading">
          <div>
            <p className="solar-eyebrow">PLANETARY DATA</p>
            <h2 className="solar-compare-title">Compare two worlds.</h2>
          </div>

          <button
            type="button"
            className="solar-control-button"
            onClick={() => setCompareMode((value) => !value)}
          >
            {compareMode ? <X size={14} /> : <GitCompareArrows size={14} />}
            {compareMode ? 'Close comparison' : 'Compare planets'}
          </button>
        </div>

        {compareMode && (
          <>
            <div className="solar-compare-controls" style={{ marginTop: 16 }}>
              <span className="solar-eyebrow">COMPARE {selected.name.toUpperCase()} WITH</span>
              <select
                className="solar-compare-select"
                aria-label="Choose the second planet"
                value={secondPlanet.name}
                onChange={(event) => {
                  const planet = planets.find((item) => item.name === event.target.value);
                  if (planet) setComparePlanet(planet);
                }}
              >
                {planets
                  .filter((planet) => planet.name !== selected.name)
                  .map((planet) => (
                    <option key={planet.name} value={planet.name}>
                      {planet.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="solar-compare-table-wrap">
              <table className="solar-compare-table">
                <thead>
                  <tr>
                    <th>PROPERTY</th>
                    <th>{selected.name.toUpperCase()}</th>
                    <th>{secondPlanet.name.toUpperCase()}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{row.valueA}</td>
                      <td>{row.valueB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <p className="solar-scale-note">
          Distances are approximate average distances from the Sun.
          Orbital and rotation periods are simplified reference values.
        </p>
      </section>
    </main>
  );
}
