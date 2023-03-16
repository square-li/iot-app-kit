import { Position, Rect, Widget } from '~/types';
import { Anchor } from '~/store/actions';

export const transformer: (widget: Widget, pre: Rect, curr: Rect) => Widget = (widget, prev, curr) => {
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

const MIN_WIDTH = 2;
const MIN_HEIGHT = 2;
const rectWithinMin = (rect: Rect): Rect => {
  const { width, height } = rect;

  return {
    ...rect,
    width: Math.max(width, MIN_WIDTH),
    height: Math.max(height, MIN_HEIGHT),
  };
};

export const resizeSelectionBox: (params: { curr: Rect; anchor: Anchor; vector: Position }) => Rect = ({
  curr,
  anchor,
  vector,
}) => {
  const newRect = { ...curr };
  if (anchor.includes('top')) {
    newRect.y += vector.y;
    newRect.height -= vector.y;
  }
  if (anchor.includes('left')) {
    newRect.x += vector.x;
    newRect.width -= vector.x;
  }
  if (anchor.includes('right')) {
    newRect.width += vector.x;
  }
  if (anchor.includes('bottom')) {
    newRect.height += vector.y;
  }

  return rectWithinMin(newRect);
};
