"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchAnime from "@/components/Search";

export default function Home() {
  const [animeList, setAnimeList] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime") // Ganti URL sesuai API kamu
      .then((res) => res.json())
      .then((data) => setAnimeList(data.data));
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl text-white bg-slate-600 pb-6">Anime Search</h1>
        <SearchAnime />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-600 pt-12">
        {animeList.map((anime) => (
          <Link href={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <div className="card bg-gray-800 hover:bg-gray-700 p-4 rounded-lg">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-lg text-white mt-2">{anime.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
