
import { useEffect, useRef, useState } from 'react';
import ZombieSword from './ZombieSword';
import * as THREE from 'three';

  const mountRef = useRef(null);
  const [attackMsg, setAttackMsg] = useState("");
  const [zombieHealth, setZombieHealth] = useState(100);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
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
    lava.position.y = 0.01;
    scene.add(lava);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Zombie group
    const zombie = new THREE.Group();
    const bodyGeometry = new THREE.BoxGeometry(0.7, 1.2, 0.4);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x3a7d3a });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.6, 0);
    zombie.add(body);
    const headGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x7ed957 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.25, 0);
    zombie.add(head);
    scene.add(zombie);

    // Controls
    let zombieAngle = 0;
    let zombieZ = 0;
    let zombieX = 0;

    function moveZombie(dir) {
      const speed = 0.2;
      if (dir === 'forward') {
        zombieZ -= speed * Math.cos(zombieAngle);
        zombieX -= speed * Math.sin(zombieAngle);
      } else if (dir === 'backward') {
        zombieZ += speed * Math.cos(zombieAngle);
        zombieX += speed * Math.sin(zombieAngle);
      } else if (dir === 'left') {
        zombieAngle += Math.PI / 16;
      } else if (dir === 'right') {
        zombieAngle -= Math.PI / 16;
      }
      zombie.position.set(zombieX, 0, zombieZ);
      zombie.rotation.y = zombieAngle;
    }

    // Button controls
    setTimeout(() => {
      const forwardBtn = document.getElementById('move-forward');
      const backwardBtn = document.getElementById('move-backward');
      const leftBtn = document.getElementById('turn-left');
      const rightBtn = document.getElementById('turn-right');
      if (forwardBtn) forwardBtn.onclick = () => moveZombie('forward');
      if (backwardBtn) backwardBtn.onclick = () => moveZombie('backward');
      if (leftBtn) leftBtn.onclick = () => moveZombie('left');
      if (rightBtn) rightBtn.onclick = () => moveZombie('right');
    }, 100);

    // Keyboard controls
    function handleKey(e) {
      if (e.key === 'w') moveZombie('forward');
      if (e.key === 's') moveZombie('backward');
      if (e.key === 'a') moveZombie('left');
      if (e.key === 'd') moveZombie('right');
    }
    window.addEventListener('keydown', handleKey);

    // Mouse camera rotation
    let isDragging = false;
    let prevX = 0;
    renderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevX = e.clientX;
    });
    renderer.domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });
    renderer.domElement.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const delta = e.clientX - prevX;
        camera.position.x += delta * 0.01;
        camera.lookAt(0, 0, 0);
        prevX = e.clientX;
      }
    });

    // Handle click to change floor color
    function handleClick() {
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
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  function handleSwordAttack() {
    setAttackMsg("Zombie Sword slashed!");
    setZombieHealth(h => Math.max(0, h - 20));
    setTimeout(() => setAttackMsg(""), 1200);
  }

  return (
    <>
      <div
        ref={mountRef}
        style={{ width: '100%', height: '300px', border: '2px solid #8fd19e', borderRadius: '10px', margin: '20px auto' }}
      />
      <ZombieSword onAttack={handleSwordAttack} />
      <div style={{textAlign:'center',marginTop:'8px',fontWeight:'bold',color:'#3a7d3a'}}>Zombie Health: {zombieHealth}</div>
      {attackMsg && <div style={{textAlign:'center',color:'#b22222',fontWeight:'bold',marginTop:'8px'}}>{attackMsg}</div>}
    </>
  );
// ...existing code...
// ...existing code...
