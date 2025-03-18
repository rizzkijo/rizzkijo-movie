This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## General Information

Frontend demo: [https://hometest-virtualspirit.vercel.app/](https://hometest-virtualspirit.vercel.app/)

Latest branch: `master`

## Requirements
- NodeJS v18 or above
- Yarn / NPM
- TMDB Public API: [https://developer.themoviedb.org/docs/getting-started](https://developer.themoviedb.org/docs/getting-started)

## Configurations
Setup environment variables in `.env`. See `.env.example`.

## Installation
1. Install dependencies: `yarn install` or `npm install`
2. Dev mode: `yarn dev` or `npm run dev`
3. Prod mode: `yarn build` or `npm run build` then `yarn start` or `npm start`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Movie App - Additional Features

This project is part of a coding challenge that requires adding at least one feature to enhance the user experience. Below are the additional features implemented:

## 1. Movie Detail Page

### Description
A **Movie Detail Page** was added to provide users with detailed information about a selected movie, including its title, description, release date, rating, and poster. This improves the user experience by allowing users to explore more details about a movie.

### How to Use
- Click on a movie from the **search results** or **home page** or **category page** (Now Playing & Top Rated).
- The app will navigate to the **Movie Detail Page**, displaying detailed information about the selected movie.

### Implementation Details
- Fetched movie details from **TMDB API** using `React Query`.
- Displayed key movie information such as **title, overview, release date, rating, and poster**.
- Used **Next.js dynamic routing (`pages/movie/[id].tsx`)** to handle individual movie pages.

### Testing
- Manually tested to ensure data is correctly fetched and displayed.

---

## 2. Search Pagination

### Description
A simple **pagination feature** but usefull was added to the search results page, allowing users to navigate through multiple pages of search results. This improves usability when searching for movies.

### How to Use
- When searching for a movie (min. 3 characters), results are displayed in **pages**.
- Users can click "Next" or "Previous" buttons to navigate between result pages, users can also go directly to a specific page number by changing the destination page number in the input provided.

### Implementation Details
- Utilized **TMDB API’s pagination feature** using the `page` query parameter.
- Added "Next" and "Previous" buttons to update the current page.
-	Added page number input that displays the current page, and can be changed to a specific destination page number.
- The current page is managed using **React state (`useState`)** and updated dynamically.

### Testing
- Manually tested to ensure pagination works correctly when navigating between pages.

---
