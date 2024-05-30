/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-empty-interface */

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

interface GFECornerMixin {
  cornerRadius: number | null;
  cornerSmoothing: number;
}

interface GFERectangleCornerMixin {
  bottomLeftRadius: number;
  bottomRightRadius: number;
  topLeftRadius: number;
  topRightRadius: number;
}

export interface GFEMinimalFillsMixin {
  fills: ReadonlyArray<Paint>;
}

export interface GFEMinimalBlendMixin {
  opacity: number;
}

export interface GFEBlendMixin extends GFEMinimalBlendMixin {
  effects: ReadonlyArray<Effect>;
}

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

export interface GFEGeometryMixin
  extends GFEMinimalStrokesMixin,
    GFEMinimalFillsMixin {}

export interface GFELayoutMixin
  extends GFEDimensionAndPositionMixin,
    GFEAutoLayoutChildrenMixin {
  layoutSizingHorizontal: LayoutMixin['layoutSizingHorizontal'];
  layoutSizingVertical: LayoutMixin['layoutSizingVertical'];
}

export interface GFEChildrenMixin {
  readonly children: ReadonlyArray<GFENode>;
}

export interface GFEDefaultShapeMixin
  extends GFEBlendMixin,
    GFEGeometryMixin,
    GFELayoutMixin {}

export interface GFEBaseFrameMixin
  extends GFEChildrenMixin,
    GFEAutoLayoutMixin,
    GFELayoutMixin,
    GFEMinimalStrokesMixin,
    GFEIndividualStrokesMixin,
    GFEMinimalFillsMixin,
    GFECornerMixin,
    GFEBlendMixin,
    GFERectangleCornerMixin,
    GFEDimensionAndPositionMixin,
    GFEBaseNode {}

export interface GFEVectorNode extends GFEDefaultShapeMixin, GFECornerMixin {
  readonly type: 'VECTOR';
}

export interface GFERectangleNode
  extends GFEDefaultShapeMixin,
    GFECornerMixin,
    GFERectangleCornerMixin,
    GFEIndividualStrokesMixin {
  readonly type: 'RECTANGLE';
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

export interface GFEFrameNode extends GFEBaseFrameMixin {
  inferredAutoLayout: GFEInferredAutoLayoutResult | null;

  readonly type: 'FRAME';
}

export interface GFEComponentNode extends GFEBaseFrameMixin {
  readonly type: 'COMPONENT';
}
export interface GFEInstanceNode extends GFEBaseFrameMixin {
  readonly type: 'INSTANCE';
}

export type GFENode =
  | GFEComponentNode
  | GFEFrameNode
  | GFEInstanceNode
  | GFERectangleNode
  | GFETextNode
  | GFEVectorNode;
