import { useCallback, useEffect, useRef, useState } from 'react';
import { Footer } from '../components/footer/Footer';
import { MenuSection } from '../components/menu/MenuSection';
import { Gallery } from '../components/site/Gallery';
import { Loader } from '../components/site/Loader';
import { Manifesto } from '../components/site/Manifesto';
import { Nav } from '../components/site/Nav';
import { Reviews } from '../components/site/Reviews';
import { Stage } from '../components/site/Stage';
import { Visit } from '../components/site/Visit';
import { useMenu } from '../hooks/useMenu';
import { ScrollTrigger } from '../motion/gsap';
import { MotionProvider, useMotion } from '../motion/MotionContext';
import { useSectionThemes } from '../motion/useSectionThemes';

/** Share of burger frames that must be loaded before the loader hands over to the hero. */
const READY_AT = 0.3;
const LOADER_TIMEOUT_MS = 7000;

function Site() {
  const { reduced } = useMotion();
  const menu = useMenu();
  const pageRef = useRef(null);
  const navMarkRef = useRef(null);
  const [framesProgress, setFramesProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const itemCount = menu.status === 'ready'
    ? menu.categories.reduce((sum, category) => sum + category.items.length, 0)
    : null;

  const handleFramesProgress = useCallback((progress) => {
    setFramesProgress(Math.min(1, progress / READY_AT));
    if (progress >= READY_AT) setReady(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), LOADER_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  // Late layout changes (web fonts, images) move section positions; re-measure the scroll scenes.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  useSectionThemes(pageRef, { enabled: !reduced });

  return (
    <div ref={pageRef}>
      <Loader progress={framesProgress} ready={ready} navMarkRef={navMarkRef} onReveal={() => setRevealed(true)} />
      <Nav navMarkRef={navMarkRef} />
      <main id="top">
        <Stage revealed={revealed} onFramesProgress={handleFramesProgress} />
        <Manifesto itemCount={itemCount} />
        <Gallery />
        <MenuSection menu={menu} />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}

export default function SitePage() {
  return (
    <MotionProvider>
      <Site />
    </MotionProvider>
  );
}
