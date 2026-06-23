# Meme Generator

A simple meme generator built with React. This project is designed for beginners who are learning React state, events, APIs, and `useEffect`.

## Features

- Loads popular meme images from the Imgflip API
- Adds custom top and bottom text
- Shows text changes instantly on the meme
- Selects a random meme using a button
- Automatically selects a new meme every 5 seconds
- Works on desktop and mobile screens
- Displays loading and error messages

## Technologies Used

- React
- JavaScript
- CSS
- Vite
- Imgflip API

## Run the Project

First, open a terminal inside the project folder and install the packages:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address shown in the terminal, usually:

```text
http://localhost:5173
```

## Other Commands

Check the code for common problems:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
meme-generator-app/
├── src/
│   ├── App.jsx       # Meme generator logic and page content
│   ├── index.css     # Page design and responsive styles
│   └── main.jsx      # Starts the React application
├── index.html        # Main HTML file
├── package.json      # Project packages and commands
└── README.md         # Project information
```

The `dist` folder is created automatically when `npm run build` is used. You normally do not need to edit files inside it.

## How the App Works

When the app opens, `useEffect` fetches meme images from the Imgflip API. The images are saved in the `memes` state.

The app uses separate state values for:

- Top text
- Bottom text
- Meme list
- Current random image
- Loading status
- Error message

The **Get a new meme** button chooses a random image from the meme list. Another `useEffect` uses `setInterval` to choose a new image every 5 seconds.

The interval is stopped with `clearInterval` inside the cleanup function:

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    // Select a random meme here
  }, 5000)

  return () => {
    clearInterval(intervalId)
  }
}, [memes])
```

## React Concepts Practiced

- Components
- JSX
- `useState`
- `useEffect`
- Fetching API data
- Button click events
- Input change events
- Conditional rendering
- `setInterval` and cleanup functions
- Responsive CSS

## API

This project gets its meme templates from:

```text
https://api.imgflip.com/get_memes
```

No API key is required for this endpoint.

## Ideas for More Practice

- Add a pause button for auto rotation
- Allow users to upload their own image
- Add text color and font-size controls
- Add a download meme button
- Prevent the same meme from appearing twice in a row

## Credits

Meme templates are provided by the [Imgflip API](https://imgflip.com/api).
