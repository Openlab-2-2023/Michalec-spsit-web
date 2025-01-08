import * as THREE from "https://cdn.skypack.dev/three@v0.122.0";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rgb(r, g, b) {
  return new THREE.Vector3(r, g, b);
}

document.addEventListener("DOMContentLoaded", function () {
  // Background stuff
  // https://codepen.io/smpnjn/pen/pobGMKp
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement)
  document.body.insertBefore(renderer.domElement, document.body.firstChild);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  let vCheck = false;

  camera.position.z = 5;

  var randomisePosition = new THREE.Vector2(1, 2);

  var R = function (x, y, t) {
    return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
  };

  var G = function (x, y, t) {
    return Math.floor(
      192 +
      64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
    );
  };

  var B = function (x, y, t) {
    return Math.floor(
      192 +
      64 *
      Math.sin(
        5 * Math.sin(t / 9) +
        ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
      )
    );
  };
  let sNoise = document.querySelector("#snoise-function").textContent;
  let geometry = new THREE.PlaneGeometry(window.innerWidth / 2, 400, 100, 100);
  let material = new THREE.ShaderMaterial({
    uniforms: {
      u_bg: { type: "v3", value: rgb(208, 38, 38) }, // red
      u_bgMain: { type: "v3", value: rgb(170, 199, 14) }, // yellow
      u_color1: { type: "v3", value: rgb(58, 175, 223) }, // light blue
      u_color2: { type: "v3", value: rgb(22, 144, 16) }, // dark green
      u_time: { type: "f", value: 30 },
      u_randomisePosition: { type: "v2", value: randomisePosition },
    },
    fragmentShader:
      sNoise + document.querySelector("#fragment-shader").textContent,
    vertexShader: sNoise + document.querySelector("#vertex-shader").textContent,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-200, 270, -280);
  mesh.scale.multiplyScalar(4);
  mesh.rotationX = -1.0;
  mesh.rotationY = 0.0;
  mesh.rotationZ = 0.1;
  scene.add(mesh);

  renderer.render(scene, camera);
  let t = 0;
  let j = 0;
  let x = randomInteger(0, 32);
  let y = randomInteger(0, 32);
  const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    mesh.material.uniforms.u_randomisePosition.value = new THREE.Vector2(j, j);

    mesh.material.uniforms.u_color1.value = new THREE.Vector3(
      R(x, y, t / 2),
      G(x, y, t / 2),
      B(x, y, t / 2)
    );

    mesh.material.uniforms.u_time.value = t;
    if (t % 0.1 == 0) {
      if (vCheck == false) {
        x -= 1;
        if (x <= 0) {
          vCheck = true;
        }
      } else {
        x += 1;
        if (x >= 32) {
          vCheck = false;
        }
      }
    }

    // Increase t by a certain value every frame
    j = j + 0.001;
    t = t + 0.005;
  };
  animate();

  // Background stuff

  const top_pagebar = document.querySelectorAll(".top-pagebar a");
  const pages = document.querySelectorAll('.page > div[id^="page-"]');
  const left_sidebar = document.querySelectorAll(
    ".left-sidebar .side-wrapper a"
  );
  const toggleSidebarButton = document.getElementById("toggleSidebar");
  const contents = document.querySelectorAll(".content > div");
  const toggleButton = document.querySelector(".dark-light");
  const sidebars = document.querySelectorAll(".sidebar");
  const content = document.querySelector(".content");

  // Check system color scheme preference and apply light-mode class if needed
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    document.body.classList.add("light-mode");
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    //toggleSidebar();
  });

  // Hide sidebar by default in portrait orientation
  if (window.matchMedia("(orientation: portrait)").matches) {
    sidebars.forEach((sidebar) => {
      sidebar.classList.add("hidden");
    });
    content.style.width = "100%";
  }

  // Function to toggle sidebar visibility
  toggleSidebarButton.addEventListener("click", () => {
    sidebars.forEach((sidebar) => {
      sidebar.classList.toggle("hidden");
      if (sidebar.classList.contains("hidden")) {
        content.style.width = "100%";
      } else {
        content.style.width = "";
      }
    });
    toggleSidebarButton.classList.toggle("clicked");
  });

    top_pagebar.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
  
      // Remove 'is-active' class from all top_pagebar links
      top_pagebar.forEach((link) => link.classList.remove("is-activeT"));
  
      // Add 'is-active' class to the clicked top_pagebar link
      this.classList.add("is-activeT");
  
      // Hide all page sections with animation
      pages.forEach((page) => {
        page.classList.add("hidden");
        setTimeout(() => {
          page.style.display = "none";
        }, 500); // Match the duration of the CSS transition
      });
  
      // Show the corresponding page section with animation
      const targetElement = document.getElementById(
        this.id.replace("link-", "page-")
      );
      setTimeout(() => {
        targetElement.style.display = "flex";
        targetElement.classList.remove("hidden");
        targetElement.lastElementChild.firstElementChild.style.display = "unset";
      }, 500); // Match the duration of the CSS transition
  
      // Set the first element in the left-sidebar as active
      setFirstElementActive(targetElement);
    });
  });
  
  left_sidebar.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (this.hasAttribute("link")) {
        window.open(this.getAttribute("link"), "_blank"); // Open the link in a new tab
      } else {
        event.preventDefault();
  
        // Remove active class from all links
        left_sidebar.forEach((link) => link.classList.remove("is-active"));
  
        // Add active class to the clicked link
        this.classList.add("is-active");
  
        // Hide all content sections with animation
        contents.forEach((content) => {
          content.classList.add("hidden");
          setTimeout(() => {
            content.style.display = "none";
          }, 500); // Match the duration of the CSS transition
        });
  
        // Show the corresponding content section with animation
        const content = document.getElementById(
          this.id.replace("link-", "content-")
        );
        if (content) {
          setTimeout(() => {
            content.style.display = "unset";
            content.classList.remove("hidden");
          }, 500); // Match the duration of the CSS transition
        } else {
          console.log("No content found");
        }
      }
    });
  });

  // Function to set the first element in left-sidebar as active
    function setFirstElementActive(targetElement) {
    const firstLink = targetElement.querySelector(
      ".left-sidebar .side-wrapper a"
    );
  
    // Check if firstLink is null
    // if (!firstLink) {
    //   toggleSidebarButton.style.display = "none";
      
    //   return; // Exit the function early
    // }
  
    // Remove active class from all links
    left_sidebar.forEach((link) => link.classList.remove("is-active"));
    // Add active class to the first link
    firstLink.classList.add("is-active");
  }
});
