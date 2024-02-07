"use client";
import React, { useEffect, useRef } from "react";

const InfoBox: React.FC = () => {
  const foodDescriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    var the_container = document.getElementById("container");
    the_container.addEventListener("mousemove", function (e) {
      var popup = document.getElementById("popup");
      var mouseX = e.clientX;
      var mouseY = e.clientY;
      var popupWidth = popup.offsetWidth;
      var popupHeight = popup.offsetHeight;
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;

      // Show the popup for demonstration
      popup.style.display = "block";

      // Calculate new position
      var newX = mouseX - popupWidth / 2; // Center horizontally
      var newY = mouseY + 10; // Offset cursor a bit vertically

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

      // Check if the popup goes off the bottom of the screen
      if (newY + popupHeight > windowHeight) {
        newY = windowHeight - popupHeight - 10; // Adjust to stay within the screen
      }

      // Apply new position
      popup.style.top = newY + "px";
    });

    the_container.addEventListener("mouseleave", function () {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    });

    const updateDescription = (event) => {
      const foodDiv = event.target; // Use event target to get the hovered element
      if (foodDiv && foodDescriptionRef.current) {
        console.log(
          "Found: ",
          foodDiv.getAttribute("data-food-description") || ""
        );
        foodDescriptionRef.current.textContent =
          foodDiv.getAttribute("data-food-description") || "";
      }
    };

    // Select all elements with the class .pixel and attach the event listener to each
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
      pixel.addEventListener("mouseover", updateDescription);
    });

    // Cleanup to remove the event listener when the component unmounts
    return () => {
      pixels.forEach((pixel) => {
        pixel.removeEventListener("mouseover", updateDescription);
      });
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <div
        id="popup"
        className="z-10 absolute p-2 bg-black text-white max-w-full overflow-hidden"
      >
        <p ref={foodDescriptionRef} className="m-0"></p>
      </div>
      {/* <div
        id="popup-mobile"
        className="z-10 fixed bottom-0 left-0 right-0 p-2 bg-black text-white hidden max-w-full overflow-hidden lg:hidden"
      >
        <p ref={foodDescriptionRef} className="m-0"></p>
      </div> */}
    </>

    // <div className="info-box fixed bottom-0 left-1/2 -translate-x-1/2 bg-black text-white border border-black m-4 w-[600px] text-center z-10">
    //   <div className="border-b border-white">
    //     <h2 className="p-2 m-0 font-bold">FOOD</h2>
    //   </div>
    // <div className="border-black bg-white text-black p-2">
    //   <p ref={foodDescriptionRef} className="truncate m-0 px-8"></p>
    // </div>
    // </div>
  );
};

export default InfoBox;
