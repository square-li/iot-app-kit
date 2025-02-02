import type { Rect, Widget } from '~/types';

export const transformWidget: (widget: Widget, pre: Rect, curr: Rect) => Widget = (widget, prev, curr) => {
  const offsetX = widget.x - prev.x;
  const offsetY = widget.y - prev.y;

  const scaleX = curr.width / prev.width;
  const scaleY = curr.height / prev.height;

  return {
    ...widget,
    x: curr.x + offsetX * scaleX,
    y: curr.y + offsetY * scaleY,
    width: widget.width * scaleX,
    height: widget.height * scaleY,
  };
};
