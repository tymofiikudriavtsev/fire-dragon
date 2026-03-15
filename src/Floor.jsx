import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Floor.css';

export default function Floor() {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
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

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

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
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '300px', border: '2px solid #8fd19e', borderRadius: '10px', margin: '20px auto' }}
    />
  );
}
