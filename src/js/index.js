document.addEventListener("DOMContentLoaded", function () {
  const top_pagebar = document.querySelectorAll(".top-pagebar a");
  const pages = document.querySelectorAll('.page > div[id^="page-"]');
  const left_sidebar = document.querySelectorAll(
    ".left-sidebar .side-wrapper a"
  );
  const toggleSidebarButton = document.getElementById("toggleSidebar");
  const contents = document.querySelectorAll(".content > div");
  const toggleButton = document.querySelector(".dark-light");
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggleSidebar();
  });

  // Function to toggle sidebar visibility
  toggleSidebarButton.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    if (toggleSidebarButton.classList.contains("clicked")) {
      toggleSidebarButton.classList.remove("clicked");
    } else {
      toggleSidebarButton.classList.toggle("clicked");
    }
    if (sidebar.classList.contains("hidden")) {
      content.style.width = "100%";
    } else {
      content.style.width = "";
    }
  });

  top_pagebar.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Remove 'is-active' class from all top_pagebar links
      top_pagebar.forEach((link) => link.classList.remove("is-activeT"));

      // Add 'is-active' class to the clicked top_pagebar link
      this.classList.add("is-activeT");

      // Hide all page sections
      pages.forEach((page) => (page.style.display = "none"));

      // Show the corresponding page section
      const targetElement = document.getElementById(
        this.id.replace("link-", "page-")
      );
      targetElement.style.display = "flex";
      targetElement.lastElementChild.firstElementChild.style.display = "unset";

      // Set the first element in the left-sidebar as active
      setFirstElementActive(targetElement);
    });
  });

  left_sidebar.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (this.hasAttribute("href")) {
        // Open the link in a new tab
        window.open(this.getAttribute("href"), "_blank");
      } else {
        event.preventDefault();

        // Remove active class from all links
        left_sidebar.forEach((link) => link.classList.remove("is-active"));

        // Add active class to the clicked link
        this.classList.add("is-active");

        // Hide all content sections
        contents.forEach((content) => (content.style.display = "none"));

        // Show the corresponding content section
        const content = document.getElementById(
          this.id.replace("link-", "content-")
        );
        if (content) {
          content.style.display = "unset";
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

    // Remove active class from all links
    left_sidebar.forEach((link) => link.classList.remove("is-active"));
    //left_pagebar[0].classList.add('is-active');
    // Add active class to the first link
    firstLink.classList.add("is-active");
  }
});
