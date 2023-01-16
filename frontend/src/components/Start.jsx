import Scroll from "../img/scroll.png";
import Stamp from "../img/stamp.png";
import {Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Fade, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Participants from "./Participants";

export default function Start(props) {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [fadeIn, setFadeIn] = useState(true);
    const openRef = useRef(null);

    const handleOpen = () => {
        fetch('http://localhost/api/participants/set_random_sacrifices').then((response) => response.json()).then((json) => {
            json.forEach((participant) => participant.school = students.find((student) => {
                return student.name === participant.name
            }).school);
            props.setParticipants(json);
        });
    }

    const getRows = () => {
        let rows = [];
        let studentsBySchool = {["Хогвартс"]: [], ["Шармбатон"]: [], ["Дурмстранг"]: []};
        students.forEach((student) => studentsBySchool[student.school].push(student));
        for (let i = 0; i < 5; i++) {
            rows.push([studentsBySchool["Хогвартс"][i], studentsBySchool["Шармбатон"][i], studentsBySchool["Дурмстранг"][i]]);
        }
        return rows;
    }

    useEffect(() => {
        if (students.length === 0) {
            fetch('http://localhost/api/students/get').then((response) => response.json()).then((json) => setStudents(json));
        } else {
            fetch('http://localhost/api/participants/generate').then((response) => response.json()).then((json) => {
                json.forEach((participant) => students.find((student) => {
                    return student.name === participant.name
                }).isParticipant = true);
                props.setParticipants(json);
            });
        }
    }, [students]);

    useEffect(() => {
        if (props.participants.length === 4) {
            setOpen(true);
        }
    }, [props.participants]);

    useEffect(() => {
        if (openRef.current) {
            setFadeIn(false);
        }
        openRef.current = open;
    }, [open]);

    useEffect(() => {
        if (!fadeIn) {
            setTimeout(() => navigate("/stage1"), 1000);
        }
    }, [fadeIn]);

    return (
        <>
            <Fade in={fadeIn} timeout={{enter: 1000, exit: 1000}}>
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
                                        {students.length > 0 && props.participants.length > 0 ? getRows().map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Grid container direction="row" justifyContent="space-between">
                                                        <Grid item>{row[0].name}</Grid>
                                                        <Grid item>{row[0].isParticipant ? "✅" : ""}</Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell>
                                                    <Grid container direction="row" justifyContent="space-between">
                                                        <Grid item>{row[1].name}</Grid>
                                                        <Grid item>{row[1].isParticipant ? "✅" : ""}</Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell>
                                                    <Grid container direction="row" justifyContent="space-between">
                                                        <Grid item>{row[2].name}</Grid>
                                                        <Grid item>{row[2].isParticipant ? "✅" : ""}</Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        )) : null}
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'right',
                                height: '12%',
                            }}>
                                <Button onClick={handleOpen} sx={{
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
            {props.participants.length > 0 ?
                <Participants open={open} setOpen={setOpen} participants={props.participants}/> : null}
        </>
    );
}