import "./App.css";
import VideoPreview from "./Components/VideoPreview";

function App() {
    return (
        <div className="App">
            <header className="header">Video Recorder</header>
            <section>
                <VideoPreview />
            </section>
        </div>
    );
}

export default App;
