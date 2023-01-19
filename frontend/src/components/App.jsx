import {MemoryRouter, Routes, Route} from "react-router-dom";
import Welcome from "./Welcome"
import Start from "./Start"
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import {useState} from "react";
import {SnackbarProvider} from "notistack";

export default function App() {
    const [participants, setParticipants] = useState([]);
    const [schools, setSchools] = useState([]);

    const updateParticipants = () => {
        fetch('http://localhost/api/participants/update', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(participants)
        }).then();
    }

    const getParticipants = () => {
        fetch('http://localhost/api/participants/get').then(response => response.json()).then(json => setParticipants(json));
    }

    const participantProps = {
        participants: participants,
        setParticipants: setParticipants,
        getParticipants: getParticipants,
        updateParticipants: updateParticipants,
        schools: schools,
        setSchools: setSchools
    }

    return (
        <SnackbarProvider maxSnack={4} hideIconVariant>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                    <Route path="/start" element={
                        <Start {...participantProps}/>
                    }/>
                    <Route path="/stage1" element={
                        <Stage1 {...participantProps}/>
                    }/>
                    <Route path="/stage2" element={
                        <Stage2 {...participantProps}/>
                    }/>
                    <Route path="/stage3" element={
                        <Stage3 {...participantProps}/>
                    }/>
                </Routes>
            </MemoryRouter>
        </SnackbarProvider>
    );
}