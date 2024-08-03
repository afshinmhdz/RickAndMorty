import React from "react";
import { characters, episodes } from "../../data/data";
import { ArrowDownCircleIcon, LifebuoyIcon } from "@heroicons/react/24/outline";

function CharacterDetail() {
  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img src={characters.image} alt="" className="character-detail__img" />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{characters.gender === "Male" ? "👨🏽" : "👩‍🦰"}</span>
            <span>{characters.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${characters.status === "Dead" ? "red" : ""}`}
            ></span>
            <span>&nbsp;{characters.status}</span>
            <span>-{characters.species}</span>
          </div>
          <div className="location">
            <p>Last known location</p>
            <p>{characters.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add to Favourite</button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes</h2>
          <ArrowDownCircleIcon className="icon" />
        </div>
        <ul>
          {episodes.map((item,index) => (
            <div>
              <li key={item.id}>
                
                <div>
                  {String(index+1).padStart(2,"0")} - <span>{item.episode} : </span>
                    <strong>{item.name}</strong>
                </div>
                
                <span className="badge badge--secondary">{item.air_date}</span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
