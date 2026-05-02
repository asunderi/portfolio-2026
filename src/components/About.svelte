<script lang="ts">
  import { SKILLS, PERSONALITY, type Skill } from '../data/skills.js';

  type SortKey = 'skill' | 'category' | 'years';
  type Dir = 'asc' | 'desc';
  type Filter = 'All' | 'Design' | 'Code' | 'Tool';

  let sortKey = $state<SortKey>('skill');
  let dir = $state<Dir>('asc');
  let filter = $state<Filter>('All');

  let sorted = $derived.by(() => {
    const list = filter === 'All' ? SKILLS : SKILLS.filter(s => s.category === filter);
    return [...list].sort((a, b) => {
      let av: string | number = a[sortKey];
      let bv: string | number = b[sortKey];
      if (typeof av === 'string') { av = av.toLowerCase(); bv = (bv as string).toLowerCase(); }
      if (av < bv) return dir === 'asc' ? -1 : 1;
      if (av > bv) return dir === 'asc' ? 1 : -1;
      return 0;
    });
  });

  function flip(k: SortKey) {
    if (sortKey === k) {
      dir = dir === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = k;
      dir = 'asc';
    }
  }

  const CATS: Filter[] = ['All', 'Design', 'Code', 'Tool'];

  const catColors: Record<string, { bg: string; fg: string }> = {
    Design: { bg: 'rgba(68,200,166,0.12)',    fg: '#146244' },
    Code:   { bg: 'rgba(166, 48, 85, 0.18)',   fg: '#A63055' },
    Tool:   { bg: 'rgba(232,201,138,0.18)', fg: 'var(--fg-dim)' },
  };

  function handleResume(e: MouseEvent) {
    e.preventDefault();
    console.log('%c[ resume ] download stub — wire to /resume.pdf', 'color:#9fd9c8');
    alert('Resume download — replace this with a real PDF link.');
  }
</script>

