import { resizeSelectionBox, transformer } from '~/store/actions/resizeWidgets/transformer';
import { Rect, Widget } from '~/types';
import { Anchor } from '~/store/actions';
import { getSelectionBox } from '~/util/getSelectionBox';

describe('resizeSelectionBox', () => {
  it('should resize selection box on top anchor', () => {
    const curr = { x: 0, y: 0, width: 100, height: 100 };
    const anchor = 'top';
    const vector = { x: 10, y: 10 };
    const expected = { x: 0, y: 10, width: 100, height: 90 };
    expect(resizeSelectionBox({ curr, anchor, vector })).toEqual(expected);
  });

  it('should resize selection box on top-left anchor', () => {
    const curr = { x: 0, y: 0, width: 100, height: 100 };
    const anchor = 'top-left';
    const vector = { x: 10, y: 10 };
    const expected = { x: 10, y: 10, width: 90, height: 90 };
    expect(resizeSelectionBox({ curr, anchor, vector })).toEqual(expected);
  });

  it('should resize selection box on top-right anchor', () => {
    const curr = { x: 0, y: 0, width: 100, height: 100 };
    const anchor = 'top-right';
    const vector = { x: 10, y: 10 };
    const expected = { x: 0, y: 10, width: 110, height: 90 };
    expect(resizeSelectionBox({ curr, anchor, vector })).toEqual(expected);
  });

  it('should resize selection box on bottom anchor', () => {
    const curr = { x: 0, y: 0, width: 100, height: 100 };
    const anchor = 'bottom';
    const vector = { x: 10, y: 10 };
    const expected = { x: 0, y: 0, width: 100, height: 110 };
    expect(resizeSelectionBox({ curr, anchor, vector })).toEqual(expected);
  });

  it('should resize selection box on bottom-left anchor', () => {
    const curr = { x: 0, y: 0, width: 100, height: 100 };
    const anchor = 'bottom-left';
    const vector = { x: 10, y: 10 };
    const expected = { x: 10, y: 0, width: 90, height: 110 };
    expect(resizeSelectionBox({ curr, anchor, vector })).toEqual(expected);
  });

  it('should resize selection box on bottom-right anchor', () => {
    const curr = { x: 0, y: 0, width: 100, height: 100 };
    const anchor = 'bottom-right';
    const vector = { x: 10, y: 10 };
    const expected = { x: 0, y: 0, width: 110, height: 110 };
    expect(resizeSelectionBox({ curr, anchor, vector })).toEqual(expected);
  });

  it('should resize selection box on left anchor', () => {
    const curr = { x: 0, y: 0, width: 100, height: 100 };
    const anchor = 'left';
    const vector = { x: 10, y: 10 };
    const expected = { x: 10, y: 0, width: 90, height: 100 };
    expect(resizeSelectionBox({ curr, anchor, vector })).toEqual(expected);
  });

  it('should resize selection box on right anchor', () => {
    const curr = { x: 0, y: 0, width: 100, height: 100 };
    const anchor = 'right';
    const vector = { x: 10, y: 10 };
    const expected = { x: 0, y: 0, width: 110, height: 100 };
    expect(resizeSelectionBox({ curr, anchor, vector })).toEqual(expected);
  });
});

const anchors: Anchor[] = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right'];
describe('transformer on single widget', () => {
  const baseWidget: Widget = {
    id: 'widget',
    x: 0,
    y: 0,
    z: 0,
    width: 100,
    height: 100,
    type: 'MOCK_WIDGET',
    properties: {},
  };

  const selectionBox: Rect = baseWidget;
  const transformerToBeTested = (newSelectionBox: Rect) => transformer(baseWidget, selectionBox, newSelectionBox);

  anchors.forEach((anchor) => {
    const newSelectionBox = resizeSelectionBox({ curr: selectionBox, anchor, vector: { x: 10, y: 10 } });
    const expected: Rect = { ...baseWidget, ...newSelectionBox };
    const result = transformerToBeTested(newSelectionBox);
    const keys = ['x', 'y', 'width', 'height'] as (keyof Rect)[];
    keys.forEach((key) => {
      console.log(anchor, key, result[key], expected[key]);
      it(`should resize widget gives correct '${key}' when on ${anchor}`, () => {
        expect(result[key]).toBeCloseTo(expected[key]);
      });
    });
  });
});

describe('transformer on multiple widgets', () => {
  const widgets = [
    {
      x: 10,
      y: 10,
      z: 0,
      width: 10,
      height: 10,
    },
    {
      x: 20,
      y: 20,
      z: 0,
      width: 10,
      height: 10,
    },
  ] as Widget[];

  const selectionBox = getSelectionBox(widgets)!;
  const transformerToBeTested = (newSelectionBox: Rect) => (widget: Widget) =>
    transformer(widget, selectionBox, newSelectionBox);

  anchors.forEach((anchor) => {
    const mapper = transformerToBeTested(resizeSelectionBox({ curr: selectionBox, anchor, vector: { x: 10, y: 10 } }));
    const result = widgets.map(mapper);
    it(`should have two connected widgets stay connected on resize from ${anchor}`, function () {
      expect(result[0].x + result[0].width).toBeCloseTo(result[1].x);
      expect(result[0].y + result[0].height).toBeCloseTo(result[1].y);
    });
  });
});
