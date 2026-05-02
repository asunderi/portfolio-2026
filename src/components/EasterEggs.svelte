<script lang="ts">
  import { onMount } from 'svelte';
  import { chaosLevel, chaosDiscovered } from '../stores/ui.js';
  import { get } from 'svelte/store';

  // ChaosDial local state
  let dialPos = $state({ x: 24, y: 100 });
  let dialChaos = $state(0);
  let dialVisible = $state(false);
  let dragRef: { sx: number; sy: number; ox: number; oy: number } | null = null;

  const dialLabels = ['serious', 'mild', 'caffeinated', 'unhinged', 'shimmer'];

  function dialLabelIdx(v: number) {
    return Math.min(4, Math.floor(v * 5));
  }

  function startDrag(e: MouseEvent) {
    dragRef = { sx: e.clientX, sy: e.clientY, ox: dialPos.x, oy: dialPos.y };
  }

  function onWindowMouseMove(e: MouseEvent) {
    if (!dragRef) return;
    dialPos = {
      x: dragRef.ox + (e.clientX - dragRef.sx),
      y: dragRef.oy + (e.clientY - dragRef.sy),
    };
  }

  function onWindowMouseUp() {
    dragRef = null;
  }

  onMount(() => {
    // desktop-only guard
    if (window.innerWidth < 1024) return;

    // position chaos dial top-right
    dialPos = { x: Math.max(24, window.innerWidth - 280), y: 88 };

    // ── custom cursor ──────────────────────────────────────
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    if (cursor && dot) {
      cursor.style.display = 'block';
      dot.style.display = 'block';
      document.body.classList.add('has-custom-cursor');
    }

    let mx = 0, my = 0, cx = 0, cy = 0;
    let cursorRaf: number;

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      const target = e.target as Element;
      if (target?.closest?.('[data-hoverable], button, a')) {
        cursor?.classList.add('hover');
      } else {
        cursor?.classList.remove('hover');
      }
    }

    function cursorTick() {
      const chaos = get(chaosLevel);
      const lag = 0.18 - chaos * 0.13;
      cx += (mx - cx) * lag;
      cy += (my - cy) * lag;

      let jx = 0, jy = 0;
      if (chaos > 0.4 && Math.random() < chaos * 0.04) {
        jx = (Math.random() - 0.5) * 12 * chaos;
        jy = (Math.random() - 0.5) * 12 * chaos;
      }

      if (cursor) cursor.style.transform = `translate(${cx + jx}px, ${cy + jy}px) translate(-50%, -50%)`;
      cursorRaf = requestAnimationFrame(cursorTick);
    }

    window.addEventListener('mousemove', onMouseMove);
    cursorRaf = requestAnimationFrame(cursorTick);

    // ── console egg ───────────────────────────────────────
    function runConsoleEgg() {
      if ((window as any).__eggRan) return;
      (window as any).__eggRan = true;
      const msgs: [string, string][] = [
        ['%c hey', 'font-size:24px; font-family:serif; font-style:italic; color:#9fd9c8;'],
        ['%cthings i would like you to know:', 'color:#9fd9c8; font-weight:bold;'],
        ['%c  · i have logged 650 hours in BG3.', 'color:#c9b8a8;'],
        ['%c  · ginger is the lead designer, i just hold the mouse.', 'color:#c9b8a8;'],
        ['%c  · scavengers reign deserved more seasons.', 'color:#c9b8a8;'],
        ['%c  · i keep messing up my mewgenics runs.', 'color:#c9b8a8;'],
        ['%c—', 'color:#3d1520;'],
      ];
      msgs.forEach(([msg, style], i) => setTimeout(() => console.log(msg, style), i * 180));
    }

    document.addEventListener('bootcomplete', runConsoleEgg, { once: true });

    // ── glitch scheduler ──────────────────────────────────
    let glitchTimer: ReturnType<typeof setTimeout>;
    let currentChaos = 0;
    const chaosUnsub = chaosLevel.subscribe(v => { currentChaos = v; dialChaos = v; });
    const discoveredUnsub = chaosDiscovered.subscribe(v => { dialVisible = v; });

    function scheduleGlitch() {
      if (currentChaos < 0.05) { glitchTimer = setTimeout(scheduleGlitch, 2000); return; }
      const base = 12000 - currentChaos * 10000;
      const delay = base + Math.random() * base;
      glitchTimer = setTimeout(() => {
        const candidates = document.querySelectorAll('h1, h2, .glitch-target, [data-target]');
        const list = Array.from(candidates);
        if (list.length) {
          const el = list[Math.floor(Math.random() * list.length)];
          el.classList.add('glitching');
          if (Math.random() < currentChaos) el.classList.add('jittering');
          setTimeout(() => {
            el.classList.remove('glitching');
            el.classList.remove('jittering');
          }, 320);
        }
        if (currentChaos > 0.7 && Math.random() < 0.3) {
          document.body.classList.add('jittering');
          setTimeout(() => document.body.classList.remove('jittering'), 280);
        }
        scheduleGlitch();
      }, delay);
    }
    scheduleGlitch();

    // ── secret combos ─────────────────────────────────────
    let upCount = 0;
    let upTimer: ReturnType<typeof setTimeout>;
    let typed = '';

    function onKeydown(e: KeyboardEvent) {
      // ↑↑↑↑ → chaos dial
      if (e.key === 'ArrowUp') {
        upCount++;
        clearTimeout(upTimer);
        upTimer = setTimeout(() => { upCount = 0; }, 1500);
        if (upCount >= 4) {
          upCount = 0;
          console.log('%c☆ chaos protocol engaged ☆', 'color:#5fe6c4; font-size:18px; font-weight:bold;');
          chaosLevel.set(1);
          chaosDiscovered.set(true);
          document.body.style.animation = 'shimmer 2s ease 2';
          setTimeout(() => { document.body.style.animation = ''; }, 4200);
        }
      }

      // "boba" typed → rain
      typed += e.key.toLowerCase();
      if (typed.endsWith('boba')) {
        spawnBoba();
        typed = '';
      }
      if (typed.length > 20) typed = typed.slice(-20);
    }

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(cursorRaf);
      window.removeEventListener('keydown', onKeydown);
      clearTimeout(glitchTimer);
      clearTimeout(upTimer);
      chaosUnsub();
      discoveredUnsub();
      document.body.classList.remove('has-custom-cursor');
      if (cursor) cursor.style.display = 'none';
      if (dot) dot.style.display = 'none';
    };
  });

  function spawnBoba() {
    console.log('%c🧋 +1 boba', 'font-size:14px; color:#5fe6c4;');
    const b = document.createElement('div');
    b.textContent = '🧋';
    b.style.cssText = `
      position: fixed;
      left: ${Math.random() * 90 + 5}vw;
      top: -40px;
      font-size: 36px;
      pointer-events: none;
      z-index: 9999;
      transition: top 2.4s ease-in, transform 2.4s ease-in, opacity 2.4s;
    `;
    document.body.appendChild(b);
    requestAnimationFrame(() => {
      b.style.top = '110vh';
      b.style.transform = `rotate(${(Math.random() - 0.5) * 720}deg)`;
    });
    setTimeout(() => b.remove(), 2500);
  }

  function updateChaos(e: Event) {
    const v = parseFloat((e.target as HTMLInputElement).value);
    chaosLevel.set(v);
    dialChaos = v;
  }

  function closeDial() {
    chaosDiscovered.set(false);
    chaosLevel.set(0);
    dialChaos = 0;
  }
