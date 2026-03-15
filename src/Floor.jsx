import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Floor.css';

export default function Floor() {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    // Set red sky background
    scene.background = new THREE.Color(0xff4444);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Floor
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshPhongMaterial({ color: 0x8fd19e });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Lava ring
    const lavaGeometry = new THREE.RingGeometry(5.5, 6.5, 64);
    const lavaMaterial = new THREE.MeshBasicMaterial({ color: 0xff6600, side: THREE.DoubleSide });
    const lava = new THREE.Mesh(lavaGeometry, lavaMaterial);
    lava.rotation.x = -Math.PI / 2;
    lava.position.y = 0.01; // Slightly above the floor
    scene.add(lava);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Handle click to change color
    function handleClick() {
      // Generate a random bright color
      const randomColor = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
      material.color.set(randomColor);
    }
    renderer.domElement.addEventListener('click', handleClick);

    // Animate
    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Cleanup
    return () => {
      if (
        mountRef.current &&
        renderer.domElement &&
        renderer.domElement.parentNode === mountRef.current
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.domElement.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '300px', border: '2px solid #8fd19e', borderRadius: '10px', margin: '20px auto' }}
    />
  );
}
