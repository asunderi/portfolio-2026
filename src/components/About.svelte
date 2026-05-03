<script lang="ts">
  import { SKILLS, PERSONALITY, type Skill } from '../data/skills.js';

  function handleResume(e: MouseEvent) {
    e.preventDefault();
    console.log('%c[ resume ] download stub — wire to /resume.pdf', 'color:#9fd9c8');
    alert('Resume download — replace this with a real PDF link.');
  }
</script>

<section class="about-section wrap" id="about" data-screen-label="03 About">
  <div class="about-head">
    <div class="label">03 — About + Tools</div>
    <h2 class="about-title">
        The things <br /> I <span class="accent-word">do</span> and <span class="accent-word">use</span>.
    </h2>
  </div>

  <div class="about-grid">
    <!-- Left: bio + contact -->
    <div class="about-left">
      <p class="bio">
        I'm a <em class="bio-em">multidisciplinary designer</em> who started in print,
        fell into digital, and never looked back. Over ten years of design systems, brand
        work, mobile apps, illustration, iterations, and prototyping.
      </p>
      <p class="bio">
        Starting in print gave me a foundation most digital designers skip — systems thinking before there was a component library to reach for. That background shows up in how I work: consistent across media, built to scale, just as comfortable in InDesign as in a codebase.
      </p>
      <p class="bio">
        Based in Portage, Michigan with not enough cats, an unreasonable backlog of
         video games, and a desire for boba tea to be pumped into my veins.
      </p>

      <div class="contact-block">
        <div class="contact-row">
          <span class="contact-key">Based</span>
          <span class="contact-val">{PERSONALITY.city}</span>
        </div>
        <div class="contact-row contact-row--last">
          <span class="contact-key">Email</span>
          <a href="mailto:{PERSONALITY.email}" class="contact-link">
            {PERSONALITY.email}
          </a>
        </div>

        <button class="resume-btn" onclick={handleResume}>
          <span>↓ Download Résumé</span>
          <span class="resume-size">PDF · 312kb</span>
        </button>
      </div>
    </div>

    <!-- Right: skills table -->
    <div class="about-right">
      <div class="skills-label label">Skills · Tools</div>

      <div class="table-wrap" role="table" aria-label="Skills table">
        <div class="thead" role="rowgroup">
          <div class="tr" role="row">
            <div class="th" role="columnheader">Skill</div>
            <div class="th" role="columnheader">Category</div>
          </div>
        </div>

        <div class="tbody" role="rowgroup">
          {#each SKILLS as s (s.skill)}
            <div
              class="tr skill-row"
              class:skill-row--fav={s.fav}
              role="row"
            >
              <div class="td td--name" role="cell">
                {s.skill}{#if s.fav}<span class="fav-heart">♥</span>{/if}
              </div>
              <div class="td" role="cell">
                <span class="cat-tag cat-{s.category.toLowerCase()}">
                  <span class="cat-dot"></span>
                  {s.category}
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="table-foot">♥ = current obsession</div>
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

  .table-wrap {
    border-top: 0.5px solid var(--line);
    border-bottom: 0.5px solid var(--line);
  }

  .thead { border-bottom: 0.5px solid var(--line); }

  .tr {
    display: grid;
    grid-template-columns: 2.4fr 1.2fr;
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
  }

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

  .td--name { font-weight: 400; }
  .skill-row--fav .td--name { font-weight: 500; }

  .fav-heart {
    margin-left: 7px;
    color: var(--accent);
    font-size: 0.85em;
  }

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

  .cat-design { background: var(--cat-design-bg); color: var(--cat-design-fg); }
  .cat-design .cat-dot { background: var(--cat-design-fg); }

  .cat-code { background: var(--cat-code-bg); color: var(--cat-code-fg); }
  .cat-code .cat-dot { background: var(--cat-code-fg); }

  .cat-tool { background: var(--cat-tool-bg); color: var(--fg-dim); border-color: var(--line); }
  .cat-tool .cat-dot { background: var(--fg-dim); }

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
      grid-template-columns: 1.8fr 1fr;
      font-size: 11px;
    }
  }
</style>
