import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ────────────────────────────────────────────
   REALISTIC DJI-STYLE MINI DRONE
   — Compact charcoal body
   — Tapered arms & motor housings
   — Independent prop rotation with motion blur
   — Realistic physics (tilt, bob, spring)
   — Underside status LED
──────────────────────────────────────────── */

const DRONE_SPECS = {
    bodyColor: '#A0A0A0',
    motorColor: '#707070',
    propColor: '#121212',
    ledHover: '#07F49E',
    ledMove: '#FFFFFF',
    maxTilt: 18 * (Math.PI / 180),
    lerpFactor: 0.04,
};

const Drone = ({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) => {
    const group = useRef<THREE.Group>(null!);
    const bodyRef = useRef<THREE.Group>(null!);
    const ledRef = useRef<THREE.MeshStandardMaterial>(null!);
    const ledPointRef = useRef<THREE.PointLight>(null!);

    // Materials
    const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: DRONE_SPECS.bodyColor,
        roughness: 0.1,
        metalness: 0.9
    }), []);

    const motorMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: DRONE_SPECS.motorColor,
        roughness: 0.1,
        metalness: 0.9
    }), []);

    const propMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: DRONE_SPECS.propColor,
        transparent: true,
        opacity: 0.9
    }), []);

    const lensMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#050510',
        roughness: 0,
        metalness: 0.9
    }), []);

    // Movement state for spring physics
    const vel = useRef(new THREE.Vector2(0, 0));
    const pos = useRef(new THREE.Vector2(0, 0));

    useFrame((state, delta) => {
        if (!group.current || !bodyRef.current) return;

        const [mx, my] = mouse.current;

        // Spring physics for position
        const targetX = mx * 2.5;
        const targetY = my * 1.5;

        // Simple spring damping
        const ax = (targetX - pos.current.x) * 120; // stiffness
        const ay = (targetY - pos.current.y) * 120;

        vel.current.x += ax * delta;
        vel.current.y += ay * delta;

        vel.current.x *= 0.8; // damping
        vel.current.y *= 0.8;

        pos.current.x += vel.current.x * delta;
        pos.current.y += vel.current.y * delta;

        // Apply position
        group.current.position.x = pos.current.x;
        group.current.position.y = pos.current.y;

        // Idle hover bob (Sine wave)
        const bob = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
        group.current.position.y += bob;

        // Tilt physics (Realistic DJI banking)
        // Moving right -> Roll right (Z axis)
        // Moving up -> Pitch back (X axis - wait, forward is negative Z in most scenes, so "forward" move is my > 0)
        // User wants: Moving forward (mouse up) -> Pitch forward (X axis negative)

        const targetTiltX = -vel.current.y * 0.15;
        const targetTiltZ = -vel.current.x * 0.15;

        // Clamp tilt
        const tiltX = THREE.MathUtils.clamp(targetTiltX, -DRONE_SPECS.maxTilt, DRONE_SPECS.maxTilt);
        const tiltZ = THREE.MathUtils.clamp(targetTiltZ, -DRONE_SPECS.maxTilt, DRONE_SPECS.maxTilt);

        bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, tiltX, 0.1);
        bodyRef.current.rotation.z = THREE.MathUtils.lerp(bodyRef.current.rotation.z, tiltZ, 0.1);
        bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, mx * 0.2, 0.1);

        // LED status update
        const speed = vel.current.length();
        if (ledRef.current && ledPointRef.current) {
            const isMoving = speed > 0.5;
            const targetColor = isMoving ? DRONE_SPECS.ledMove : DRONE_SPECS.ledHover;
            ledRef.current.color.lerp(new THREE.Color(targetColor), 0.1);
            ledRef.current.emissive.lerp(new THREE.Color(targetColor), 0.1);
            ledPointRef.current.color.lerp(new THREE.Color(targetColor), 0.1);
        }
    });

    return (
        <group ref={group}>
            <group ref={bodyRef}>

                {/* Main Body Hub */}
                <mesh material={bodyMat} castShadow>
                    <boxGeometry args={[0.35, 0.12, 0.25, 4, 1, 4]} />
                </mesh>

                {/* Top Shell (Slightly raised) */}
                <mesh position={[0, 0.06, 0.02]} material={bodyMat}>
                    <boxGeometry args={[0.25, 0.04, 0.18]} />
                </mesh>

                {/* Camera Module (Front-Bottom) */}
                <group position={[0, -0.05, -0.12]}>
                    <mesh material={motorMat}>
                        <sphereGeometry args={[0.04, 16, 16]} />
                    </mesh>
                    <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]} material={lensMat}>
                        <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
                    </mesh>
                </group>

                {/* Arms */}
                <Arm dx={1} dz={-1} motorMat={motorMat} propMat={propMat} vel={vel} />
                <Arm dx={-1} dz={-1} motorMat={motorMat} propMat={propMat} vel={vel} />
                <Arm dx={1} dz={1} motorMat={motorMat} propMat={propMat} vel={vel} />
                <Arm dx={-1} dz={1} motorMat={motorMat} propMat={propMat} vel={vel} />

                {/* Underside LED strip */}
                <mesh position={[0, -0.065, 0]}>
                    <boxGeometry args={[0.15, 0.01, 0.02]} />
                    <meshStandardMaterial ref={ledRef} emissiveIntensity={2} color={DRONE_SPECS.ledHover} emissive={DRONE_SPECS.ledHover} />
                </mesh>
                <pointLight ref={ledPointRef} position={[0, -0.1, 0]} intensity={0.5} distance={1} />

            </group>
        </group>
    );
};

