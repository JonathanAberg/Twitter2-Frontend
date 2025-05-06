import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { About } from "./components/About";
import "./styles/general.css";
import Inlogning from "./inlogning/inlogning";
import Registering from "./inlogning/registrering";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/User")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [data]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Inlogning data={data} />} />
            <Route path="/register" element={<Registering />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
