<script lang="ts">
  import { onMount } from 'svelte';
  import { chaosLevel } from '../stores/ui.js';
  import { PROJECTS, type Project } from '../data/projects.js';

  // per-card stable drift offsets
  const DRIFTS = [
    { x: -8,  y: 14, r: -1.2 },
    { x: 12,  y: -6, r: 0.8  },
    { x: -4,  y: 22, r: -0.4 },
    { x: 16,  y: 4,  r: 1.4  },
    { x: -14, y: 8,  r: -0.9 },
    { x: 6,   y: -12, r: 0.6 },
    { x: -10, y: 18, r: -1.6 },
    { x: 14,  y: 2,  r: 1.0  },
  ];

  const SPANS   = [7, 5, 4, 4, 4, 5, 7, 12];
  const RATIOS  = ['16 / 9', '4 / 5', '1 / 1', '1 / 1', '1 / 1', '4 / 5', '16 / 9', '21 / 9'];

  let hoveredCard = $state<number | null>(null);
  let activeProject = $state<Project | null>(null);
  let isDesktop = $state(false);
  let chaos = $state(0);

  onMount(() => {
    isDesktop = window.innerWidth >= 1024;
    return chaosLevel.subscribe(v => { chaos = v; });
  });

  function cardTransform(i: number): string {
    if (!isDesktop || hoveredCard === i) return '';
    const drift = DRIFTS[i % DRIFTS.length];
    const mul = chaos <= 0.001 ? 0 : (0.4 + chaos * 1.6);
    return `translate(${drift.x * mul}px, ${drift.y * mul}px) rotate(${drift.r * mul}deg)`;
  }

  function openModal(project: Project) {
    activeProject = project;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    activeProject = null;
    document.body.style.overflow = '';
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) closeModal();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeModal();
  }

  function stripesBg(project: Project, index: number): string {
    return project.color === 'mint'
      ? `repeating-linear-gradient(${90 + index * 7}deg, var(--accent) 0, var(--accent) 12px, var(--bg-2) 12px, var(--bg-2) 24px)`
      : `repeating-linear-gradient(${45 + index * 11}deg, var(--accent) 0, var(--accent) 8px, var(--bg-2) 8px, var(--bg-2) 16px)`;
  }
</script>

<svelte:window onkeydown={activeProject ? handleKeydown : undefined} />

