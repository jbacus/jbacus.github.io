const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide, wireframe: true }),
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide, wireframe: true }),
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide, wireframe: true }),
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide, wireframe: true }),
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide, wireframe: true }),
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide, wireframe: true }),
];
const cornellBox = new THREE.Mesh(boxGeometry, materials);
scene.add(cornellBox);

camera.position.z = 2;

const mouse = new THREE.Vector2();
document.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const animate = function () {
  requestAnimationFrame(animate);

  // Rotate the Cornell Box
  cornellBox.rotation.x += 0.01;
  cornellBox.rotation.y += 0.01;

  camera.position.x += (mouse.x - camera.position.x) * 0.05;
  camera.position.y += (mouse.y - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
};

animate();
