import {MemoryRouter, Routes, Route} from "react-router-dom";
import Welcome from "./Welcome"
import Start from "./Start"
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import {useState} from "react";

export default function App() {
    const [participants, setParticipants] = useState([]);

    const getParticipants = () => {
        fetch('http://localhost/api/participants/get').then(response => response.json()).then(json => setParticipants(json));
    }

    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/start" element={<Start participants={participants} setParticipants={setParticipants} />}/>
                <Route path="/stage1" element={<Stage1 participants={participants} setParticipants={setParticipants} getParticipants={getParticipants}/>}/>
                <Route path="/stage2" element={<Stage2 participants={participants} setParticipants={setParticipants} getParticipants={getParticipants}/>}/>
                <Route path="/stage3" element={<Stage3 participants={participants} setParticipants={setParticipants} getParticipants={getParticipants}/>}/>
            </Routes>
        </MemoryRouter>
    );
}