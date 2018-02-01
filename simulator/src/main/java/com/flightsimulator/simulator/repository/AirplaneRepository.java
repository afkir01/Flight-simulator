package com.flightsimulator.simulator.repository;

import com.flightsimulator.simulator.model.Airplane;
import org.springframework.data.repository.CrudRepository;

public interface AirplaneRepository extends CrudRepository <Airplane, Long> {
}
