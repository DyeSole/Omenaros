import { openAutoSummaryDialog } from './dialog';

function init() {
  $(window.parent.document)
    .off('click.omenarosAutoSummary')
    .on('click.omenarosAutoSummary', '#extensionsMenu [data-omenaros-wand="autoSummary"]', () => {
      openAutoSummaryDialog();
    });

  $(window).on('pagehide', () => {
    $(window.parent.document).off('click.omenarosAutoSummary');
  });
}

$(() => {
  errorCatched(init)();
});

