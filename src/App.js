import "./App.css";
import Auth from "./components/auth/Auth";
import Movies from "./components/movies/Movies";
import Upload from "./components/uploadfile/Upload";

function App() {
  return (
    <div className="App">
      <Auth />
      <Movies />
      <Upload />
    </div>
  );
}

export default App;