<section class="gallery-section wrap" id="work" data-screen-label="02 Gallery">
  <div class="gallery-head">
    <div>
      <div class="label" style="margin-bottom: 14px;">§ 02 — Selected Work</div>
      <h2 class="section-title">Things I made,<br />mostly on <span class="accent-word">purpose.</span></h2>
    </div>
    <div class="gallery-count">
      <div>{PROJECTS.length} projects · 2014 — 2023</div>
      <div class="accent-text">click any to expand</div>
    </div>
  </div>

  <div class="gallery-grid">
    {#each PROJECTS as project, i}
      <button
        class="gallery-card"
        style:grid-column="span {SPANS[i % SPANS.length]}"
        style:transform={cardTransform(i)}
        onmouseenter={() => { hoveredCard = i; }}
        onmouseleave={() => { hoveredCard = null; }}
        onclick={() => openModal(project)}
        aria-label="View {project.title} case study"
      >
        <div
          class="card-thumb"
          class:card-thumb--hovered={hoveredCard === i}
          style:aspect-ratio={RATIOS[i % RATIOS.length]}
          style:background={project.thumbnail ? undefined : stripesBg(project, i)}
        >
          {#if project.thumbnail}
            <img class="card-img" src={project.thumbnail} alt={project.title} />
            <div class="card-tint"></div>
          {/if}
          <span class="card-index">{String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
          <div class="card-bottom-row">
            <span class="card-pill">{project.tags[0]}</span>
          </div>
        </div>
        <div class="card-meta">
          <div>
            <div class="card-title">{project.title}</div>
            <div class="card-role">{project.role}</div>
          </div>
          <div class="card-year">{project.year}</div>
        </div>
      </button>
    {/each}
  </div>
</section>

{#if activeProject}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="modal-backdrop"
    onclick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-label="{activeProject.title} case study"
  >
    <div class="modal-shell">
      <button class="modal-close" onclick={closeModal} aria-label="Close">×</button>

      <div
        class="modal-hero-shot"
        style:background={activeProject.thumbnail ? undefined : (activeProject.color === 'mint'
          ? 'repeating-linear-gradient(120deg, var(--accent) 0, var(--accent) 14px, var(--bg-2) 14px, var(--bg-2) 28px)'
          : 'repeating-linear-gradient(60deg, var(--accent) 0, var(--accent) 10px, var(--bg-2) 10px, var(--bg-2) 20px)')}
      >
        {#if activeProject.thumbnail}
          <img class="modal-hero-img" src={activeProject.thumbnail} alt={activeProject.title} />
        {:else}
          <span class="modal-hero-initials">
            {activeProject.title.split(' ').map(w => w[0]).join('')}
          </span>
        {/if}
      </div>

      <div class="modal-body">
        <div class="modal-left">
          <div class="modal-meta-row">
            <span class="modal-pill">{activeProject.year}</span>
            {#each activeProject.tags as tag}
              <span class="modal-pill">{tag}</span>
            {/each}
          </div>
          <h3 class="modal-title">{activeProject.title}</h3>
          <div class="modal-role">{activeProject.role}</div>

          <div class="modal-section-label">The problem</div>
          <p class="modal-text">{activeProject.problem}</p>

          <div class="modal-section-label">What I did</div>
          <p class="modal-text modal-text--dim">{activeProject.solution}</p>

          <div class="modal-section-label">Tech & tools</div>
          <div class="stack-list">
            {#each activeProject.stack as tool}
              <span class="stack-tag">{tool}</span>
            {/each}
          </div>
        </div>

        <div class="modal-right">
          {#if activeProject.images.length > 0}
            <div class="modal-section-label">Process · {activeProject.images.length} shots</div>
            <div class="shots-grid">
              {#each activeProject.images as src, si}
                <div class="shot">
                  <img class="shot-img" {src} alt="Process shot {si + 1}" />
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* ── section ── */
  .gallery-section {
    padding-top: 80px;
    padding-bottom: 140px;
  }

  .gallery-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 64px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .section-title {
    font-family: var(--serif);
    font-weight: 400;
    font-size: clamp(40px, 6vw, 76px);
    margin: 14px 0 0;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  .accent-word { color: var(--accent); }

  .gallery-count {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-dim);
    text-align: right;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .accent-text { color: var(--accent); }

  /* ── grid ── */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
    row-gap: 48px;
    align-items: start;
  }

  /* ── card ── */
  .gallery-card {
    position: relative;
    background: transparent;
    border: none;
    padding: 0;
    text-align: left;
    cursor: pointer;
    transition: transform 0.5s cubic-bezier(.7, 0, .2, 1);
  }

  .card-thumb {
    position: relative;
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    isolation: isolate;
    transition: transform 0.4s cubic-bezier(.7, 0, .2, 1),
                box-shadow 0.4s cubic-bezier(.7, 0, .2, 1);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
  }

  .card-img {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    filter: sepia(100%) hue-rotate(0deg) brightness(0.75) saturate(0%);
    z-index: 0;
  }

  .card-thumb--hovered {
    transform: scale(1.015);
    box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6);
  }

  .card-index {
    position: absolute;
    top: 14px; left: 14px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--fg);
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 4px 10px;
    border-radius: 100px;
    z-index: 2;
    white-space: nowrap;
  }

  .card-tint {
    position: absolute;
    inset: 0;
    background: var(--accent);
    mix-blend-mode: multiply;
    opacity: 1;
    pointer-events: none;
    z-index: 1;
  }

  .card-bottom-row {
    position: absolute;
    bottom: 14px; left: 14px; right: 14px;
    display: flex;
    justify-content: flex-start;
    z-index: 2;
  }

  .card-pill {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--fg);
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 4px 8px;
    border-radius: 3px;
  }

  .card-meta {
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }

  .card-title {
    font-family: var(--serif);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--fg);
    letter-spacing: -0.01em;
  }

  .card-role {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--fg-dim);
    margin-top: 4px;
  }

  .card-year {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--fg-dim);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  /* ── modal ── */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 32px;
    overflow-y: auto;
    animation: fade-in 0.3s ease;
  }

  .modal-shell {
    background: var(--bg-2);
    border: 0.5px solid var(--line);
    border-radius: 6px;
    width: 100%;
    max-width: 1100px;
    margin-top: 60px;
    margin-bottom: 60px;
    overflow: hidden;
    position: relative;
  }

  .modal-close {
    position: absolute; top: 16px; right: 16px;
    width: 36px; height: 36px;
    border: 0.5px solid var(--line);
    background: transparent;
    color: var(--fg);
    font-family: var(--mono);
    font-size: 14px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s, color 0.2s;
  }

  .modal-close:hover { border-color: var(--accent); color: var(--accent); }

  .modal-hero-shot {
    position: relative;
    aspect-ratio: 21 / 9;
    border-bottom: 0.5px solid var(--line);
    overflow: hidden;
  }

  .modal-hero-initials {
    position: absolute; inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--serif);
    font-size: clamp(110px, 22vw, 260px);
    color: var(--accent);
    opacity: 0.9;
    font-weight: 400;
    letter-spacing: -0.03em;
    mix-blend-mode: multiply;
    pointer-events: none;
    user-select: none;
  }


  .modal-body {
    padding: 64px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }

  .modal-meta-row {
    display: flex;
    gap: 8px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-dim);
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .modal-pill {
    padding: 4px 10px;
    border: 0.5px solid var(--line);
    border-radius: 100px;
  }

  .modal-title {
    font-family: var(--serif); font-weight: 400;
    font-size: clamp(36px, 5vw, 60px);
    line-height: 1.05; letter-spacing: -0.02em;
    margin: 0 0 16px;
  }

  .modal-role {
    font-family: var(--mono); font-size: 11px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 28px;
  }

  .modal-section-label {
    font-family: var(--mono); font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--fg-dim); margin-bottom: 12px;
  }

  .modal-text {
    font-size: 16px; line-height: 1.65; color: var(--fg);
    margin: 0 0 28px;
  }

  .modal-text--dim { color: var(--fg-dim); }

  .stack-list { display: flex; flex-wrap: wrap; gap: 8px; }

  .stack-tag {
    padding: 6px 12px;
    border: 0.5px solid var(--line);
    border-radius: 100px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--fg-dim);
  }

  .shots-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .shot {
    aspect-ratio: 4 / 3;
    border-radius: 3px;
    border: 0.5px solid var(--line);
    overflow: hidden;
  }

  .shot-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  .modal-hero-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── responsive ── */
  @media (max-width: 1024px) {
    .gallery-grid {
      grid-template-columns: repeat(6, 1fr);
    }
    .gallery-card {
      grid-column: span 3 !important;
    }
  }

  @media (max-width: 640px) {
    .gallery-grid {
      grid-template-columns: 1fr;
      row-gap: 32px;
    }
    .gallery-card {
      grid-column: span 1 !important;
    }
    .card-thumb { aspect-ratio: 4 / 5 !important; }
    .modal-backdrop { padding: 0; }
    .modal-shell { margin: 0; border-radius: 0; min-height: 100dvh; }
    .modal-hero-shot { aspect-ratio: 1 / 1; }
    .modal-body {
      padding: 40px 24px;
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  @media (max-width: 980px) {
    .modal-body {
      padding: 48px 40px;
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
</style>
