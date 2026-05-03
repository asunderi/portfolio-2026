<script lang="ts">
  import { PROJECTS } from '../data/projects.js';

  let openRows = $state<Set<number>>(new Set());

  function toggle(i: number) {
    openRows = openRows.has(i) ? new Set() : new Set([i]);
  }
</script>

<section class="gallery-section wrap" id="work" data-screen-label="02 Gallery">
  <div class="gallery-head">
    <div>
      <div class="label" style="margin-bottom: 14px;">02 — Selected Work</div>
      <h2 class="section-title">The things<br />I <span class="accent-word">made</span>.</h2>
    </div>
    <div class="gallery-count">
      <div>{PROJECTS.length} projects · 2014 — 2026</div>
      <div class="accent-text">click to expand</div>
    </div>
  </div>

  <div class="project-list">
    {#each PROJECTS as project, i}
      {@const open = openRows.has(i)}
      <div class="accordion-item">

        <button
          class="project-row"
          class:project-row--open={open}
          onclick={() => toggle(i)}
          aria-expanded={open}
          aria-label="{open ? 'Collapse' : 'Expand'} {project.title}"
        >
          <span class="row-title">{project.title}</span>
          <div class="row-tags">
            {#each project.tags as tag}<span class="row-tag">{tag}</span>{/each}
            <span class="row-year">{project.year}</span>
          </div>
        </button>

        <div class="accordion-panel" class:accordion-panel--open={open}>
          <div class="accordion-inner">

            <div class="accordion-body">
              <div class="acc-image">
                {#if project.thumbnail}
                  <img class="acc-img" src={project.thumbnail} alt={project.title} />
                {/if}
              </div>
              <div class="acc-text">
                <div class="acc-role">{project.role}</div>
                <div class="acc-label">The problem</div>
                <p class="acc-p">{project.problem}</p>
                <div class="acc-label">What I did</div>
                <p class="acc-p acc-p--dim">{project.solution}</p>
                <div class="acc-label">Tech & tools</div>
                <div class="acc-stack">
                  {#each project.stack as tool}
                    <span class="acc-tag">{tool}</span>
                  {/each}
                </div>
              </div>
            </div>

            {#if project.images.length > 0}
              <div class="acc-shots-wrap">
                <div class="acc-label">Process · {project.images.length} shots</div>
                <div class="acc-shots">
                  {#each project.images as src, si}
                    <div class="acc-shot">
                      <img class="acc-shot-img" {src} alt="Process shot {si + 1}" />
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

          </div>
        </div>

      </div>
    {/each}
  </div>

</section>

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

  /* ── project list ── */
  .project-list {
    display: flex;
    flex-direction: column;
    border-top: 0.5px solid var(--line);
    width: 100%;
  }

  .accordion-item {
    width: 100%;
  }

  .project-row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    width: 100%;
    gap: 24px;
    padding: 28px 0;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
    border-bottom: 0.5px solid var(--line);
    padding-left: 4px;
    border-left: 2px solid transparent;
    transition: border-color 0.2s, background 0.2s;
  }

  .project-row:hover {
    border-left-color: var(--accent);
    background: color-mix(in oklab, var(--bg-2) 40%, transparent);
  }

  .project-row:hover .row-title {
    color: var(--fg);
  }

  .row-title {
    font-family: var(--serif);
    font-size: clamp(22px, 3vw, 36px);
    font-weight: 400;
    color: var(--fg-dim);
    line-height: 1.1;
    letter-spacing: -0.01em;
    transition: color 0.2s;
    padding-left: 16px;
  }

  .row-tags {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .row-tag {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--fg-dim);
    padding: 3px 8px;
    border: 0.5px solid var(--line);
    border-radius: 100px;
  }

  .row-year {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--fg-dim);
    opacity: 0.6;
  }

  /* ── accordion ── */
  .project-row--open { border-left-color: var(--accent); }
  .project-row--open .row-title { color: var(--fg); }

  .accordion-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s cubic-bezier(.4, 0, .2, 1);
  }

  .accordion-panel--open {
    grid-template-rows: 1fr;
  }

  .accordion-inner {
    overflow: hidden;
  }

  .accordion-body {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 40px;
    padding: 32px 0 32px 20px;
    border-bottom: 0.5px solid var(--line);
  }

  .acc-image {
    aspect-ratio: 4 / 3;
    border-radius: 3px;
    overflow: hidden;
    background: var(--bg-2);
    border: 0.5px solid var(--line);
  }

  .acc-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  .acc-role {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 24px;
  }

  .acc-label {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--fg-dim);
    margin-bottom: 10px;
  }

  .acc-p {
    font-size: 15px;
    line-height: 1.65;
    color: var(--fg);
    margin: 0 0 24px;
  }

  .acc-p--dim { color: var(--fg-dim); }

  .acc-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .acc-tag {
    padding: 4px 10px;
    border: 0.5px solid var(--line);
    border-radius: 100px;
    font-family: var(--mono);
    font-size: 10px;
    color: var(--fg-dim);
  }

  .acc-shots-wrap {
    padding: 28px 0 28px 20px;
    border-bottom: 0.5px solid var(--line);
  }

  .acc-shots {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-top: 12px;
  }

  .acc-shot {
    aspect-ratio: 4 / 3;
    border-radius: 3px;
    border: 0.5px solid var(--line);
    overflow: hidden;
  }

  .acc-shot-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── responsive ── */
  @media (max-width: 900px) {
    .accordion-body { grid-template-columns: 1fr; padding-left: 40px; }
    .acc-shots-wrap { padding-left: 40px; }
    .acc-shots { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 720px) {
    .project-row { grid-template-columns: 1fr auto; gap: 16px; }
    .row-tags { display: none; }
    .accordion-body { padding: 24px 20px; }
    .acc-shots-wrap { padding: 20px; }
  }
</style>