const Arm = ({ dx, dz, motorMat, propMat, vel }: { dx: number, dz: number, motorMat: THREE.Material, propMat: THREE.Material, vel: React.MutableRefObject<THREE.Vector2> }) => {
    const propGroupRef = useRef<THREE.Group>(null!);
    const prop1Ref = useRef<THREE.Mesh>(null!);
    const prop2Ref = useRef<THREE.Mesh>(null!);

    useFrame((_, delta) => {
        if (!propGroupRef.current) return;

        const speed = vel.current.length();
        const isMoving = speed > 0.5;
        const rotationSpeed = isMoving ? 50 : 25;

        // Opposite directions for diagonal pairs (simplified)
        const direction = (dx * dz > 0) ? 1 : -1;
        propGroupRef.current.rotation.y += delta * rotationSpeed * direction;

        // Motion Blur Effect
        if (prop1Ref.current && prop2Ref.current) {
            const material = (prop1Ref.current.material as THREE.MeshStandardMaterial);
            material.opacity = isMoving ? 0.4 : 0.9;

            // Slight stretch for blur
            const scale = isMoving ? 1.4 : 1.0;
            propGroupRef.current.scale.set(scale, 1, scale);
        }
    });

    return (
        <group position={[dx * 0.18, 0, dz * 0.12]} rotation={[0, -Math.atan2(dx, dz), 0]}>
            {/* Arm geometry (Tapered) */}
            <mesh material={motorMat} position={[0, 0, 0.1]}>
                <boxGeometry args={[0.04, 0.03, 0.25]} />
            </mesh>

            {/* Motor housing */}
            <group position={[0, 0.02, 0.22]}>
                <mesh material={motorMat}>
                    <cylinderGeometry args={[0.035, 0.035, 0.05, 16]} />
                </mesh>

                {/* Propeller Pair */}
                <group ref={propGroupRef} position={[0, 0.03, 0]}>
                    <mesh ref={prop1Ref} material={propMat}>
                        <boxGeometry args={[0.22, 0.005, 0.02]} />
                    </mesh>
                    <mesh ref={prop2Ref} rotation={[0, Math.PI / 2, 0]} material={propMat}>
                        <boxGeometry args={[0.01, 0.01, 0.01]} /> {/* Center cap */}
                    </mesh>
                </group>
            </group>
        </group>
    );
};

export default Drone;
