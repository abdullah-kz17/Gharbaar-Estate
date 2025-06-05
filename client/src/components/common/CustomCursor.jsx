import React, { useEffect } from "react";
import "./CustomCursor.css"; // CSS file created in the next step

const CustomCursor = () => {
    useEffect(() => {
        const coords = { x: 0, y: 0 };
        const circles = document.querySelectorAll(".circle");

        const colors = [
            "#4f46e5", "#5a3fea", "#6548ec", "#7051ef", "#7b5af2",
            "#8663f4", "#916cf6", "#9c75f9", "#a77efb", "#b287fe",
            "#bc90ff", "#c699ff", "#d0a2ff", "#dbabff", "#e5b4ff",
            "#efbdff", "#f9c6ff", "#fbc2ff", "#f9b6ff", "#f2a6ff"
        ];

        circles.forEach((circle, index) => {
            circle.x = 0;
            circle.y = 0;
            circle.style.backgroundColor = colors[index % colors.length];
        });

        window.addEventListener("mousemove", (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });

        function animateCircles() {
            let x = coords.x;
            let y = coords.y;

            circles.forEach((circle, index) => {
                circle.style.left = x - 12 + "px";
                circle.style.top = y - 12 + "px";
                circle.style.scale = (circles.length - index) / circles.length;
                circle.x = x;
                circle.y = y;

                const nextCircle = circles[index + 1] || circles[0];
                x += (nextCircle.x - x) * 0.3;
                y += (nextCircle.y - y) * 0.3;
            });

            requestAnimationFrame(animateCircles);
        }

        animateCircles();
    }, []);

    return (
        <>
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="circle" />
            ))}
        </>
    );
};

export default CustomCursor;
