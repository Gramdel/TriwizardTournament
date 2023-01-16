import Scroll from "../img/scroll.png";
import Stamp from "../img/stamp.png";
import {Typography, Box, Button, Fade} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Participants from "./Participants";

const participants = [
    {name: "Гарри Поттер", school: "Хогвартс", points: 11},
    {name: "Флёр Делакур", school: "Шармбатон", points: 0},
    {name: "Виктор Крам", school: "Дурмстранг", points: 205},
    {name: "Седрик Диггори", school: "Хогвартс", points: 56},
];

export default function Stage2() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [fadeIn, setFadeIn] = useState(true);
    const openRef = useRef(null);

    useEffect(() => {
        if (openRef.current) {
            setFadeIn(false);
        }
        openRef.current = open;
    }, [open]);

    useEffect(() => {
        if (!fadeIn) {
            setTimeout(() => navigate("/stage2"), 250);
        }
    }, [fadeIn]);

    return (
        <>
            <Fade in={fadeIn} timeout={{enter: 500, exit: 500}}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        width: '60vw',
                        aspectRatio: '16 / 11',
                        minWidth: '1032px',
                        minHeight: '710px',
                        backgroundImage: `url(${Scroll})`,
                        backgroundSize: '100% 100%',
                        animation: 'big-magical-glow-blue 2s infinite alternate',
                    }}>
                        <Box sx={{
                            pt: '12%',
                            px: '12%',
                            height: '100%',
                            boxSizing: 'border-box',
                        }}>
                            <Typography variant="h3" sx={{
                                color: 'black',
                                textAlign: 'center',
                                fontFamily: 'Harry Potter',
                                letterSpacing: '0.2rem',
                                height: '12%',
                            }}>
                                ПЕРВЫЙ ЭТАП
                            </Typography>
                            <Box sx={{
                                height: '60%',
                            }}>

                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'right',
                                height: '12%',
                            }}>
                                <Button onClick={() => setOpen(true)} sx={{
                                    backgroundImage: `url(${Stamp})`,
                                    backgroundSize: '100% 100%',
                                    color: '#7f120c',
                                    fontFamily: 'Harry Potter',
                                    fontWeight: 'bold',
                                    fontSize: '2.125rem',
                                    letterSpacing: '0.2rem',
                                    px: '1.5rem',
                                    transform: 'rotate(-3deg)',
                                }}>
                                    ВТОРОЙ ЭТАП➤
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Fade>
            <Participants open={open} setOpen={setOpen} participants={participants}/>
        </>
    );
}