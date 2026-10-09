import {
  ACESFilmicToneMapping,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  RingGeometry,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const SIZE = 1.4; // cube edge
const ORBIT_RADIUS = 6.2;
const ORBIT_HEIGHT = 2.1;
const ORBIT_SPEED = 0.28; // rad/s

function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  grad.addColorStop(0, 'rgba(0,0,0,0.65)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

export function createHeroCube(canvas: HTMLCanvasElement, stage: HTMLElement) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;

  const camera = new PerspectiveCamera(32, 1, 0.1, 50);

  const key = new DirectionalLight(0xffe3b8, 1.6);
  key.position.set(3, 5, 2);
  scene.add(key);

  // Cube resting on the floor (y = 0).
  const geo = new RoundedBoxGeometry(SIZE, SIZE, SIZE, 6, 0.12);
  const mat = new MeshStandardMaterial({ color: new Color(0xffc46b), metalness: 1, roughness: 0.28 });
  const cube = new Mesh(geo, mat);
  cube.position.y = SIZE / 2;
  cube.rotation.y = Math.PI / 5;
  scene.add(cube);

  // Soft contact shadow and a faint floor ring.
  const shadowMat = new MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false });
  const shadow = new Mesh(new PlaneGeometry(SIZE * 2.6, SIZE * 2.6), shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.002;
  scene.add(shadow);

  const ringMat = new MeshBasicMaterial({ color: 0x3a465a, transparent: true, opacity: 0.8, side: DoubleSide });
  const ring = new Mesh(new RingGeometry(1.95, 1.97, 128), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.001;
  scene.add(ring);

  let angle = 0.6;
  let raf = 0;
  let last = 0;
  let running = false;
  let visible = true;

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  }

  function render() {
    camera.position.set(Math.cos(angle) * ORBIT_RADIUS, ORBIT_HEIGHT, Math.sin(angle) * ORBIT_RADIUS);
    camera.lookAt(0, SIZE * 0.45, 0);
    renderer.render(scene, camera);
  }

  function frame(t: number) {
    raf = 0;
    if (!running || !visible || document.hidden) return;
    const dt = Math.min((t - last) / 1000, 0.05);
    last = t;
    angle += dt * ORBIT_SPEED;
    render();
    raf = requestAnimationFrame(frame);
  }

  function schedule() {
    if (running && visible && !document.hidden && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    schedule();
  });
  io.observe(stage);
  const onVis = () => schedule();
  document.addEventListener('visibilitychange', onVis);

  resize();

  return {
    get running() {
      return running;
    },
    start() {
      running = true;
      schedule();
    },
    stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
    dispose() {
      this.stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      geo.dispose();
      mat.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
