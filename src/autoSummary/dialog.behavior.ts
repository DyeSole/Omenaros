import { writeDialogState } from './dialog.state';

export function bindAutoSummaryDialogBehavior(parts: {
  $container: JQuery<HTMLElement>;
  $title: JQuery<HTMLElement>;
  $close: JQuery<HTMLElement>;
}) {
  const { $container, $title, $close } = parts;

  $close.on('click', () => {
    writeDialogState($container);
    $container.remove();
  });

  if (typeof ($container as any).draggable === 'function') {
    ($container as any).draggable({
      handle: $title,
      stop: () => writeDialogState($container),
    });
  }

  if (typeof ($container as any).resizable === 'function') {
    ($container as any).resizable({
      minWidth: 360,
      minHeight: 240,
      stop: () => writeDialogState($container),
    });
  }
}

