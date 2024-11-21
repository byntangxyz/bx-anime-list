"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

// Definisikan tipe data untuk Anime
interface Anime {
  title: string;
  synopsis: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  trailer?: {
    embed_url: string;
  };
}

interface AnimeDetailProps {
  params: Promise<{ id: string }>;
}

export default function AnimeDetail({ params }: AnimeDetailProps) {
  // Menggunakan tipe yang lebih spesifik, Anime atau null
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  // Menggunakan React.use() untuk menunggu params
  const { id } = React.use(params);

  useEffect(() => {
    if (!id) {
      console.log("No ID found");
      return; // Pastikan ID ada sebelum melanjutkan fetch
    }

    const fetchAnime = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!anime) {
    return <div>No anime found.</div>;
  }

  return (
    <div className="mx-auto p-4 md:px-12 bg-slate-950">
      <h1 className="text-3xl text-white mb-4">{anime.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Image
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="rounded-lg"
        />
        <div>
          <h2 className="text-2xl text-gray-300 mb-2">Synopsis</h2>
          <p className="text-gray-400">{anime.synopsis}</p>
          <h2 className="text-2xl text-gray-300 mt-4 mb-2">Trailer</h2>
          {anime.trailer?.embed_url ? (
            <iframe
              className="w-full aspect-video"
              src={anime.trailer.embed_url}
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-gray-400">No trailer available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
