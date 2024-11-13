import React from "react";
import { groupByCity } from "./utils";
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear, min, max } from "d3";


function printBug(cities) {
    const cityCount = {};
    cities.forEach(item => {
        const cityName = item.City;
        if (cityCount[cityName]) {
            cityCount[cityName].count += 1;
        } else {
            cityCount[cityName] = { count: 1, country: item.Country };
        }
    });

    const repeatedCities = Object.entries(cityCount)
        .filter(([city, data]) => data.count > 1)
        .map(([city, data]) => `${city}, ${data.country}`);

    if (repeatedCities.length > 0) {
        console.log("Cities that appear multiple times:");
        repeatedCities.forEach(city => console.log(city));
    } else {
        console.log("No cities appear multiple times.");
    }
}

function AirportBubble(props){
    const {width, height, routes, selectedAirline} = props;
    let cities;
    let topCities;

    if(selectedAirline){
        let selectedRoutes = routes.filter(a => a.AirlineID === selectedAirline);
        cities = groupByCity(selectedRoutes);
        topCities = cities.length - 5;
    } else {
        cities = groupByCity(routes);
        topCities = cities.length - 6;
    }

    // const test = [
    //                  { City: "Test1", Country: "USA" },
    //                  { City: "Los Angeles", Country: "USA" },
    //                  { City: "Test1", Country: "USA" },
    //                  { City: "Toronto", Country: "Canada" }
    //              ]
    // console.log(groupByCity(routes));
    // printBug(cities)
    // printBug(test)

    const radiusScale = scaleLinear()
        .domain([min(cities, d => d.Count), max(cities, d => d.Count)])
        .range([2, width * 0.15]);

    forceSimulation(cities)
        .velocityDecay(0.2)
        .force("x", forceX(width / 2).strength(0.02))
        .force("y", forceY(height / 2).strength(0.02))
        .force("collide", forceCollide(d => radiusScale(d.Count)))
        .tick(200);

        return (
            <g>
                {cities.map((city, idx) => {
                    const fillColor = idx >= topCities ? "rgba(173, 216, 230, 0.69)" : "rgba(42, 85, 153, 1)";
                    const stroke = idx >= topCities ? "rgba(173, 216, 230, 1)" : "rgba(0, 0, 0, 0.89)";
                    
                    return (
                        <g key={idx} transform={`translate(${city.x}, ${city.y})`}>
                            <circle
                                r={radiusScale(city.Count)}
                                fill={fillColor}
                                stroke={stroke}
                                strokeWidth="2"
                            />
                            {(idx >= topCities) && (
                                <text
                                style={{textAnchor:"middle", stroke:"pink", strokeWidth:"0.5em", 
                                        fill:"#992a2a", fontSize:16, fontFamily:"cursive", 
                                        paintOrder:"stroke", strokeLinejoin:"round"}}
                                        dy=".35em"
                                >
                                    {city.City}
                                </text>
                            )}
                        </g>
                    );
                })}
            </g>
        );
}

export { AirportBubble }