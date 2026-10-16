import * as THREE from "three";

/*
 * Pulsera barbada (eslabón cubano) de oro en tiempo real, como las de su escaparate:
 * eslabones ovalados, aplanados y tallados en plano, que se inclinan a un lado y a otro
 * y se montan unos sobre otros. Gira despacio mientras las luces del estudio la recorren.
 * Devuelve { actualizar({ tono }), destruir() }.
 */

/* Color de cada metal (sRGB); cuanto menor la ley, más pálido. */
export const TONOS = {
  oro24: 0xffc85a,
  oro22: 0xf9c766,
  oro18: 0xf4c56f,
  oro14: 0xeac99a,
  oro9: 0xdfc8a6,
  plata: 0xf1f2f4,
  platino: 0xd9d8d4,
};

const ESLABONES = 24;
const PASO = 0.98; // distancia entre eslabones: menos que su largo, así se montan
const RADIO_PULSERA = (ESLABONES * PASO) / (Math.PI * 2);
const INCLINACION = THREE.MathUtils.degToRad(7);
const TORSION = THREE.MathUtils.degToRad(26);

/*
 * Un eslabón de barbada: toro ovalado, grueso, aplanado y tallado en plano, y retorcido
 * sobre su eje largo (un extremo sube y el otro baja). Así cada eslabón pasa por encima
 * del siguiente por un lado y por debajo por el otro, como en la cadena de verdad.
 */
function geometriaEslabon(signo) {
  const g = new THREE.TorusGeometry(0.5, 0.235, 32, 120);
  g.rotateX(Math.PI / 2); // anillo en el plano XZ: el grosor queda en Y
  const pos = g.attributes.position;
  const v = new THREE.Vector3();
  const largo = (0.5 + 0.235) * 1.28;
  const tope = 0.235 * 0.8 * 0.72;
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    v.x *= 1.28; // alargado en la dirección de la cadena
    v.y = THREE.MathUtils.clamp(v.y * 0.8, -tope, tope); // aplanado y tallado
    const giro = signo * TORSION * (v.x / largo); // retorcido sobre el eje largo
    const c = Math.cos(giro);
    const sn = Math.sin(giro);
    const y = v.y * c - v.z * sn;
    const z = v.y * sn + v.z * c;
    pos.setXYZ(i, v.x, y, z);
  }
  g.computeVertexNormals();
  return g;
}

/* Cierre de caja con su lengüeta, en el sitio de dos eslabones. */
function geometriaCierre() {
  const forma = new THREE.Shape();
  const w = 1.75;
  const h = 1.36;
  const r = 0.16;
  forma.moveTo(-w / 2 + r, -h / 2);
  forma.lineTo(w / 2 - r, -h / 2);
  forma.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  forma.lineTo(w / 2, h / 2 - r);
  forma.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  forma.lineTo(-w / 2 + r, h / 2);
  forma.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  forma.lineTo(-w / 2, -h / 2 + r);
  forma.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  const g = new THREE.ExtrudeGeometry(forma, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 5 });
  g.translate(0, 0, -0.15);
  g.rotateX(Math.PI / 2); // plano en XZ, grosor en Y
  return g;
}

/* Estudio oscuro con cajas de luz: el oro refleja sombra cálida y brillos nítidos. */
function crearEstudio(renderer) {
  const estudio = new THREE.Scene();
  const recursos = [];
  const plano = new THREE.PlaneGeometry(1, 1);
  const salaMat = new THREE.MeshBasicMaterial({ color: 0x1c140c, side: THREE.BackSide });
  const sala = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), salaMat);
  recursos.push(plano, salaMat, sala.geometry);
  estudio.add(sala);
  const caja = (ancho, alto, intensidad, x, y, z, color = 0xffffff) => {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensidad), side: THREE.DoubleSide });
    recursos.push(mat);
    const malla = new THREE.Mesh(plano, mat);
    malla.scale.set(ancho, alto, 1);
    malla.position.set(x, y, z);
    malla.lookAt(0, 0, 0);
    estudio.add(malla);
  };
  caja(11, 4, 4.5, 0, 10, 2); // cenital
  caja(3, 10, 3.2, -11, 2, 3, 0xfff0d8); // lateral cálida
  caja(6, 4, 1.3, -9, -1, 8, 0xffe2b8); // relleno bajo izquierdo
  caja(2, 10, 4, 11, 1, -4); // recorte por detrás
  caja(4, 8, 2.2, 10, 3, 6); // lateral derecha
  caja(20, 20, 0.5, 0, -9.5, 0, 0xffd9a0); // rebote del suelo
  caja(0.5, 14, 8, 5, 6, 7); // tira fina: el brillo largo
  caja(6, 0.4, 6, -4, 7, -6); // destello trasero
  caja(14, 6, 1.5, 0, 9, -9, 0xfff6ea); // difusor alto trasero
  const pmrem = new THREE.PMREMGenerator(renderer);
  const textura = pmrem.fromScene(estudio, 0.025).texture;
  pmrem.dispose();
  recursos.forEach((r) => r.dispose());
  return textura;
}

