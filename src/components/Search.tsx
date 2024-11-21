"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function SearchAnime() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&page=1`
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className=" mx-auto p-4 bg-slate-600">
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anime..."
          className="p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {loading && <div>Loading...</div>}

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-600">
          {searchResults.map((anime) => (
            <div key={anime.mal_id} className="anime-card">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="rounded-lg"
              />
              <h3 className="text-white">{anime.title}</h3>
              <Link href={`/anime/${anime.mal_id}`} legacyBehavior>
                <a className="text-blue-400">View Details</a>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}
