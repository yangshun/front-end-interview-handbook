/* eslint-disable @typescript-eslint/consistent-type-definitions */

interface GFEBaseNode {
  readonly id: string;
  name: string;
}

export interface GFEDimensionAndPositionMixin {
  readonly height: number;
  readonly width: number;
  x: number;
  y: number;
}

interface GFERectangleCornerMixin {
  bottomLeftRadius: number;
  bottomRightRadius: number;
  topLeftRadius: number;
  topRightRadius: number;
}

interface GFEMinimalFillsMixin {
  fills: ReadonlyArray<Paint>;
}

export interface GFEMinimalBlendMixin {
  opacity: number;
}

export interface GFEBlendMixin extends GFEMinimalBlendMixin {
  effects: ReadonlyArray<Effect>;
}

type GFEDefaultShapeMixin = GFEBlendMixin;

export interface GFEAutoLayoutMixin {
  counterAxisAlignContent: 'AUTO' | 'SPACE_BETWEEN';
  counterAxisAlignItems: 'BASELINE' | 'CENTER' | 'MAX' | 'MIN';
  counterAxisSizingMode: 'AUTO' | 'FIXED';
  counterAxisSpacing: number | null;
  itemSpacing: number;
  layoutMode: 'HORIZONTAL' | 'NONE' | 'VERTICAL';
  layoutWrap: 'NO_WRAP' | 'WRAP';
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  primaryAxisAlignItems: 'CENTER' | 'MAX' | 'MIN' | 'SPACE_BETWEEN';
  primaryAxisSizingMode: 'AUTO' | 'FIXED';
}

export interface GFEAutoLayoutChildrenMixin {
  layoutAlign: 'CENTER' | 'INHERIT' | 'MAX' | 'MIN' | 'STRETCH';
  layoutGrow: number;
  layoutPositioning: 'ABSOLUTE' | 'AUTO';
}

interface GFEInferredAutoLayoutResult
  extends GFEAutoLayoutMixin,
    GFEAutoLayoutChildrenMixin {}

export interface GFEMinimalStrokesMixin {
  dashPattern: ReadonlyArray<number>;
  strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE';
  strokes: ReadonlyArray<Paint>;
}

export interface GFEIndividualStrokesMixin {
  strokeBottomWeight: number;
  strokeLeftWeight: number;
  strokeRightWeight: number;
  strokeTopWeight: number;
}

export interface GFETextNode
  extends GFEMinimalFillsMixin,
    GFEDimensionAndPositionMixin,
    GFEAutoLayoutChildrenMixin,
    GFEBaseNode,
    GFEDefaultShapeMixin {
  characters: string;
  fontName: FontName | null;
  fontSize: number | null;
  fontWeight: number | null;
  letterSpacing: LetterSpacing | null;
  lineHeight: LineHeight | null;
  textAlignHorizontal: TextNode['textAlignHorizontal'];
  textCase: TextCase | null;
  textDecoration: TextDecoration | null;

  readonly type: 'TEXT';
}

export interface GFEFrameMixin
  extends GFEAutoLayoutMixin,
    GFEAutoLayoutChildrenMixin,
    GFEMinimalStrokesMixin,
    GFEIndividualStrokesMixin,
    GFEMinimalFillsMixin,
    GFERectangleCornerMixin,
    GFEDimensionAndPositionMixin,
    GFEBlendMixin,
    GFEBaseNode {
  fills: Array<Paint>;
}

export interface GFEFrameNode extends GFEFrameMixin {
  inferredAutoLayout: GFEInferredAutoLayoutResult | null;

  readonly type: 'FRAME';
}

export interface GFEComponentNode extends GFEFrameMixin {
  readonly type: 'COMPONENT';
}
export interface GFEInstanceNode extends GFEFrameMixin {
  readonly type: 'INSTANCE';
}

export type GFENode =
  | GFEComponentNode
  | GFEFrameNode
  | GFEInstanceNode
  | GFETextNode;
