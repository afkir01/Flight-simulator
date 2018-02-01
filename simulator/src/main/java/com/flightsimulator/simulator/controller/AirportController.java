package com.flightsimulator.simulator.controller;

import com.flightsimulator.simulator.repository.AirportRepository;
import com.flightsimulator.simulator.model.Airport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/airports/")
public class AirportController {

    @Autowired
    private AirportRepository airportRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Airport> getAllAirports(){
        return this.airportRepository.findAll();
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public Airport createAirport(@RequestBody Airport airport){
        //check if it's a new flight
        this.airportRepository.save(airport);
        return airport;
    }

    @RequestMapping(value = "edit", method = RequestMethod.POST)
    public Airport updateAirport(@RequestBody Airport airport){
        //check if guest already exists
        this.airportRepository.save(airport);
        return airport;
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    public void deleteAirport(@PathVariable long id) {
        this.airportRepository.delete(id);
    }
}
