<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  interface StatSlide {
    key: string;
    val: string;
    sub: string;
  }

  interface StatConfig {
    slides: StatSlide[];
    interval: number;
  }

  const STATS: StatConfig[] = [
    {
      interval: 7000,
      slides: [
        { key: 'Years in industry', val: '10',  sub: 'and counting' },
        { key: 'Skills in toolkit', val: '16',  sub: 'design · code · tools' },
        { key: 'Favourite tools',   val: '4',   sub: 'indesign · figma · ui/ux · jetbrains' },
      ],
    },
    {
      interval: 9000,
      slides: [
        { key: 'Projects shipped',      val: '147', sub: 'across 6 industries' },
        { key: 'Featured in portfolio', val: '9',   sub: 'hand-picked' },
        { key: 'Currently active',      val: '1',   sub: 'northstar care community' },
      ],
    },
  ];

  let indices = $state([0, 0]);
  let paused  = $state([false, false]);

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timers = STATS.map((cfg, i) =>
      setInterval(() => {
        if (!paused[i]) indices[i] = (indices[i] + 1) % cfg.slides.length;
      }, cfg.interval)
    );

    return () => timers.forEach(clearInterval);
  });
</script>

<section class="hero-section wrap" data-screen-label="01 Hero">
  <div class="hero-top-row">
    <div class="hero-meta">
      <div class="meta-line">
        <span class="blink-square" aria-hidden="true"></span>
        <span>Portage, Michigan</span>
      </div>
    </div>
  </div>

  <div class="hero-name-block">
    <h1 class="hero-name">
      <span class="name-anastacia">Anastacia</span>
      <br />
      Frost<span
        class="name-glyph"
        title="three things I am, in order of arrival"
      >♥</span>
    </h1>
    <p class="hero-tagline">
      Graphic designer, web developer, and
      <em class="tagline-em">UI/UX designer</em>
      — ten years of shipping work that bridges brand, systems, and code. Based in Michigan.
    </p>
  </div>

  <div class="hero-ledger" role="list">
    {#each STATS as cfg, i}
      <div
        class="stat"
        class:stat--last={i === STATS.length - 1}
        role="listitem"
        onmouseenter={() => (paused[i] = true)}
        onmouseleave={() => (paused[i] = false)}
      >
        <div class="stat-inner">
          {#each [cfg.slides[indices[i]]] as slide (indices[i])}
            <div
              class="stat-content"
              in:fly={{ y: 20, duration: 250, delay: 50 }}
              out:fly={{ y: -20, duration: 200 }}
            >
              <div class="stat-key">{slide.key}</div>
              <div class="stat-val">{slide.val}</div>
              <div class="stat-sub">{slide.sub}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .hero-section {
    padding-top: 180px;
    padding-bottom: 120px;
  }

  .hero-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 72px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .hero-meta {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-dim);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .hero-meta--right {
    text-align: right;
  }

  .meta-line {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .blink-square {
    display: inline-block;
    width: 7px; height: 7px;
    background: var(--accent);
    border-radius: 1px;
  }

  .version-tag {
    color: var(--fg-dim);
  }

  /* ── name block ── */
  .hero-name-block {
    position: relative;
    margin-bottom: 80px;
  }

  .hero-name {
    font-family: var(--serif);
    font-weight: 400;
    font-size: clamp(64px, 13vw, 210px);
    line-height: 0.92;
    letter-spacing: -0.025em;
    margin: 0;
    color: var(--fg);
    position: relative;
  }

  .name-anastacia {
    color: var(--accent);
  }

  .name-glyph {
    color: var(--accent-2);
    font-family: var(--mono);
    font-size: 0.16em;
    vertical-align: top;
    margin-left: 12px;
    opacity: 0.7;
  }

  .hero-tagline {
    margin-top: 36px;
    max-width: 620px;
    font-size: 18px;
    line-height: 1.6;
    color: var(--fg-dim);
    font-style: normal;
  }

  .tagline-em {
    color: var(--fg);
    font-family: var(--serif);
    font-weight: 400;
    font-size: 1.08em;
    font-style: normal;
  }

  /* ── ledger ── */

  .hero-ledger {
    border-top: 0.5px solid var(--line);
    border-bottom: 0.5px solid var(--line);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    font-family: var(--mono);
  }

  .stat {
    padding: 28px 24px;
    border-right: 0.5px solid var(--line);
    position: relative;
    overflow: hidden;
    cursor: default;
  }

  .stat--last { border-right: none; }

  .stat-inner {
    position: relative;
    overflow: hidden;
    min-height: calc(clamp(40px, 5vw, 60px) + 64px);
  }

  .stat-content {
    position: absolute;
    width: 100%;
    top: 0;
  }

  .stat-key {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--fg-dim);
    margin-bottom: 14px;
  }

  .stat-val {
    font-family: var(--serif);
    font-weight: 400;
    font-size: clamp(40px, 5vw, 60px);
    line-height: 1;
    color: var(--accent-2);
    font-variant-numeric: tabular-nums;
  }

  .stat-sub {
    margin-top: 10px;
    font-size: 10px;
    color: var(--fg-dim);
    letter-spacing: 0.04em;
  }

  /* ── responsive ── */

  @media (max-width: 720px) {
    .hero-section { padding-top: 120px; padding-bottom: 80px; }
    .hero-top-row { margin-bottom: 48px; }
    .hero-name-block { margin-bottom: 60px; }
    .hero-ledger { grid-template-columns: 1fr; }
    .stat { border-right: none; border-bottom: 0.5px solid var(--line); }
    .stat--last { border-bottom: none; }
  }
</style>
