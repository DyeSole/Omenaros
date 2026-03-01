export type AutoSummaryDialogState = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const STORAGE_KEY = 'autoSummaryDialog';

export function readDialogState(): AutoSummaryDialogState {
  const defaults: AutoSummaryDialogState = { left: 140, top: 120, width: 460, height: 520 };
  try {
    const vars = getVariables({ type: 'script', script_id: getScriptId() }) as Record<string, any>;
    const saved = vars?.[STORAGE_KEY] as Partial<AutoSummaryDialogState> | undefined;
    return {
      left: Number.isFinite(saved?.left) ? Number(saved?.left) : defaults.left,
      top: Number.isFinite(saved?.top) ? Number(saved?.top) : defaults.top,
      width: Number.isFinite(saved?.width) ? Number(saved?.width) : defaults.width,
      height: Number.isFinite(saved?.height) ? Number(saved?.height) : defaults.height,
    };
  } catch {
    return defaults;
  }
}

export function writeDialogState($container: JQuery<HTMLElement>) {
  const offset = $container.position();
  const width = Math.round($container.outerWidth() ?? 0) || 460;
  const height = Math.round($container.outerHeight() ?? 0) || 520;
  insertOrAssignVariables(
    {
      [STORAGE_KEY]: {
        left: Math.round(offset.left),
        top: Math.round(offset.top),
        width,
        height,
      },
    },
    { type: 'script', script_id: getScriptId() },
  );
}
