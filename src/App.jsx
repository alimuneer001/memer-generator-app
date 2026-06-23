import { useEffect, useState } from 'react'

function App() {
  // State stores information that can change on the page.
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [memes, setMemes] = useState([])
  const [randomImage, setRandomImage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // useEffect runs after the page appears.
  // Here, it gets meme pictures from the Imgflip API.
  useEffect(() => {
    async function getMemes() {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes')
        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error('Could not load meme pictures.')
        }

        const memeList = result.data.memes
        setMemes(memeList)
        setRandomImage(memeList[0].url)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    getMemes()
  }, [])

  // This effect starts auto rotation after the memes are loaded.
  useEffect(() => {
    // Do not start the timer if there are no memes yet.
    if (memes.length === 0) {
      return
    }

    const intervalId = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * memes.length)
      const randomMeme = memes[randomNumber]

      setRandomImage(randomMeme.url)
    }, 5000)

    // Cleanup stops the timer when the component is removed.
    return () => {
      clearInterval(intervalId)
    }
  }, [memes])

  // Pick a random picture when the button is clicked.
  function getNewMeme() {
    const randomNumber = Math.floor(Math.random() * memes.length)
    const randomMeme = memes[randomNumber]
    setRandomImage(randomMeme.url)
  }

  return (
    <main className="app">
      <header>
        <h1>Meme Generator</h1>
        <p>Type your joke and choose a random picture.</p>
      </header>

      <section className="meme-maker">
        <div className="form">
          <label htmlFor="topText">Top text</label>
          <input
            id="topText"
            type="text"
            placeholder="When the code works..."
            value={topText}
            onChange={(event) => setTopText(event.target.value)}
          />

          <label htmlFor="bottomText">Bottom text</label>
          <input
            id="bottomText"
            type="text"
            placeholder="...on the first try"
            value={bottomText}
            onChange={(event) => setBottomText(event.target.value)}
          />

          <button onClick={getNewMeme} disabled={isLoading || memes.length === 0}>
            {isLoading ? 'Loading...' : 'Get a new meme'}
          </button>
        </div>

        <div className="preview">
          {error && <p className="message error">{error}</p>}
          {isLoading && <p className="message">Loading meme pictures...</p>}

          {!isLoading && !error && (
            <div className="meme">
              <img src={randomImage} alt="Random meme template" />
              <p className="meme-text top">{topText}</p>
              <p className="meme-text bottom">{bottomText}</p>
            </div>
          )}
        </div>
      </section>

      <footer>Made with React and the Imgflip API</footer>
    </main>
  )
}

export default App
