# GrowMeOrganic - REACT.js Intern Assignment

A React application built with Vite and TypeScript that displays artwork data from the Art Institute of Chicago API with server-side pagination and persistent row selection.

## 🔗 Live Link

[View Live Demo](#)

## Features

- **Dynamic Data Table**: Displays artwork information including title, artist, place of origin, inscriptions, and dates
- **Server-Side Pagination**: Efficient pagination that fetches data from the API page-by-page
- **Persistent Row Selection**: Selected rows remain selected even when navigating between pages
- **Multi-Row Selection**: Select/deselect individual rows or all rows on the current page
- **Modern UI**: Built with PrimeReact DataTable components and custom styling

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Components**: PrimeReact DataTable
- **API**: Art Institute of Chicago API (https://api.artic.edu/api/v1/artworks)

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

The application will start on `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## How It Works

### Data Fetching

- Fetches artwork data from the Art Institute of Chicago API
- Uses server-side pagination to load 12 rows per page
- Only stores current page data in memory to optimize performance

### Row Selection

- Tracks selected row IDs across all pages
- Maintains selection state when navigating between pages
- Uses a Set-based approach to efficiently manage selections without storing full row objects

## Key Implementation Details

- Selection state persists via two Set collections:
  - `selectedIds`: Stores IDs of explicitly selected rows
  - `deselectedIds`: Stores IDs of explicitly deselected rows
- No prefetching of other pages to prevent memory issues
- Responsive design that adapts to different screen sizes

## Display Fields

Each artwork card displays:

- **Title** - Name of the artwork
- **Place of Origin** - Geographic origin
- **Artist** - Artist name/display
- **Inscriptions** - Inscriptions on the artwork
- **Start Date** - Earliest date associated with the work
- **End Date** - Latest date associated with the work

## Performance Considerations

- Only current page data is stored in state
- Efficient selection tracking using Sets instead of arrays
- Server-side pagination reduces network overhead
- No data prefetching to maintain optimal memory usage

## Screenshot

![Screenshot 1](#) ![Screenshot 2](#)