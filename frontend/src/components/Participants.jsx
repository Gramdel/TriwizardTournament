import {Typography, Box, Modal, Grid, Avatar, Slide} from "@mui/material";
import {useEffect, useState} from "react";

export default function Participants(props) {
    const [slideIn, setSlideIn] = useState(true);

    useEffect(() => {
        if (!slideIn) {
            setTimeout(() => props.setOpen(false), 250);
        }
    }, [slideIn]);

    return (
        <Modal open={props.open} onClose={() => setSlideIn(false)} sx={{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Grid container spacing={5} sx={{
                width: '772px',
            }}>
                <Slide in={slideIn} direction="right" timeout={{enter: 500, exit: 250}}>
                    <Grid item xs={6}>
                        <Item participant={props.participants[0]}/>
                    </Grid>
                </Slide>
                <Slide in={slideIn} direction="left" timeout={{enter: 500, exit: 250}}>
                    <Grid item xs={6}>
                        <Item participant={props.participants[1]}/>
                    </Grid>
                </Slide>
                <Slide in={slideIn} direction="right" timeout={{enter: 500, exit: 250}}>
                    <Grid item xs={6}>
                        <Item participant={props.participants[2]}/>
                    </Grid>
                </Slide>
                <Slide in={slideIn} direction="left" timeout={{enter: 500, exit: 250}}>
                    <Grid item xs={6}>
                        <Item participant={props.participants[3]}/>
                    </Grid>
                </Slide>
            </Grid>
        </Modal>
    );
}

const determineColor = (school) => {
    switch (school) {
        case "Хогвартс":
            return '#5d4e16';
        case "Шармбатон":
            return '#1a3f8a';
        case "Дурмстранг":
            return '#257007';
    }
}

const determineGlow = (school) => {
    switch (school) {
        case "Хогвартс":
            return 'magical-glow-hogwarts 2s infinite alternate';
        case "Шармбатон":
            return 'magical-glow-beauxbatons 2s infinite alternate';
        case "Дурмстранг":
            return 'magical-glow-durmstrang 2s infinite alternate';
    }
}

function Item(props) {
    return (
        <Box sx={{
            animation: determineGlow(props.participant.school),
        }}>
            <Avatar alt="Travis Howard" src={"img/avatars/" + props.participant.name + ".jpg"} variant="square"
                    sx={{
                        width: 350,
                        height: 350,
                        borderRadius: '10px',
                    }}
            />
            <Box sx={{
                backgroundImage: `url(img/schools/${props.participant.school}.png)`,
                backgroundSize: '100% 100%',
                width: '100px',
                height: '100px',
                position: 'absolute',
                top: '-20px',
                left: '-20px',
            }}/>
            <Typography variant="h3" sx={{
                textAlign: 'right',
                fontFamily: 'Harry Potter',
                fontWeight: 'bold',
                letterSpacing: '0.2rem',
                color: determineColor(props.participant.school),
                animation: determineGlow(props.participant.school),
                position: 'absolute',
                top: '10px',
                right: '10px',
            }}>
                {props.participant.points}
            </Typography>
            <Typography sx={{
                textAlign: 'center',
                fontFamily: 'Harry Potter',
                fontWeight: 'bold',
                fontSize: '2.7rem',
                letterSpacing: '0.2rem',
                color: determineColor(props.participant.school),
                animation: determineGlow(props.participant.school),
                position: 'absolute',
                bottom: 0,
                width: '100%',
            }}>
                {props.participant.name}
            </Typography>
        </Box>
    );
}