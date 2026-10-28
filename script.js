// Hero transcript: words appear in order, as a live speech-to-text feed would.
// Without JavaScript, or with reduced motion, the full text simply shows.

(() => {
  const transcript = document.getElementById('transcript');
  if (!transcript || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const WORD_MS = 70;
  const LINE_PAUSE_MS = 380;
  let delay = 200;

  // Wrap each word (keeping inline elements such as the name intact).
  for (const line of transcript.querySelectorAll('li')) {
    line.style.setProperty('--line-delay', `${delay}ms`);
    const p = line.querySelector('p');
    for (const node of [...p.childNodes]) {
      const parts = node.nodeType === Node.TEXT_NODE
        ? node.textContent.split(/(\s+)/)
        : [node];
      const frag = document.createDocumentFragment();
      for (const part of parts) {
        if (typeof part === 'string' && !part.trim()) { frag.append(part); continue; }
        const word = document.createElement('span');
        word.className = 'word';
        word.style.setProperty('--d', `${delay}ms`);
        word.append(typeof part === 'string' ? part : part.cloneNode(true));
        frag.append(word);
        delay += WORD_MS;
      }
      node.replaceWith(frag);
    }
    delay += LINE_PAUSE_MS;
  }
  transcript.style.setProperty('--done', `${delay}ms`);
  transcript.classList.add('is-live');
})();
