import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import sharedBackground from './assets/Mainn-web.mp4'
import experienceBackground from './assets/train-web.mp4'
import bgmTrack from './assets/Persona 3 Reload - Color Your Night - Pealeaf (128k).mp3'
import P3Menu from './P3Menu'
import Experience from './Experience'
import PersonalProjects from './PersonalProjects'
import Skills from './Skills'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={sharedBackground} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/experience" element={
          <PageTransition><Experience src={experienceBackground} /></PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition><PersonalProjects /></PageTransition>
        } />
        <Route path="/skills" element={
          <PageTransition><Skills /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const audioRef = useRef(null)
  const hasStartedRef = useRef(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = true
    audio.volume = 0.2
    audio.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const tryStartAudio = async () => {
      if (hasStartedRef.current) return
      const audio = audioRef.current
      if (!audio) return

      hasStartedRef.current = true
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        hasStartedRef.current = false
        setIsPlaying(false)
      }
    }

    const onKeyDown = async (e) => {
      if (e.key === 'm' || e.key === 'M') {
        setIsMuted((prev) => !prev)
      }

      // Any first key press can satisfy browser autoplay interaction requirement.
      await tryStartAudio()
    }

    const onPointerDown = async () => {
      await tryStartAudio()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <>
      <audio ref={audioRef} src={bgmTrack} preload="auto" />
      <AnimatedRoutes />

      <div className="bgm-hud" aria-live="polite">
        <div className="bgm-row"><span className="bgm-key">M</span><span>{isMuted ? 'BGM: MUTED' : isPlaying ? 'BGM: ACTIVE' : 'BGM: TAP TO START'}</span></div>
        <div className="bgm-title">Color Your Night (Pealeaf)</div>
      </div>
    </>
  )
}
