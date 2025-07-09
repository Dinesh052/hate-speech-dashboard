# Hate Speech Analytics Dashboard

This project is a multi-page web application built with React, featuring interactive and clean visualizations of Twitter and Reddit hate speech data.

## Features

- **Dashboard**: Overview of key metrics and platform comparisons.
- **Twitter Analysis**: Detailed visualizations of Twitter hate speech, including classification distribution, timeline analysis, and top words.
- **Reddit Analysis**: Visualizations of Reddit hate speech, including conversation flow, subreddit analysis, and intervention effectiveness.
- **Comparative Analysis**: Cross-platform trends and intervention strategy comparisons.
- **Interactive Charts**: Powered by Recharts with animations and hover effects.
- **Clean and Aesthetic UI**: Modern design with smooth transitions and responsive layout.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Navigate to the project directory:**
    ```bash
    cd hate-speech-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the data processing script:**
    This script processes the raw Twitter and Reddit datasets and generates a `processed_data.json` file used by the frontend.
    ```bash
    python3 data_processor.py
    ```
    *Note: Ensure you have Python 3 and pandas installed (`pip install pandas`). The `data_processor.py` file is located in the root of the project directory.*

4.  **Start the development server:**
    ```bash
    npm run dev -- --host
    ```

    The application will be accessible at `http://localhost:5173/` (or another port if 5173 is in use).

## Project Structure

```
hate-speech-dashboard/
├── public/
├── src/
│   ├── assets/             # Contains raw and processed data (e.g., twitter_data.csv, reddit.csv, processed_data.json)
│   ├── components/         # Reusable React components, including visualization components
│   │   ├── ComparativeVisualizations.jsx
│   │   ├── EnhancedCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── RedditVisualizations.jsx
│   │   └── TwitterVisualizations.jsx
│   ├── App.css             # Global styles and Tailwind CSS imports
│   ├── App.jsx             # Main application component with routing and data loading
│   ├── index.css           # Base CSS
│   └── main.jsx            # Entry point for the React application
├── data_processor.py       # Python script for data processing
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── pnpm-lock.yaml          # Lock file for dependencies
├── vite.config.js          # Vite bundler configuration
└── README.md               # This file
```

## Technologies Used

-   **React**: Frontend JavaScript library
-   **Vite**: Fast build tool for modern web projects
-   **Tailwind CSS**: Utility-first CSS framework for styling
-   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS
-   **Lucide Icons**: Open-source icon library
-   **Recharts**: Composable charting library built with React and D3
-   **Framer Motion**: Animation library for React
-   **Python Pandas**: For data processing and analysis

## Data Sources

-   **Twitter Hate Speech Dataset**: `twitter_data.csv` (from GitHub: `sidneykung/twitter_hate_speech_detection`)
-   **Reddit Hate Speech Dataset**: `reddit.csv` (from GitHub: `jing-qian/A-Benchmark-Dataset-for-Learning-to-Intervene-in-Online-Hate-Speech`)

## Deployment

This application can be deployed as a static site. After building the project (`npm run build`), the output will be in the `dist` directory.

