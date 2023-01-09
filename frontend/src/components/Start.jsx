import Scroll from "../img/scroll.png";
import Stamp from "../img/stamp.png";
import {Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Fade} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Participants from "./Participants";

const hogwarts = [
    'Гарри Поттер',
    'Седрик Диггори',
    'Рон Уизли',
    'Гермиона Грейнджер',
    'Драко Малфой'
];

const beauxbatons = [
    'Флёр Делакур',
    'Николас Фламель',
    'Орели Дюмон',
    'Селин Кастильон',
    'Винсент де Трефле-Пике'
];

const durmstrang = [
    'Виктор Крам',
    'Геллерт Грин-де-Вальд',
    'Игорь Каркаров',
    'Баглан Уэллнелли',
    'Груффыд Уэллнелли'
];

const getRows = () => {
    const result = [];
    for (let i = 0; i < 5; i++) {
        result.push([hogwarts[i], beauxbatons[i], durmstrang[i]]);
    }
    return result;
}

const participants = [
    {name: "Гарри Поттер", school: "Хогвартс", points: 11},
    {name: "Флёр Делакур", school: "Шармбатон", points: 0},
    {name: "Виктор Крам", school: "Дурмстранг", points: 205},
    {name: "Седрик Диггори", school: "Хогвартс", points: 56},
];


export default function Start() {
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
            setTimeout(() => navigate("/stage1"), 250);
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
                                СПИСОК ЖЕЛАЮЩИХ УЧАСТВОВАТЬ
                            </Typography>
                            <Box sx={{
                                height: '60%',
                            }}>
                                <Table sx={{
                                    border: '1px solid black',
                                    'th, td': {
                                        border: '1px solid black',
                                        fontSize: 'large',
                                    },
                                    'th': {
                                        fontWeight: 'bold',
                                    },
                                }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Хогвартс</TableCell>
                                            <TableCell align="center">Шармбатон</TableCell>
                                            <TableCell align="center">Дурмстранг</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getRows().map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row[0]}</TableCell>
                                                <TableCell>{row[1]}</TableCell>
                                                <TableCell>{row[2]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
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
                                    ЖЕРЕБЬЕВКА➤
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