export function crearPulsera(contenedor, { tono = "oro18", animar = true, encuadre = 1, alListo } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  const pequena = window.matchMedia("(max-width: 767px)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pequena ? 1.75 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 0);
  const lienzo = renderer.domElement;
  lienzo.style.cssText = "display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab;outline:none";
  contenedor.appendChild(lienzo);

  const escena = new THREE.Scene();
  escena.environment = crearEstudio(renderer);
  escena.environmentIntensity = 1.1;
  const luz = new THREE.DirectionalLight(0xfff3e0, 0.9);
  luz.position.set(-4, 8, 6);
  escena.add(luz);

  const colorObjetivo = new THREE.Color(TONOS[tono] ?? TONOS.oro18);
  const metal = new THREE.MeshPhysicalMaterial({
    color: colorObjetivo.clone(),
    metalness: 1,
    roughness: 0.16,
  });

  /* Eslabones alrededor de un círculo: la cara tallada mira hacia fuera. */
  const huecosCierre = 2;
  const cantidad = ESLABONES - huecosCierre;
  const geometrias = [geometriaEslabon(1), geometriaEslabon(-1)];
  const grupos = geometrias.map((g) => new THREE.InstancedMesh(g, metal, Math.ceil(cantidad / 2)));
  const cuenta = [0, 0];
  const m = new THREE.Matrix4();
  const base = new THREE.Matrix4();
  const inclinar = new THREE.Matrix4();
  const t = new THREE.Vector3();
  const n = new THREE.Vector3();
  const b = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < cantidad; i++) {
    const angulo = ((i + huecosCierre / 2 + 0.5) / ESLABONES) * Math.PI * 2;
    n.set(Math.cos(angulo), Math.sin(angulo), 0); // hacia fuera
    t.set(-Math.sin(angulo), Math.cos(angulo), 0); // tangente
    base.makeBasis(t, n, b).setPosition(n.clone().multiplyScalar(RADIO_PULSERA));
    const par = i % 2;
    inclinar.makeRotationX(par ? INCLINACION : -INCLINACION);
    m.multiplyMatrices(base, inclinar);
    grupos[par].setMatrixAt(cuenta[par]++, m);
  }
  grupos.forEach((g, k) => {
    g.count = cuenta[k];
    g.instanceMatrix.needsUpdate = true;
  });
  const eslabones = new THREE.Group();
  eslabones.add(...grupos);

  const cierre = new THREE.Mesh(geometriaCierre(), metal);
  {
    const angulo = 0;
    n.set(Math.cos(angulo), Math.sin(angulo), 0);
    t.set(-Math.sin(angulo), Math.cos(angulo), 0);
    base.makeBasis(t, n, b).setPosition(n.clone().multiplyScalar(RADIO_PULSERA + 0.02));
    cierre.applyMatrix4(base);
  }

  const pulsera = new THREE.Group();
  pulsera.add(eslabones, cierre);
  const pivote = new THREE.Group();
  pivote.add(pulsera);
  escena.add(pivote);

  /* Cámara y encuadre */
  const camara = new THREE.PerspectiveCamera(24, 1, 0.1, 200);
  const RADIO = (RADIO_PULSERA + 0.8) * 1.02 * encuadre;
  const encuadrar = () => {
    const { clientWidth: ancho, clientHeight: alto } = contenedor;
    if (!ancho || !alto) return;
    renderer.setSize(ancho, alto, false);
    camara.aspect = ancho / alto;
    const vFov = THREE.MathUtils.degToRad(camara.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camara.aspect);
    const distancia = RADIO / Math.sin(Math.min(vFov, hFov) / 2);
    camara.position.set(0, distancia * 0.22, distancia);
    camara.lookAt(0, 0, 0);
    camara.updateProjectionMatrix();
    if (!animar) pintar();
  };

  /* Ratón y arrastre */
  const raton = { x: 0, y: 0 };
  const giro = { extra: 0, velocidad: 0 };
  let arrastre = null;
  const alMover = (e) => {
    const caja = contenedor.getBoundingClientRect();
    raton.x = THREE.MathUtils.clamp(((e.clientX - caja.left) / caja.width) * 2 - 1, -1.5, 1.5);
    raton.y = THREE.MathUtils.clamp(((e.clientY - caja.top) / caja.height) * 2 - 1, -1.5, 1.5);
    if (arrastre) {
      const dx = e.clientX - arrastre.x;
      arrastre.x = e.clientX;
      giro.extra += dx * 0.008;
      giro.velocidad = dx * 0.008;
    }
  };
  const alPulsar = (e) => {
    arrastre = { x: e.clientX };
    lienzo.style.cursor = "grabbing";
  };
  const alSoltar = () => {
    arrastre = null;
    lienzo.style.cursor = "grab";
  };
  window.addEventListener("pointermove", alMover, { passive: true });
  lienzo.addEventListener("pointerdown", alPulsar);
  window.addEventListener("pointerup", alSoltar);

  const reloj = new THREE.Timer();
  let tiempo = 0;
  let giroPulsera = 0;
  let impulso = 0;
  let listo = false;

  function pintar(instante) {
    reloj.update(instante);
    const dt = animar ? Math.min(reloj.getDelta(), 0.05) : 0;
    tiempo += dt;

    if (!arrastre) {
      giro.extra += giro.velocidad;
      giro.velocidad *= 0.93;
    }
    /* La pulsera gira sobre sí misma y se balancea; el ratón la inclina un poco. */
    giroPulsera += dt * 0.22;
    pulsera.rotation.z = giroPulsera + giro.extra;
    const suave = 1 - Math.exp(-dt * 3);
    const objetivoY = -1.2 + Math.sin(tiempo * 0.3) * 0.16 + raton.x * 0.2;
    const objetivoX = 0.16 + raton.y * 0.08;
    if (animar) {
      pivote.rotation.y += (objetivoY - pivote.rotation.y) * suave;
      pivote.rotation.x += (objetivoX - pivote.rotation.x) * suave;
    } else {
      pivote.rotation.set(0.16, -1.2, 0);
    }
    pivote.position.y = Math.sin(tiempo * 0.8) * 0.08;

    if (impulso > 0) {
      impulso = Math.max(0, impulso - dt * 2.2);
      pivote.scale.setScalar(1 + Math.sin((1 - impulso) * Math.PI) * 0.035);
    }
    metal.color.lerp(colorObjetivo, animar ? 1 - Math.exp(-dt * 5) : 1);
    escena.environmentRotation.y = tiempo * 0.1;

    renderer.render(escena, camara);
    if (!listo) {
      listo = true;
      alListo?.();
    }
  }

  let visible = false;
  const decidir = () => renderer.setAnimationLoop(animar && visible && !document.hidden ? pintar : null);
  const observador = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    decidir();
  });
  observador.observe(contenedor);
  document.addEventListener("visibilitychange", decidir);
  const alRedimensionar = new ResizeObserver(encuadrar);
  alRedimensionar.observe(contenedor);
  encuadrar();
  if (!animar) pintar();

  return {
    actualizar({ tono: nuevo } = {}) {
      if (nuevo && TONOS[nuevo] !== undefined) {
        const c = new THREE.Color(TONOS[nuevo]);
        if (!c.equals(colorObjetivo)) {
          colorObjetivo.copy(c);
          impulso = 1;
        }
      }
      if (!animar) pintar();
    },
    destruir() {
      renderer.setAnimationLoop(null);
      observador.disconnect();
      alRedimensionar.disconnect();
      document.removeEventListener("visibilitychange", decidir);
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("pointerup", alSoltar);
      lienzo.removeEventListener("pointerdown", alPulsar);
      geometrias.forEach((g) => g.dispose());
      grupos.forEach((g) => g.dispose());
      cierre.geometry.dispose();
      metal.dispose();
      escena.environment?.dispose();
      renderer.dispose();
      lienzo.remove();
    },
  };
}

