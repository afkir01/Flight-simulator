package com.flightsimulator.simulator.controller;

import com.flightsimulator.simulator.model.Airplane;
import com.flightsimulator.simulator.repository.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/airplanes/")
public class AirplaneController {

    @Autowired
    private AirplaneRepository airplaneRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Airplane> getAllAirplanes(){
        return this.airplaneRepository.findAll();
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public Airplane createAirplane(@RequestBody Airplane airplane){
        //check if it's a new flight
        this.airplaneRepository.save(airplane);
        return airplane;
    }

    @RequestMapping(value = "edit", method = RequestMethod.POST)
    public Airplane updateAirplane(@RequestBody Airplane airplane){
        //check if guest already exists
        this.airplaneRepository.save(airplane);
        return airplane;
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    public void deleteAirplane(@PathVariable long id) {
        this.airplaneRepository.delete(id);
    }
}
