import React from "react";
import "@testing-library/jest-dom";

// Render <Image> sebagai <img> biasa saat testing
jest.mock("next/image", () => {
  const NextImage = React.forwardRef<
    HTMLImageElement,
    React.ImgHTMLAttributes<HTMLImageElement>
  >((props, ref) => React.createElement("img", { ref, ...props }));

  NextImage.displayName = "NextImage";

  return { __esModule: true, default: NextImage };
});


jest.mock('@react-hookz/web', () => ({
  useMediaQuery: () => [false],
  useDebouncedCallback: (fn: unknown) => fn,
}));
