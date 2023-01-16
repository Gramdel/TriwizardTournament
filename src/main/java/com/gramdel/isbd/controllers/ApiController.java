package com.gramdel.isbd.controllers;

import com.gramdel.isbd.entities.Participant;
import com.gramdel.isbd.entities.Student;
import com.gramdel.isbd.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gramdel.isbd.repositories.ParticipantRepository;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ApiController {
    @Autowired
    ParticipantRepository participantRepository;
    @Autowired
    StudentRepository studentRepository;

    @GetMapping(value = "/api/students/get")
    private ResponseEntity<ArrayList<Student>> getStudents() {
        ArrayList<Student> students = new ArrayList<>(studentRepository.findAll());
        if (students.size() == 15) {
            return ResponseEntity.ok().body(students);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/api/participants/generate")
    private ResponseEntity<ArrayList<Participant>> generateParticipants() {
        participantRepository.deleteAll();
        ArrayList<Participant> participants = participantRepository.generateParticipants();
        if (participants.size() == 7) {
            return ResponseEntity.ok().body(participants);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/api/participants/get")
    private ResponseEntity<ArrayList<Participant>> getParticipants() {
        ArrayList<Participant> participants = new ArrayList<>(participantRepository.findAll());
        if (!participants.isEmpty()) {
            return ResponseEntity.ok().body(participants);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/api/participants/set_random_sacrifices")
    private ResponseEntity<ArrayList<Participant>> setRandomSacrificesOfParticipants() {
        ArrayList<Participant> participants = participantRepository.setRandomSacrifices();
        if (participants.size() == 4) {
            return ResponseEntity.ok().body(participants);
        }
        return ResponseEntity.notFound().build();
    }
}
