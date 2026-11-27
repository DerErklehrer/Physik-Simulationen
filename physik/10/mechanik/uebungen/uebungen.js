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

const topicLinks = Array.from(document.querySelectorAll('.exercise-nav a'));
const topicGroups = topicLinks.map(link => document.getElementById(link.hash.slice(1)));

function showTopic() {
  const target = document.getElementById(window.location.hash.slice(1));
  const linkedGroup = target?.closest('.exercise-group');
  const activeGroup = linkedGroup ?? topicGroups[0];

  for (const [index, group] of topicGroups.entries()) {
    const active = group === activeGroup;
    group.hidden = !active;
    if (active) {
      topicLinks[index].setAttribute('aria-current', 'true');
    } else {
      topicLinks[index].removeAttribute('aria-current');
    }
  }

  if (linkedGroup && target !== linkedGroup) {
    target.scrollIntoView();
  }
}

for (const link of topicLinks) {
  link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    if (window.location.hash !== link.hash) history.pushState(null, '', link.hash);
    showTopic();
  });
}

window.addEventListener('hashchange', showTopic);
showTopic();
