import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieCard from "@/src/components/movieCard";

test("renders details with year, rating, and adult badge", () => {
  render(
    <MovieCard
      data={{
        adult: true,
        id: 112233,
        original_title: "The Dark Knight",
        original_language: "en",
        poster_path: "/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg",
        release_date: "2008-07-18",
        title: "The Dark Knight",
        vote_average: 9.1,
        vote_count: 200,
      }}
      showDetails
      indexNo={0}
    />
  );

  // cari elemen card, biasanya <a> punya role="link"
  const card = screen.getByRole("link", { name: /the dark knight/i });

  // karena ini Next.js/React Router, biasanya nggak redirect beneran di test,
  // tapi kita bisa cek link targetnya
  expect(card).toHaveAttribute("href", "/112233_the-dark-knight");
  expect(screen.getByRole("heading", { name: /the dark knight/i })).toBeInTheDocument();
  expect(screen.getByText("2008")).toBeInTheDocument();
  expect(screen.getByText("9.1")).toBeInTheDocument();
  expect(screen.getByText("20+")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument(); // indexNo + 1
});

test("does not render badges if release_date, vote_average=0, and adult=false", () => {
  render(
    <MovieCard
      data={{
        adult: false,
        id: 112233,
        original_title: "The Dark Knight",
        original_language: "en",
        poster_path: "/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg",
        release_date: "",
        title: "The Dark Knight",
        vote_average: 0,
        vote_count: 0,
      }}
      showDetails
    />
  );

  expect(screen.queryByText(/20\+/)).not.toBeInTheDocument();
  expect(screen.queryByText(/2008/)).not.toBeInTheDocument();
  expect(screen.queryByText("0")).not.toBeInTheDocument();
});

test("renders placeholder image if original image fails to load (no details)", async () => {
  render(
    <MovieCard
      data={{
        adult: false,
        id: 112233,
        original_title: "The Dark Knight",
        original_language: "en",
        poster_path: "",
        release_date: "2025-07-18",
        title: "The Dark Knight",
        vote_average: 8.2,
        vote_count: 200,
      }}
    />
  );

  // ambil img awal (dengan alt = title)
  const img = screen.getByRole("img", { name: /the dark knight/i });

  // trigger error pada image
  fireEvent.error(img);

  // tunggu sampai src berubah ke placeholder
  await waitFor(() => {
    expect(
      screen.getByRole("img", { name: /the dark knight/i })
    ).toHaveAttribute("src", expect.stringContaining("/assets/images/backdrop-placeholder.jpg"));
  });

  // tidak ada detail section
  expect(screen.queryByRole("heading", { name: /the dark knight/i })).not.toBeInTheDocument();
});
