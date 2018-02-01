package com.flightsimulator.simulator.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Airport {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private String name;
    private Long totalAirplanes;


    public Airport(){ }

    public Airport(Long flightNumber, String flightOrigin, String flightDestination) {
        this.id = id;
        this.name = name;
        this.totalAirplanes = totalAirplanes;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTotalAirplanes() {
        return totalAirplanes;
    }

    public void setTotalAirplanes(Long totalAirplanes) {
        this.totalAirplanes = totalAirplanes;
    }
}
