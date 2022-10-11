import { count } from "console";
import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { DivContainer, DivSpinner } from "../../../unit/ScrollPage";

const ModelAnimation = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [renderer, setRenderer] = useState();
  const [_camera, set_camera] = useState();
  const [scene] = useState(new THREE.Scene());
  const [_controls, setControls] = useState();

  const refContainer = useRef<any>();

  useEffect(() => {
    const parameters = {
      materialColor: "#ffeded",
    };
    const { current: container } = refContainer;

    if (container && !renderer) {
      // Texture
      const textureLoader = new THREE.TextureLoader();
      const gradientTexture = textureLoader.load("texture/gradients/3.jpg");
      const particlesTexture = textureLoader.load("texture/particles/1.png");

      // Material
      const material = new THREE.MeshToonMaterial({
        color: parameters.materialColor,
        gradientMap: gradientTexture,
      });

      // Object
      const objectDistance = 4;
      const mesh1 = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.4, 16, 60),
        material
      );
      const mesh2 = new THREE.Mesh(new THREE.SphereGeometry(1), material);

      const mesh3 = new THREE.Mesh(new THREE.SphereGeometry(1), material);
      const mesh4 = new THREE.Mesh(new THREE.SphereGeometry(1), material);
      const mesh5 = new THREE.Mesh(new THREE.SphereGeometry(1), material);

      mesh1.position.x = 3;
      mesh2.position.x = -3;
      mesh3.position.x = 3;
      mesh4.position.x = -3;
      mesh5.position.x = 3;

      mesh1.position.y = -objectDistance * 0;
      mesh2.position.y = -objectDistance * 1;
      mesh3.position.y = -objectDistance * 2;
      mesh4.position.y = -objectDistance * 3;
      mesh5.position.y = -objectDistance * 4;

      scene.add(mesh1, mesh2, mesh3, mesh4, mesh5);
      const sectionMeshes = [mesh1, mesh2, mesh3, mesh4, mesh5];

      //   Lights
      const directionLight = new THREE.DirectionalLight(0xffffffff, 1);
      directionLight.position.set(1, 1, 0);
      directionLight.castShadow = true;
      scene.add(directionLight);

      const ambientLight = new THREE.AmbientLight(0xffffffff, 0.5);
      scene.add(ambientLight);

      // Particle geometry
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 1000;
      const position = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        position[i * 3 + 0] = (Math.random() - 0.5) * 10;
        position[i * 3 + 1] =
          objectDistance * 0.5 -
          Math.random() * objectDistance * sectionMeshes.length;
        objectDistance * sectionMeshes.length;
        position[i * 3 + 2] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random();
      }
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(position, 3)
      );
      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );
      // Particles Material
      const particlesMaterial = new THREE.PointsMaterial();
      particlesMaterial.size = 0.1;
      particlesMaterial.sizeAttenuation = true;
      particlesMaterial.color = new THREE.Color("#ff88cc");
      particlesMaterial.transparent = true;
      particlesMaterial.alphaMap = particlesTexture;
      particlesMaterial.depthWrite = false;
      particlesMaterial.depthTest = false;
      particlesMaterial.blending = THREE.AdditiveBlending;
      particlesMaterial.vertexColors = true;

      //particles
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // size
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // camera
      // Camera Group
      const cameraGroup = new THREE.Group();
      scene.add(cameraGroup);

      // Base Camera
      const camera = new THREE.PerspectiveCamera(
        35,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.z = 6;

      cameraGroup.add(camera);

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      // Resize
      window.addEventListener("resize", () => {
        // update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        //update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
      //Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;

      // Scroll
      let scrollY = window.scrollY;
      let currentSection = 0;

      window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
        const newSection = Math.round(scrollY / sizes.height);

        if (newSection !== currentSection) {
          currentSection = newSection;

          gsap.to(sectionMeshes[currentSection].rotation, {
            duration: 1.5,
            ease: "power2.inOut",
            x: "+=6",
            y: "+=3",
            z: "+=1.5",
          });
        }
      });
      // Cursor
      const cursor = {};
      cursor.x = 0;
      cursor.y = 0;

      window.addEventListener("mousemove", (e) => {
        cursor.x = e.clientX / sizes.width - 0.5;
        cursor.y = e.clientY / sizes.height - 0.5;
      });
      // Animate
      const clock = new THREE.Clock();
      let previousTime = 0;

      const animate = () => {
        const colapsedTime = clock.getElapsedTime();
        const deltaTime = colapsedTime - previousTime;
        previousTime = deltaTime;

        // animate particles
        particles.rotation.y = colapsedTime * 2;

        // animate camera
        camera.position.y = (-scrollY / sizes.height) * objectDistance;

        const parallaxX = -cursor.x * 0.5;
        const parallaxY = -cursor.y * 0.5;

        cameraGroup.position.x +=
          (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
        cameraGroup.position.y +=
          (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

        // animate meshes
        for (const mesh of sectionMeshes) {
          mesh.rotation.x += 0.1 * deltaTime;
          mesh.rotation.y += 0.12 * deltaTime;
        }

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <DivContainer ref={refContainer}>{loading && <DivSpinner />}</DivContainer>
  );
};

export default ModelAnimation;