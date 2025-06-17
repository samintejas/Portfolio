"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {Vidaloka} from "next/font/google"

const vidaloka = Vidaloka({ subsets: ["latin"], weight: "400" });

const tracks = [
  {
    id: 1,
    title: "AngelWave",
    description: "A soulful, genre-bending fusion of phonk and uplifting sounds.",
    details:
      "AngelWave blends phonk-inspired rhythms with euphoric vibes. Featuring vocal textures reminiscent of Glitterpunk, it ventures into a whole new territory with a unique lead, deep laid-back 808s, an uplifting guitar phase shift, and a post-modern flute outro; perfectly capturing Stellarmantra\’s experimental sound design philosophy.",
    image: "/angelwave.webp",
    spotifyEmbed: "https://open.spotify.com/embed/track/3eRcs4QYeI1IMiPbVUjH2y?si=d9f9e883dc324442",
    duration: "1:29",
    year: "2025",
  },
  {
    id: 2,
    title: "GlitterPunk",
    description: "High-BPM, high-energy, yet spiritually uplifting—a signature Stellarmantra banger.",
    details:
      "A fan favorite, GlitterPunk is designed for adrenaline seekers who also crave a sense of calm. The track features dual vocal styles woven into a single beat, delivering shifts in emotional energy without disrupting flow. It's fast, raw, yet surprisingly hypnotic.",
    image: "/glitterpunk.webp",
    spotifyEmbed: "https://open.spotify.com/embed/track/3GBlliLXS1Vh3oVgBr3F05?si=e7c16244e5194dde",
    duration: "3:00",
    year: "2025",
  },
  {
    id: 3,
    title: "Matrix",
    description: "Where nature\’s serenity meets grit—forest-core and 808.",
    details:
      "Matrix delivers a meditative experience layered with atmospheric textures, custom-crafted flutes, and deep 808s. It feels like walking through misty mountains while vibing to underground bass; peaceful yet undeniably stylish.",
    image: "/matrix.webp",
    spotifyEmbed: "https://open.spotify.com/embed/track/4PwImZIZ19VzT9BVrCY7R6?si=388216421e544af1",
    duration: "1:47",
    year: "2024",
  },
  {
    id: 4,
    title: "Eternal Sunshine",
    description: "Minimalist. Emotional. Proof that less can be infinitely more.",
    details:
      "Crafted entirely with Spitfire LABS, Eternal Sunshine is a testament to the beauty of simplicity. With under eight Ableton tracks, it evokes emotion and depth through minimal elements, standing as one of Stellarmantra\’s most delicate and intentional works.",
    image: "/eternalSunshine.webp",
    spotifyEmbed: "https://open.spotify.com/embed/track/14TPkQF4PHDupGw2KC2fKW?si=d66f969497ca4e8e",
    duration: "1:20",
    year: "2025",
  },
  {
    id: 5,
    title: "Keeping You Close",
    description: "Classic LoFi feel with modern emotional texture.",
    details:
      "Built on a popular vocal sample and transformed with dreamy chords and intimate keys, this track takes a heartfelt LoFi approach while maintaining a distinctive edge. It\’s cozy, nostalgic, and unmistakably Stellarmantra.",
    image: "/keepingYouClose.webp",
    spotifyEmbed: "https://open.spotify.com/embed/track/3SRPlwQJSVHusAlMidMrNo?si=75f5e25c6d4448c7",
    duration: "2:50",
    year: "2024",
  },
]

export default function SoundsPage() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-[1000px] h-[1000px] rounded-full border border-dotted border-foreground/60 dark:border-foreground/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-dotted border-foreground/70 dark:border-foreground/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dotted border-foreground/80 dark:border-foreground/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              className={`text-6xl md:text-8xl lg:text-11xl font-bold tracking-tight mb-8 leading-none ${vidaloka.className}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }} 
            >
              Stellarmantra
              <br />
              <span className="text-2xl md:text-4xl text-muted-foreground"> </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              A sonic space where celestial textures and deep atmospheres evoke clarity, euphoria, and presence.
            </motion.p>
          </div>
        </div>

        <motion.div
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Music Player Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Track List */}
            <div className="lg:col-span-2">
              <motion.h2
                className="text-3xl font-bold mb-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Tracks
              </motion.h2>
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    className={`group p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedTrack.id === track.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50 border border-transparent"
                    }`}
                    onClick={() => {
                      setSelectedTrack(track)
                      setIsPlaying(false)
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={track.image || "/placeholder.svg"}
                          alt={track.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{track.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {track.duration} • {track.year}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Track Details */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTrack.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Current Track Display */}
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    <motion.div
                      className="relative w-full lg:w-48 h-48 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Image
                        src={selectedTrack.image || "/placeholder.svg"}
                        alt={selectedTrack.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="flex-1 pt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                        Now Playing
                      </p>
                      <h1 className="text-3xl lg:text-4xl font-bold mb-3">{selectedTrack.title}</h1>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{selectedTrack.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                        <span>Stellarmantra</span>
                        <span>•</span>
                        <span>{selectedTrack.year}</span>
                        <span>•</span>
                        <span>{selectedTrack.duration}</span>
                      </div>

                      {/* Controls */}
                      {/* <div className="flex flex-wrap items-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="lg" className="rounded-full w-16 h-16" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                          </Button>
                        </motion.div>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <SkipBack className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <SkipForward className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2 ml-0 lg:ml-8">
                          <Volume2 className="h-4 w-4 text-muted-foreground" />
                          <div className="w-24">
                            <Slider
                              value={volume}
                              onValueChange={setVolume}
                              max={100}
                              step={1}
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  {/* Track Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">About this track</h2>
                      <p className="text-muted-foreground leading-relaxed">{selectedTrack.details}</p>
                    </div>

                    {/* Spotify Embed */}
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Listen</h2>
                      <div className="aspect-[4/5] w-full max-w-sm bg-background">
                        <iframe
                          src={`${selectedTrack.spotifyEmbed}${isPlaying ? "&autoplay=1" : ""}&theme=1&transparent=true`}
                          width="100%"
                          height="352"  
                          style={{
                            border: 'none',
                            borderRadius: '12px',
                            backgroundColor: "transparent",
                            colorScheme: "dark",
                          }}
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
