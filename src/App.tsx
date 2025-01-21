import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Introduce from "./pages/introduce";
import QAMSimulator from "./pages/QAMSimulator";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 w-full">
        <Routes>
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/" element={<QAMSimulator />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
