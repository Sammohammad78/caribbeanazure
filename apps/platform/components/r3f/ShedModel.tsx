/**
 * Shed 3D Model Component
 *
 * TODO: Extract geometry generation from Syria configurator
 * TODO: Implement wall, roof, door, window geometry
 * TODO: Add material system (textures, colors)
 *
 * Source files to extract from:
 * - components/HousePreview.tsx
 * - components/r3f/ShedComponents.tsx
 * - components/r3f/ShedGeometry.tsx
 * - components/r3f/PremiumMaterials.tsx
 */

export function ShedModel({ config }: { config: any }) {
  return (
    <group>
      {/* TODO: Extract 3D geometry generation */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[config.width || 3, config.height || 2.5, config.depth || 2.5]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  )
}
