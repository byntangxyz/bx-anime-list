"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Anime {
  mal_id: number;
  images: any;
  title: string;
}

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/top/anime");
        setAnimeList(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchAnime();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Anime List</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animeList.map((anime: Anime) => (
          <div key={anime.mal_id} className="border rounded shadow">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full h-40 object-cover rounded-t"
            />
            <div className="p-2">
              <h2 className="text-sm font-semibold">{anime.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;