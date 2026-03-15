import React, { useRef, useMemo, useEffect } from 'react';
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
    bodyColor: '#E8E8E8', // Off-white/light grey like DJI
    accentColor: '#B0B0B0',
    motorColor: '#404040',
    propColor: '#121212',
    ledHover: '#07F49E',
    ledMove: '#FFFFFF',
    maxTilt: 18 * (Math.PI / 180),
    lerpFactor: 0.04,
};

const Drone = ({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) => {
    const group = useRef<THREE.Group>(null!);
    const bodyRef = useRef<THREE.Group>(null!);
    const flipRef = useRef(0); // Current flip rotation
    const isFlipping = useRef(false);

    // Materials
    const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: DRONE_SPECS.bodyColor,
        roughness: 0.3,
        metalness: 0.1
    }), []);

    const shinyMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: DRONE_SPECS.bodyColor,
        roughness: 0.1,
        metalness: 0.8
    }), []);

    const motorMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: DRONE_SPECS.motorColor,
        roughness: 0.3,
        metalness: 0.7
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

    // Flip logic
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'f') {
                e.preventDefault();
                if (!isFlipping.current) {
                    isFlipping.current = true;
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Movement state for spring physics
    const vel = useRef(new THREE.Vector2(0, 0));
    const pos = useRef(new THREE.Vector2(0, 0));

    useFrame((state, delta) => {
        if (!group.current || !bodyRef.current) return;

        const [mx, my] = mouse.current;

        // Spring physics for position
        const targetX = mx * 2.5;
        const targetY = my * 1.5;
        const ax = (targetX - pos.current.x) * 120;
        const ay = (targetY - pos.current.y) * 120;

        vel.current.x += ax * delta;
        vel.current.y += ay * delta;
        vel.current.x *= 0.8;
        vel.current.y *= 0.8;

        pos.current.x += vel.current.x * delta;
        pos.current.y += vel.current.y * delta;

        group.current.position.x = pos.current.x;
        group.current.position.y = pos.current.y;

        // Idle hover bob
        const bob = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
        group.current.position.y += bob;

        // Base banking tilt
        const targetTiltX = -vel.current.y * 0.15;
        const targetTiltZ = -vel.current.x * 0.15;
        const tiltX = THREE.MathUtils.clamp(targetTiltX, -DRONE_SPECS.maxTilt, DRONE_SPECS.maxTilt);
        const tiltZ = THREE.MathUtils.clamp(targetTiltZ, -DRONE_SPECS.maxTilt, DRONE_SPECS.maxTilt);

        // Flip animation
        if (isFlipping.current) {
            flipRef.current += delta * 15; // Animation speed
            if (flipRef.current >= Math.PI * 2) {
                flipRef.current = 0;
                isFlipping.current = false;
            }
        }

        bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, tiltX + flipRef.current, 0.1);
        bodyRef.current.rotation.z = THREE.MathUtils.lerp(bodyRef.current.rotation.z, tiltZ, 0.1);
        bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, mx * 0.2, 0.1);
    });

    return (
        <group ref={group}>
            <group ref={bodyRef}>

                {/* Main Body (Tapered) */}
                <mesh material={bodyMat} castShadow>
                    <boxGeometry args={[0.3, 0.12, 0.45]} />
                </mesh>

                {/* Nose/Battery Lid */}
                <mesh position={[0, 0.04, 0.05]} material={shinyMat}>
                    <boxGeometry args={[0.26, 0.06, 0.35]} />
                </mesh>

                {/* Gimbal & Camera */}
                <group position={[0, -0.06, -0.18]}>
                    <mesh material={motorMat}>
                        <boxGeometry args={[0.08, 0.08, 0.1]} />
                    </mesh>
                    <mesh position={[0, -0.02, -0.06]} rotation={[Math.PI / 2, 0, 0]} material={lensMat}>
                        <cylinderGeometry args={[0.04, 0.045, 0.06, 16]} />
                    </mesh>
                </group>

                {/* Arms with landing legs */}
                <Arm dx={1} dz={-1} isFront={true} motorMat={motorMat} propMat={propMat} vel={vel} bodyMat={bodyMat} />
                <Arm dx={-1} dz={-1} isFront={true} motorMat={motorMat} propMat={propMat} vel={vel} bodyMat={bodyMat} />
                <Arm dx={1.2} dz={1} isFront={false} motorMat={motorMat} propMat={propMat} vel={vel} bodyMat={bodyMat} />
                <Arm dx={-1.2} dz={1} isFront={false} motorMat={motorMat} propMat={propMat} vel={vel} bodyMat={bodyMat} />

            </group>
        </group>
    );
};

const Arm = ({ dx, dz, isFront, motorMat, propMat, vel, bodyMat }: {
    dx: number, dz: number, isFront: boolean, motorMat: THREE.Material, propMat: THREE.Material, vel: React.MutableRefObject<THREE.Vector2>, bodyMat: THREE.Material
}) => {
    const propGroupRef = useRef<THREE.Group>(null!);

    useFrame((_, delta) => {
        if (!propGroupRef.current) return;
        const speed = vel.current.length();
        const rotationSpeed = speed > 0.5 ? 60 : 30;
        const direction = (dx * dz > 0) ? 1 : -1;
        propGroupRef.current.rotation.y += delta * rotationSpeed * direction;
    });

    return (
        <group position={[dx * 0.22, 0.02, dz * 0.15]}>
            {/* Tilted folding arm */}
            <mesh rotation={[0, -Math.atan2(dx, dz), 0]} material={bodyMat}>
                <boxGeometry args={[0.06, 0.04, 0.3]} />
            </mesh>

            {/* Motor hub */}
            <group position={[0, 0.03, dz * 0.1]}>
                <mesh material={motorMat}>
                    <cylinderGeometry args={[0.045, 0.045, 0.06, 16]} />
                </mesh>

                {/* Landing leg (Front only) */}
                {isFront && (
                    <mesh position={[0, -0.15, 0]} material={bodyMat}>
                        <boxGeometry args={[0.03, 0.2, 0.03]} />
                    </mesh>
                )}

                {/* Propellers */}
                <group ref={propGroupRef} position={[0, 0.04, 0]}>
                    <mesh material={propMat}>
                        <boxGeometry args={[0.3, 0.005, 0.03]} />
                    </mesh>
                    <mesh rotation={[0, Math.PI / 2, 0]} material={propMat}>
                        <boxGeometry args={[0.3, 0.005, 0.03]} />
                    </mesh>
                </group>
            </group>
        </group>
    );
};


export default Drone;
