package com.flightsimulator.simulator.repository;

import com.flightsimulator.simulator.model.Airport;
import org.springframework.data.repository.CrudRepository;

public interface AirportRepository extends CrudRepository <Airport, Long> {
}
