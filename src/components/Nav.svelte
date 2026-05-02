<script lang="ts">
  import { onMount } from 'svelte';
  import { world } from '../stores/ui.js';

  function toggleWorld() {
    world.update(w => (w === 'a' ? 'b' : 'a'));
  }

  onMount(() => {
    return world.subscribe(w => {
      document.body.dataset.world = w;
    });
  });
</script>

<nav class="nav">
  <div class="nav-inner">
    <a href="#" class="nav-mark">
      <span class="dot"></span>
      <span>A.F. — designer / dev</span>
    </a>
    <div class="nav-links">
      <a href="#work">Work</a>
      <a href="#about">About</a>
      <button class="world-toggle" onclick={toggleWorld} title="flip the color world">
        <span class="pip"></span>
        <span>World {$world === 'a' ? 'A' : 'B'}</span>
      </button>
    </div>
  </div>
</nav>
