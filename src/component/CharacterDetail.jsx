import React, { useEffect, useState } from "react";
//import {  episodes } from "../../data/data";
import { ArrowUpCircleIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function CharacterDetail({
  selectedCharacter,
  onAddFavourite,
  isAddtoFavourite,
}) {
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
      setEpisodes([episodeData].flat().slice(0, 6));
    }
    if (selectedCharacter) fetchData();
  }, [selectedCharacter]);

  if (!character)
    return (
      <h2 style={{ flex: 1, color: "#fff" }}>Please select a character</h2>
    );

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        isAddtoFavourite={isAddtoFavourite}
        onAddFavourite={onAddFavourite}
      />
      <EpisodesList episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

export function CharacterSubInfo({
  character,
  isAddtoFavourite,
  onAddFavourite,
}) {
  return (
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
          {isAddtoFavourite ? (
            <p>Already Added to Favourite✅</p>
          ) : (
            <button
              onClick={() => onAddFavourite(character)}
              className="btn btn--primary"
            >
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodesList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes</h2>
        <button onClick={() => setSortBy((is) => !is)} style={{}}>
          <ArrowUpCircleIcon className="icon" style={{rotate:sortBy ? "0deg" : "180deg"}}/>
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
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
  );
}
