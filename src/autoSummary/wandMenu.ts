function ensureAutoSummaryWandMenuButton() {
  const menu = $('#extensionsMenu')[0];
  if (!menu) {
    return;
  }

  if ($(menu).find('[data-omenaros-wand="autoSummary"]').length > 0) {
    return;
  }

  const $autoSummaryItem = $(`
    <div class="list-group-item flex-container flexGap5 interactable" tabindex="0" role="listitem" data-omenaros-wand="autoSummary">
      <div class="fa-fw fa-solid fa-note-sticky extensionsMenuExtensionButton"></div>
      <span>自动总结</span>
    </div>
  `);

  $(menu).append($autoSummaryItem);
}

function init() {
  ensureAutoSummaryWandMenuButton();

  const observer = new MutationObserver(() => ensureAutoSummaryWandMenuButton());
  observer.observe(window.parent.document.body, { subtree: true, childList: true });

  $(window).on('pagehide', () => {
    observer.disconnect();
  });
}

$(() => {
  errorCatched(init)();
});

