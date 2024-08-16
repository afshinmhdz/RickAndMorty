import React, { useEffect, useState } from "react";
//import {  episodes } from "../../data/data";
import { ArrowDownCircleIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function CharacterDetail({ selectedCharacter }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData(prams) {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${selectedCharacter}`
      );
      setCharacter(data);

      const episodesId = data.episode.map((e) => e.split("/").at(-1));

      const { data: episodeData } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodesId}`
      );
      setEpisodes([episodeData].flat().slice(0,6));
    }
    if (selectedCharacter) fetchData();
  }, [selectedCharacter]);

  if (!character)
    return (
      <h2 style={{ flex: 1, color: "#fff" }}>Please select a character</h2>
    );

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img src={character.image} alt="" className="character-detail__img" />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "👨🏽" : "👩‍🦰"}</span>
            <span>{character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span>&nbsp;{character.status}</span>
            <span>-{character.species}</span>
          </div>
          <div className="location">
            <p>Last known location</p>
            <p>{character.location.name}</p>
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
          {episodes.map((item, index) => (
              <li key={item.id}>
                <div>
                  {String(index + 1).padStart(2, "0")} -{" "}
                  <span>{item.episode} : </span>
                  <strong>{item.name}</strong>
                </div>

                <span className="badge badge--secondary">{item.air_date}</span>
              </li>
            
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
