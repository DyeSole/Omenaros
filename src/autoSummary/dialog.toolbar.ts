export function createAutoSummaryToolbar($p: JQueryStatic): JQuery<HTMLElement> {
  const $toolbar = $p('<div>').addClass('flex flex-wrap gap-1 text-(--SmartThemeBodyColor)');
  const $btnSettings = $p('<div>')
    .addClass('menu_button menu_button_icon interactable')
    .attr('data-tab', 'settings')
    .attr('title', '设置')
    .append($p('<i>').addClass('fa-solid fa-sliders'));
  const $btnConnect = $p('<div>')
    .addClass('menu_button menu_button_icon interactable')
    .attr('data-tab', 'api')
    .attr('title', 'API')
    .append($p('<i>').addClass('fa-solid fa-plug'));
  const $btnOptions = $p('<div>')
    .addClass('menu_button menu_button_icon interactable')
    .attr('data-tab', 'preset')
    .attr('title', '预设')
    .append($p('<i>').addClass('fa-solid fa-gear'));
  $toolbar.append($btnSettings, $btnConnect, $btnOptions);
  return $toolbar;
}
