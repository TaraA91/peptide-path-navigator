import VideoTemplate from './VideoTemplate'

function App() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="w-full h-full relative" style={{ aspectRatio: '16/9', maxHeight: '100vh', maxWidth: '177.78vh' }}>
        <VideoTemplate />
      </div>
    </div>
  )
}

export default App