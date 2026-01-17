import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import "./Campus360.css";

// --- CONFIGURATION: Your 3 Specific Scenes ---
const SCENES = {
  ground: {
    id: "ground",
    title: "Sports Ground",
    image: "/outGround.jpg", // The file you uploaded
    hotspots: [
      { x: 15, y: -1, z: -5, target: "bb_outside", label: "Go to Basketball Court ➡" }
    ]
  },
  bb_outside: {
    id: "bb_outside",
    title: "Basketball Court (Exterior)",
    image: "/bb1ouside.jpg", // The file you uploaded
    hotspots: [
      { x: -10, y: 0, z: 5, target: "ground", label: "⬅ Back to Ground" },
      { x: 10, y: 0, z: -5, target: "bb_inside", label: "Enter Court ➡" }
    ]
  },
  bb_inside: {
    id: "bb_inside",
    title: "Basketball Court (Center)",
    image: "/bb1inside.jpg", // The file you uploaded
    hotspots: [
      { x: -12, y: 0, z: 0, target: "bb_outside", label: "⬅ Exit to Outside" }
    ]
  }
};

// --- COMPONENT: 3D Scene with Image & Hotspots ---
function TourScene({ sceneData, onChangeScene }) {
  // Load the 360 image texture
  const texture = useTexture(sceneData.image);

  return (
    <group>
      {/* The 360 Sphere (Inverted to see from inside) */}
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={2} />
      </mesh>

      {/* Render Hotspots for this specific scene */}
      {sceneData.hotspots.map((hotspot, index) => (
        <group key={index} position={[hotspot.x, hotspot.y, hotspot.z]}>
          {/* The Clickable Sphere (The "Orb") */}
          <mesh onClick={() => onChangeScene(hotspot.target)}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshBasicMaterial color="#ff4b2b" transparent opacity={0.8} />
          </mesh>
          
          {/* The Label floating above it */}
          <Html position={[0, 2, 0]} center>
            <div className="hotspot-label" onClick={() => onChangeScene(hotspot.target)}>
              {hotspot.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

// --- MAIN COMPONENT ---
export default function Campus360() {
  const [appMode, setAppMode] = useState("video"); // Starts in 'video' mode
  const [videoEnded, setVideoEnded] = useState(false);
  const [currentSceneId, setCurrentSceneId] = useState("ground"); // Start at the Ground

  const activeScene = SCENES[currentSceneId];

  return (
    <div className="campus-container">
      
      {/* --- PHASE 1: INTRO VIDEO --- */}
      {appMode === "video" && (
        <div className="video-section">
          {/* Background Video */}
          <video 
            className="fullscreen-video" 
            autoPlay 
            muted 
            playsInline
            onEnded={() => setVideoEnded(true)}
          >
            {/* Ensure this matches your filename in 'public' */}
            <source src="/movie.mp4" type="video/mp4" />
          </video>

          {/* Overlay Text & Button */}
          <div className="overlay-content">
            <h1>CampusVerse</h1>
            <p className="subtitle">Virtual Flyover Tour</p>
            
            {/* Button appears when video ends (or click to skip during dev) */}
            {(videoEnded || true) && ( 
              <button 
                className="dive-in-btn" 
                onClick={() => setAppMode("tour")}
              >
                DIVE INTO TOUR ➡
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- PHASE 2: INTERACTIVE TOUR --- */}
      {appMode === "tour" && (
        <div className="tour-section">
          
          {/* 3D Canvas */}
          <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
            <OrbitControls 
              enableZoom={false} 
              rotateSpeed={-0.5} 
              enablePan={false}
            />
            <Suspense fallback={<Html center><div className="loader">Loading Scene...</div></Html>}>
              <TourScene 
                sceneData={activeScene} 
                onChangeScene={setCurrentSceneId} 
              />
            </Suspense>
          </Canvas>

          {/* Top Right Menu */}
          <div className="tour-menu">
            <h3>📍 Quick Jump</h3>
            <ul>
              {Object.values(SCENES).map((scene) => (
                <li key={scene.id}>
                  <button 
                    className={currentSceneId === scene.id ? "active" : ""}
                    onClick={() => setCurrentSceneId(scene.id)}
                  >
                    {scene.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Info Bar */}
          <div className="tour-info">
            <h2>{activeScene.title}</h2>
            <p>Drag to look around • Click red orbs to travel</p>
          </div>

        </div>
      )}
    </div>
  );
}