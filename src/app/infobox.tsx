"use client";
import React, { useEffect, useRef } from "react";

const InfoBox: React.FC = () => {
  const foodDescriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    var the_container = document.getElementById("container");
    if (!the_container) return;
    the_container.addEventListener("mousemove", function (e) {
      var popup = document.getElementById("popup");
      if (!popup) return;

      var mouseX = e.clientX;
      var mouseY = e.clientY;
      var popupWidth = popup.offsetWidth;
      var popupHeight = popup.offsetHeight;
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var scrollY = window.scrollY;

      // Show the popup for demonstration
      popup.style.display = "block";

      // Calculate new position
      var newX = mouseX - popupWidth / 2; // Center horizontally
      var newY = mouseY + scrollY + 10; // Offset cursor a bit vertically, adjusted for scroll

      // Cap the width to the screen width if it's too big
      if (popupWidth > windowWidth) {
        popup.style.width = windowWidth + "px";
        popup.style.left = "0";
      } else {
        // Check if the popup goes off the right side of the screen
        if (newX + popupWidth > windowWidth) {
          newX = windowWidth - popupWidth - 10; // Adjust to stay within the screen
        } else if (newX < 0) {
          newX = 10; // Adjust to stay within the screen
        }
        popup.style.width = ""; // Reset width if it fits within the screen
        popup.style.left = newX + "px";
      }

      // Apply new position
      popup.style.top = newY + "px";
    });

    the_container.addEventListener("mouseleave", function () {
      var popup = document.getElementById("popup");
      if (!popup) return;
      popup.style.display = "none";
    });

    const updateDescription = (event: MouseEvent) => {
      const foodDiv = event.target as HTMLElement; // Use event target to get the hovered element
      if (foodDiv && foodDescriptionRef.current) {
        foodDescriptionRef.current.textContent =
          foodDiv.getAttribute("data-food-description") || "";
      }
    };

    // Select all elements with the class .pixel and attach the event listener to each
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
      //@ts-ignore
      pixel.addEventListener("mouseover", updateDescription);
    });

    // Cleanup to remove the event listener when the component unmounts
    return () => {
      pixels.forEach((pixel) => {
        //@ts-ignore
        pixel.removeEventListener("mouseover", updateDescription);
      });
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    // Check initially
    checkMobile();
    // Check on resize
    window.addEventListener("resize", checkMobile);
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile === null) return null;

  return isMobile ? (
    <div
      id="popup-mobile"
      className="z-10 fixed bottom-0 left-0 right-0 p-2 bg-black text-white max-w-full overflow-hidden"
    >
      <p ref={foodDescriptionRef} className="m-0"></p>
    </div>
  ) : (
    <div
      id="popup"
      className="z-10 absolute p-2 bg-black text-white max-w-full overflow-hidden"
    >
      <p ref={foodDescriptionRef} className="m-0"></p>
    </div>
  );
};

export default InfoBox;
