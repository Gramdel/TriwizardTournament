import {MemoryRouter, Routes, Route} from "react-router-dom";
import Welcome from "./Welcome"
import Start from "./Start"
import Stage1 from "./Stage1";

export default function App() {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/start" element={<Start/>}/>
                <Route path="/stage1" element={<Stage1/>}/>
            </Routes>
        </MemoryRouter>
    );
}