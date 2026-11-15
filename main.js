// Timer model: milliseconds and deadline, independent of the DOM.
function createTimer({ now, schedule, cancel, onUpdate, onComplete }) {
  let state = 'idle';
  let remainingMs = 0;
  let deadline = 0;
  let intervalId = null;
  function clearTicker() {
    if (intervalId !== null) cancel(intervalId);
    intervalId = null;
  }
  function update() {
    if (state !== 'running') return;
    remainingMs = Math.max(0, deadline - now());
    if (remainingMs === 0) {
      state = 'finished';
      clearTicker();
      onUpdate(0, state);
      onComplete();
      return;
    }
    onUpdate(remainingMs, state);
  }
  function run() {
    deadline = now() + remainingMs;
    state = 'running';
    intervalId = schedule(update, 100);
    update();
  }
  return {
    start(durationMs) {
      if (state === 'running' || state === 'paused' || !(durationMs > 0)) return false;
      remainingMs = durationMs;
      run();
      return true;
    },
    pause() {
      if (state !== 'running') return;
      update();
      if (state !== 'running') return;
      clearTicker();
      state = 'paused';
      onUpdate(remainingMs, state);
    },
    resume() { if (state === 'paused') run(); },
    reset() {
      clearTicker();
      state = 'idle';
      remainingMs = 0;
      onUpdate(0, state);
    },
    refresh: update,
    get state() { return state; }
  };
}

// View/controller: navigation, selection and user interaction.
const screens = {
  choose: document.getElementById('choose-screen'),
  focus: document.getElementById('focus-screen'),
  done: document.getElementById('done-screen')
};
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('btnStart');
const pauseButton = document.getElementById('btnPause');
const durationButtons = document.querySelectorAll('[data-minutes]');
const sound = document.getElementById('timerSound');
let selectedMinutes = 0;
let currentScreen = 'choose';
function showScreen(name) {
  currentScreen = name;
  Object.entries(screens).forEach(([key, screen]) => { screen.hidden = key !== name; });
  screens[name].querySelector('h2').focus({ preventScroll: true });
}
function stopSound() {
  sound.pause();
  sound.currentTime = 0;
}
const timer = createTimer({
  now: () => performance.now(),
  schedule: (callback, delay) => setInterval(callback, delay),
  cancel: id => clearInterval(id),
  onUpdate(remainingMs, state) {
    // Round up seconds so 00:00 appears only at the actual deadline.
    const totalSeconds = Math.ceil(remainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerDisplay.setAttribute('aria-label', `${minutes} minutes ${seconds} seconds remaining`);
    pauseButton.textContent = state === 'paused' ? 'Resume' : 'Pause';
  },
  onComplete() {
    showScreen('done');
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
});
durationButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentScreen !== 'choose') return;
    selectedMinutes = Number(button.dataset.minutes);
    durationButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    startButton.disabled = false;
  });
});
function startSession() {
  if (!selectedMinutes || !['choose', 'done'].includes(currentScreen)) return;
  stopSound();
  // Prime audio silently during the user gesture for browser autoplay rules.
  sound.muted = true;
  sound.play().then(() => {
    sound.pause();
    sound.currentTime = 0;
    sound.muted = false;
  }).catch(() => { sound.muted = false; });
  if (timer.start(selectedMinutes * 60000)) showScreen('focus');
}
function goHome() {
  timer.reset();
  stopSound();
  showScreen('choose');
}
startButton.addEventListener('click', startSession);
document.getElementById('btnAgain').addEventListener('click', startSession);
document.getElementById('btnReset').addEventListener('click', goHome);
document.getElementById('btnHome').addEventListener('click', goHome);
pauseButton.addEventListener('click', () => {
  if (currentScreen !== 'focus') return;
  if (timer.state === 'paused') timer.resume();
  else timer.pause();
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) timer.refresh();
});
