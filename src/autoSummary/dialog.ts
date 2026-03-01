import { bindAutoSummaryDialogBehavior } from './dialog.behavior';
import { readDialogState } from './dialog.state';
import { createAutoSummaryDialog } from './dialog.ui';

export function openAutoSummaryDialog() {
  const $p = (window.parent as any).$ ?? $;
  const id = 'omenaros-autoSummary-dialog';

  const $existing = $p(`#${id}`);
  if ($existing.length > 0) return;

  const state = readDialogState();
  const parts = createAutoSummaryDialog(state);

  $p('body').append(parts.$container);
  bindAutoSummaryDialogBehavior(parts);
}
