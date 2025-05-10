import { useEffect } from 'react';

// Responsive root font-size logic (using rem only)
// const BASE_WIDTH = 1440;
// const BASE_FONT_SIZE = 1; // Base font size in rem
export function useResponsiveFontSize() {
    const BASE_WIDTH = 1440;
    // so this will run our code when the app loads and every time the window resizes.
    useEffect(() => {
        const setResponsiveFontSize = () => {
            //  To ensure the text remains readable and doesn’t become too small or too large, 
            //  the scale is restricted to a minimum of 0.5 and a maximum of 1.
        const scale = Math.min(Math.max(window.innerWidth / BASE_WIDTH, 0.5), 1);
        // the font size will never go below half of the base size, and on very large screens, it won’t exceed the original size.
        document.documentElement.style.fontSize = `${scale}rem`;
        };
        // all text and elements using rem units in our CSS will automatically scale up or down in proportion to the viewport
        setResponsiveFontSize(); 
        window.addEventListener("resize", setResponsiveFontSize);

        return () => window.removeEventListener("resize", setResponsiveFontSize);
  }, []);
}
