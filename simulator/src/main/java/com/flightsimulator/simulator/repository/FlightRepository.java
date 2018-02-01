package com.flightsimulator.simulator.repository;

import com.flightsimulator.simulator.model.Flight;
import org.springframework.data.repository.CrudRepository;


public interface FlightRepository extends CrudRepository<Flight, Long> {}