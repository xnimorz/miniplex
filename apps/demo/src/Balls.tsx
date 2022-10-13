import { between, plusMinus } from "randomish"
import { useLayoutEffect } from "react"
import { Vector3 } from "three"
import { InstancedParticles, Particle, ParticleProps } from "vfx-composer-r3f"
import { BOUNDS, ECS } from "./state"

export const Balls = ({ count = 1000 }) => {
  useLayoutEffect(() => {
    for (let i = 0; i < count; i++) {
      spawnBall({
        position: [
          plusMinus(BOUNDS - 1),
          plusMinus(BOUNDS - 1),
          plusMinus(BOUNDS - 1)
        ]
      })
    }

    return () => {
      for (const entity of ECS.world.archetype("isBall")) {
        ECS.world.remove(entity)
      }
    }
  })

  return (
    <InstancedParticles castShadow receiveShadow capacity={count}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial color="#f1faee" />

      <ECS.Archetype properties="isBall">
        {(entity) => entity.jsx}
      </ECS.Archetype>
    </InstancedParticles>
  )
}

export const spawnBall = (props: ParticleProps) => {
  const radius = between(0.2, 0.4)

  return ECS.world.add({
    isBall: true,

    physics: {
      velocity: new Vector3(),
      mass: 1,
      radius,
      restitution: 0.8 - radius
    },

    spatialHashing: {},

    neighbors: [],

    jsx: (
      <ECS.Property name="transform">
        <Particle scale={radius} {...props} />
      </ECS.Property>
    )
  })
}
