import type { AutoSummaryDialogState } from './dialog.state';
import { createAutoSummaryToolbar } from './dialog.toolbar';
import { createApiTab } from './tab.api';
import { createPresetTab } from './tab.preset';
import { createSettingsTab } from './tab.settings';

export type AutoSummaryDialogParts = {
  $container: JQuery<HTMLElement>;
  $title: JQuery<HTMLElement>;
  $close: JQuery<HTMLElement>;
};

export function createAutoSummaryDialog(state: AutoSummaryDialogState): AutoSummaryDialogParts {
  const $p = (window.parent as any).$ ?? $;
  const id = 'omenaros-autoSummary-dialog';

  const $container = $p('<div>')
    .attr('id', id)
    .addClass('dialog-resizable dialog-teleported')
    .css({
      position: 'absolute',
      willChange: 'transform',
      transform: 'translate3d(0px, 0px, 0px)',
      left: `${state.left}px`,
      top: `${state.top}px`,
      width: `${state.width}px`,
      height: `${state.height}px`,
      zIndex: 10000,
      userSelect: 'auto',
    });

  const $dialog = $p('<div>')
    .addClass(
      'TH-custom-tailwind flex h-full flex-col overflow-hidden bg-(--SmartThemeBlurTintColor) shadow-lg rounded-sm',
    )
    .attr('role', 'dialog')
    .attr('aria-modal', 'true');

  const $header = $p('<div>')
    .addClass('flex shrink-0 items-center justify-between px-1 select-none')
    .css({ backgroundColor: 'var(--SmartThemeEmColor)' });

  const $title = $p('<div>')
    .addClass('flex-1 cursor-move font-bold text-(--SmartThemeBodyColor) ')
    .text('自动总结')
    .css({ touchAction: 'none' });

  const $actions = $p('<div>').addClass('flex shrink-0 gap-1 text-(--SmartThemeBodyColor)');

  const $help = $p('<div>')
    .addClass('flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent th-text-base!')
    .append($p('<i>').addClass('fa-solid fa-question'));
  $help.on('click', () => toastr.info('自动总结：后续将接入生成与历史管理', '自动总结'));

  const $collapse = $p('<div>')
    .addClass(
      'relative z-20 flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent th-text-base!',
    )
    .append($p('<i>').addClass('fa-solid fa-chevron-up'));

  const $close = $p('<div>').addClass(
    'fa-solid fa-close relative z-20 flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent th-text-base!',
  );

  const $body = $p('<div>').addClass('flex flex-1 flex-col overflow-hidden p-1');
  const $content = $p('<div>').addClass('flex h-full flex-col overflow-hidden gap-2');
  const $contentTop = $p('<div>').addClass('flex shrink-0');
  const $contentBody = $p('<div>').addClass('flex flex-1 flex-col overflow-hidden gap-2');

  const $toolbar = createAutoSummaryToolbar($p);
  $contentTop.append($toolbar);

  const $mainStatus = $p('<div>').addClass('flex flex-col');
  $mainStatus.append(
    $p('<div>').addClass('flex flex-col').append($p('<div>').addClass('opacity-70').text('当前状态')),
    $p('<pre>').addClass('m0').css({ whiteSpace: 'pre-wrap' }).text('未生成'),
  );

  const $tabBody = $p('<div>').addClass('flex flex-col overflow-hidden gap-2').css({ display: 'none' });

  const getTabContent = (tab: string): JQuery<HTMLElement> => {
    if (tab === 'preset') return createPresetTab($p);
    if (tab === 'api') return createApiTab($p);
    return createSettingsTab($p);
  };

  $toolbar.find('[data-tab]').on('click', event => {
    const tab = $p(event.currentTarget).attr('data-tab') ?? 'settings';
    $mainStatus.hide();
    $tabBody.empty().append(getTabContent(tab)).show();
  });

  $contentBody.append($mainStatus, $tabBody);
  $content.append($contentTop, $contentBody);
  $body.append($content);

  $actions.append($help, $collapse, $close);
  $header.append($title, $actions);
  $dialog.append($header, $body);
  $container.append($dialog);

  return { $container, $title, $close };
}
