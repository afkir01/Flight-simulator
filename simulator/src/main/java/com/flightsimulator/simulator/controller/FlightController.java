package com.flightsimulator.simulator.controller;

import com.flightsimulator.simulator.repository.FlightRepository;
import com.flightsimulator.simulator.model.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/flights/")
public class FlightController {

    @Autowired
    private FlightRepository flightRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Flight> getAllFlights(){
        return this.flightRepository.findAll();
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public Flight createFlight(@RequestBody Flight flight){
        //check if it's a new flight
        this.flightRepository.save(flight);
        return flight;
    }

    @RequestMapping(value = "edit", method = RequestMethod.POST)
    public Flight updateFlight(@RequestBody Flight flight){
        //check if guest already exists
        this.flightRepository.save(flight);
        return flight;
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    public void deleteFlight(@PathVariable long id) {
        this.flightRepository.delete(id);
    }
}
