import "@testing-library/jest-dom";
import { describe, it, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import HeroPoster from "@/src/modules/Home/components/HeroPoster";

describe('HeroPoster', () => {
  it('Render HeroPoster', () => {
    const page = render(<HeroPoster />);
    expect(page).toMatchSnapshot();
  })
})