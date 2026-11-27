for (const help of document.querySelectorAll('.exercise-help')) {
  const hints = Array.from(help.querySelectorAll('.exercise-hints > li'));
  const next = help.querySelector('[data-next]');
  const toggle = help.querySelector('[data-solution]');
  const solution = help.querySelector('.exercise-solution');
  let visibleHints = 1;

  function updateControls() {
    const allHintsVisible = visibleHints === hints.length;
    next.hidden = allHintsVisible;
    toggle.hidden = !allHintsVisible;
    next.textContent = `Nächsten Tipp anzeigen (${visibleHints + 1} von ${hints.length})`;
  }

  next.addEventListener('click', () => {
    const hint = hints[visibleHints];
    hint.hidden = false;
    visibleHints += 1;
    updateControls();
    hint.tabIndex = -1;
    hint.focus();
  });

  toggle.addEventListener('click', () => {
    solution.hidden = !solution.hidden;
    toggle.setAttribute('aria-expanded', String(!solution.hidden));
    toggle.textContent = solution.hidden ? 'Musterlösung anzeigen' : 'Musterlösung ausblenden';
  });

  updateControls();
  help.hidden = false;
}
