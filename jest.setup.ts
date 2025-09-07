import "@testing-library/jest-dom";

jest.mock('@react-hookz/web', () => ({
  useMediaQuery: () => [false],
  useDebouncedCallback: (fn: unknown) => fn,
}));
