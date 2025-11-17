'use client'

/**
 * Shared 3D Viewer Component
 *
 * This component will be extracted from the Syria configurator
 * and provide a unified 3D visualization system using React Three Fiber
 *
 * Features to extract:
 * - Canvas setup with optimal settings
 * - OrbitControls for navigation
 * - Lighting setup (ambient, directional, shadows)
 * - Performance optimizations
 * - Camera configuration
 * - Grid/floor plane
 *
 * TODO: Extract from components/HousePreview.tsx
 * TODO: Extract from components/configurator/Viewer3D.tsx
 * TODO: Make it accept generic 3D model components as children
 */

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei'

interface Viewer3DProps {
  children?: React.ReactNode
  showGrid?: boolean
  cameraPosition?: [number, number, number]
  onCameraChange?: (position: [number, number, number]) => void
}

export function Viewer3D({
  children,
  showGrid = true,
  cameraPosition = [10, 10, 10],
}: Viewer3DProps) {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Controls */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Grid */}
        {showGrid && (
          <Grid
            args={[20, 20]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#ddd"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#999"
            fadeDistance={50}
            fadeStrength={1}
            followCamera={false}
          />
        )}

        {/* User-provided 3D content */}
        {children}
      </Suspense>
    </Canvas>
  )
}

// Placeholder example usage:
// <Viewer3D>
//   <ShedModel config={shedConfig} />
// </Viewer3D>