</script>

<svelte:window onmousemove={onWindowMouseMove} onmouseup={onWindowMouseUp} />

{#if dialVisible}
  <div
    class="chaos-dial"
    style:left="{dialPos.x}px"
    style:top="{dialPos.y}px"
    role="dialog"
    aria-label="Chaos dial"
  >
    <div class="dial-header" onmousedown={startDrag} role="none">
      <span class="dial-title">
        <span class="dial-diamond" aria-hidden="true"></span>
        chaos.dial
      </span>
      <button class="dial-close" onclick={closeDial} aria-label="Close chaos dial">×</button>
    </div>
    <div class="dial-body">
      <div class="dial-sub-label">level</div>
      <input
        type="range"
        min="0" max="1" step="0.01"
        value={dialChaos}
        oninput={updateChaos}
        aria-label="Chaos level"
        class="dial-range"
      />
      <div class="dial-readout">
        <span class="dial-percent">
          {Math.round(dialChaos * 100)}<span class="dial-pct-sym">%</span>
        </span>
        <span class="dial-label-text">{dialLabels[dialLabelIdx(dialChaos)]}</span>
      </div>
      <div class="dial-hint">you found this. it adjusts everything — cursor, drift, glitches.</div>
    </div>
  </div>
{/if}

<style>
  /* ── cursor styles (injected globally via :global) ── */
  :global(.cursor) {
    position: fixed;
    width: 32px; height: 32px;
    border: 1.5px solid var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: width 0.2s, height 0.2s, border-color 0.2s;
    will-change: transform;
    top: 0; left: 0;
  }

  :global(.cursor.hover) {
    width: 48px; height: 48px;
    border-color: var(--fg-dim);
  }

  :global(.cursor-dot) {
    position: fixed;
    width: 4px; height: 4px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10001;
    will-change: transform;
    top: 0; left: 0;
  }

  :global(.has-custom-cursor *) {
    cursor: none !important;
  }

  /* ── chaos dial ── */
  .chaos-dial {
    position: fixed;
    z-index: 2147483645;
    width: 248px;
    background: linear-gradient(140deg, rgba(26, 10, 16, 0.92), rgba(20, 40, 34, 0.92));
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    border: 0.5px solid rgba(95, 230, 196, 0.35);
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
    font-family: var(--mono);
    color: #f5e9dc;
    animation: chaos-in 0.4s cubic-bezier(.5, 1.6, .5, 1);
  }

  .dial-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    border-bottom: 0.5px solid rgba(245, 233, 220, 0.1);
    cursor: move;
    user-select: none;
  }

  .dial-title {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #5fe6c4;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dial-diamond {
    width: 6px; height: 6px;
    background: #5fe6c4;
    transform: rotate(45deg);
    display: inline-block;
    flex-shrink: 0;
  }

  .dial-close {
    background: transparent;
    border: none;
    color: rgba(245, 233, 220, 0.6);
    font-size: 14px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.2s;
  }

  .dial-close:hover { color: #f5e9dc; }

  .dial-body {
    padding: 14px 14px 16px;
  }

  .dial-sub-label {
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(245, 233, 220, 0.55);
    margin-bottom: 8px;
  }

  .dial-range {
    width: 100%;
    accent-color: #5fe6c4;
    cursor: pointer;
  }

  .dial-readout {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 8px;
  }

  .dial-percent {
    font-size: 18px;
    font-variant-numeric: tabular-nums;
    color: #5fe6c4;
  }

  .dial-pct-sym {
    font-size: 10px;
    color: rgba(245, 233, 220, 0.5);
    margin-left: 2px;
  }

  .dial-label-text {
    font-size: 10px;
    color: rgba(245, 233, 220, 0.65);
    font-style: italic;
  }

  .dial-hint {
    margin-top: 10px;
    font-size: 9px;
    line-height: 1.5;
    color: rgba(245, 233, 220, 0.45);
  }
</style>
