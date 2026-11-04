// Play buttons on the phrases page (SayButton.astro). One shared <audio>
// element: a new tap stops whatever is playing; a tap on the playing button
// stops it. The clip URL is the button's data-say (PhraseCard's variant
// switch rewrites it when the form changes).
import { track } from '../analytics';

let audio: HTMLAudioElement | null = null;
let current: HTMLButtonElement | null = null;
let ready = false;

function stop() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  current?.classList.remove('is-playing');
  current = null;
}

export function initSayButtons() {
  if (ready) return;
  ready = true;
  document.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-say]');
    const src = button?.dataset.say;
    if (!button || !src) return;
    if (current === button) {
      stop();
      return;
    }
    stop();
    if (!audio) {
      audio = new Audio();
      audio.addEventListener('ended', stop);
      audio.addEventListener('error', stop);
    }
    audio.src = src;
    current = button;
    button.classList.add('is-playing');
    audio.play().catch(() => {
      if (current === button) stop();
    });
    track('phrase_audio_play', { phrase: button.dataset.sayId ?? '' });
  });
}