<section class="about-section wrap" id="about" data-screen-label="03 About">
  <div class="about-head">
    <div class="label">§ 03 — About + Stack</div>
    <h2 class="about-title">
      The relevant<br />and the <span class="accent-word">true.</span>
    </h2>
  </div>

  <div class="about-grid">
    <!-- Left: bio + contact -->
    <div class="about-left">
      <p class="bio">
        I'm a <em class="bio-em">multidisciplinary designer</em> who started in print,
        fell into digital, and never crawled out. Over ten years of design systems, brand
        work, mobile apps, illustration, and the occasional comment that spirals conversations.
      </p>
      <p class="bio">
        I work analytically — typography is math, color is physics, hierarchy is a
        load-bearing wall. Underneath that, I am
        <em class="bio-em" title="this is a hint">slightly unhinged</em>
        and would like the work to feel that way too with continuous commentary and unnecessary hover states.
      </p>
      <p class="bio">
        Based in Portage, Michigan with not enough cats, an unreasonable backlog of
         games, and a standing brown sugar boba order.
      </p>

      <div class="contact-block">
        <div class="contact-row">
          <span class="contact-key">Based</span>
          <span class="contact-val">{PERSONALITY.city}</span>
        </div>
        <div class="contact-row">
          <span class="contact-key">Email</span>
          <a href="mailto:{PERSONALITY.email}" class="contact-link">
            {PERSONALITY.email}
          </a>
        </div>
          <div class="contact-row">
              <span class="contact-key">Listening</span>
              <span class="contact-val" title="ask me about it">{PERSONALITY.currentlyListening}</span>
          </div>
        <div class="contact-row contact-row--last">
          <span class="contact-key">Currently</span>
          <span class="contact-val" title="ask me about it">{PERSONALITY.currentlyPlaying}</span>
        </div>

        <button class="resume-btn" onclick={handleResume}>
          <span>↓ Download Résumé</span>
          <span class="resume-size">PDF · 312kb</span>
        </button>
      </div>
    </div>

    <!-- Right: skills table -->
    <div class="about-right">
      <div class="skills-label label">Skills · Tools · Stack</div>

      <div class="filter-row" role="group" aria-label="Filter by category">
        {#each CATS as cat}
          <button
            class="filter-btn"
            class:filter-btn--active={filter === cat}
            onclick={() => { filter = cat; }}
            aria-pressed={filter === cat}
          >
            {cat}
          </button>
        {/each}
      </div>

      <div class="table-wrap" role="table" aria-label="Skills table">
        <div class="thead" role="rowgroup">
          <div class="tr" role="row">
            <button
              class="th"
              class:th--active={sortKey === 'skill'}
              onclick={() => flip('skill')}
              aria-sort={sortKey === 'skill' ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Skill {sortKey === 'skill' ? (dir === 'asc' ? '▲' : '▼') : ''}
            </button>
            <button
              class="th"
              class:th--active={sortKey === 'category'}
              onclick={() => flip('category')}
              aria-sort={sortKey === 'category' ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Category {sortKey === 'category' ? (dir === 'asc' ? '▲' : '▼') : ''}
            </button>
            <button
              class="th"
              class:th--active={sortKey === 'years'}
              onclick={() => flip('years')}
              aria-sort={sortKey === 'years' ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Years {sortKey === 'years' ? (dir === 'asc' ? '▲' : '▼') : ''}
            </button>
            <div class="th" role="columnheader" aria-label="Favourite">♡</div>
          </div>
        </div>

        <div class="tbody" role="rowgroup">
          {#each sorted as s (s.skill)}
            <div
              class="tr skill-row"
              class:skill-row--fav={s.fav}
              role="row"
            >
              <div class="td td--name" role="cell">{s.skill}</div>
              <div class="td" role="cell">
                <span
                  class="cat-tag"
                  style:background={catColors[s.category]?.bg}
                  style:color={catColors[s.category]?.fg}
                  style:border-color={catColors[s.category]?.fg === 'var(--fg-dim)' ? 'var(--line)' : catColors[s.category]?.fg}
                >
                  <span class="cat-dot" style:background={catColors[s.category]?.fg}></span>
                  {s.category}
                </span>
              </div>
              <div class="td td--dim" role="cell">{s.years}y</div>
              <div class="td td--fav" role="cell" aria-label={s.fav ? 'Favourite' : ''}>
                {#if s.fav}♥{/if}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="table-foot">♥ = current obsession · click any header to sort</div>
    </div>
  </div>
</section>

<style>
  .about-section {
    padding-top: 80px;
    padding-bottom: 100px;
  }

  .about-head {
    margin-bottom: 64px;
  }

  .about-title {
    font-family: var(--serif);
    font-weight: 400;
    font-size: clamp(40px, 6vw, 76px);
    margin: 14px 0 0;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  .accent-word { color: var(--accent); }

  /* ── grid ── */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 80px;
    align-items: start;
  }

  /* ── bio ── */
  .bio {
    font-size: 17px;
    line-height: 1.65;
    color: var(--fg-dim);
    margin: 0 0 20px;
  }

  .bio-em {
    color: var(--fg);
    font-family: var(--serif);
    font-weight: 400;
    font-size: 1.08em;
    font-style: normal;
  }

  /* ── contact block ── */
  .contact-block {
    margin-top: 40px;
    padding: 24px;
    border: 0.5px solid var(--line);
    border-radius: 6px;
    background: var(--bg-2);
  }

  .contact-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 0.5px solid var(--line);
    font-family: var(--mono);
    font-size: 12px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .contact-row--last { border-bottom: none; }

  .contact-key {
    color: var(--fg-dim);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 10px;
  }

  .contact-val { color: var(--fg); }

  .contact-link {
    color: var(--accent);
    text-decoration: none;
  }
  .contact-link:hover { text-decoration: underline; }

  .resume-btn {
    margin-top: 20px;
    width: 100%;
    padding: 14px 18px;
    border: 0.5px solid var(--accent);
    background: var(--accent);
    color: #f5ede8;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.2s, border-color 0.2s;
  }

  .resume-btn:hover { background: var(--accent-2); border-color: var(--accent-2); color: #f5ede8; }

  .resume-size { opacity: 0.65; }

  /* ── skills ── */
  .skills-label { margin-bottom: 16px; }

  .filter-row {
    display: flex;
    gap: 6px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 5px 12px;
    border: 0.5px solid var(--line);
    background: transparent;
    color: var(--fg-dim);
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-radius: 100px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .filter-btn--active {
    background: var(--accent);
    color: var(--bg);
    border-color: var(--accent);
  }

  .table-wrap {
    border-top: 0.5px solid var(--line);
    border-bottom: 0.5px solid var(--line);
  }

  .thead { border-bottom: 0.5px solid var(--line); }

  .tr {
    display: grid;
    grid-template-columns: 2.4fr 1.2fr 0.7fr 0.4fr;
    padding: 12px 14px;
    gap: 10px;
    align-items: center;
  }

  .th {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--fg-dim);
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.2s;
  }

  .th--active { color: var(--accent); }

  .skill-row {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--fg);
    border-bottom: 0.5px solid var(--line);
    transition: background 0.15s;
  }

  .skill-row:last-child { border-bottom: none; }
  .skill-row:hover { background: var(--bg-2); }
  .skill-row--fav { color: var(--accent); }

  .td { }
  .td--name { font-weight: 400; }
  .skill-row--fav .td--name { font-weight: 500; }
  .td--dim { color: var(--fg-dim); }
  .td--fav { text-align: right; }

  .cat-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 9px;
    padding: 3px 9px;
    border: 0.5px solid;
    border-radius: 100px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .cat-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  .table-foot {
    margin-top: 10px;
    font-family: var(--mono);
    font-size: 10px;
    color: var(--fg-dim);
    letter-spacing: 0.1em;
  }

  /* ── responsive ── */
  @media (max-width: 900px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 60px;
    }
  }

  @media (max-width: 720px) {
    .tr {
      grid-template-columns: 1.8fr 1fr 0.6fr 0.4fr;
      font-size: 11px;
    }
  }
</style>
