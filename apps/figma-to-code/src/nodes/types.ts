/* eslint-disable @typescript-eslint/consistent-type-definitions */

export interface GFEBaseNodeMixin {
  readonly id: string;
  name: string;
}

export interface GFESceneNodeMixin {
  visible: boolean;
}

export interface GFEChildrenMixin {
  readonly children: ReadonlyArray<GFESceneNode>;
}

export interface GFEDimensionAndPositionMixin {
  readonly height: number;
  readonly width: number;
  x: number;
  y: number;
}

export interface GFELayoutMixin
  extends GFEDimensionAndPositionMixin,
    GFEAutoLayoutChildrenMixin {
  // TODO: support rotation.
  layoutSizingHorizontal: LayoutMixin['layoutSizingHorizontal'];
  layoutSizingVertical: LayoutMixin['layoutSizingVertical'];
}

export interface GFEBlendMixin extends GFEMinimalBlendMixin {
  effects: ReadonlyArray<Effect>;
}

export interface GFEAutoLayoutMixin {
  counterAxisAlignContent: AutoLayoutMixin['counterAxisAlignContent'];
  counterAxisAlignItems: AutoLayoutMixin['counterAxisAlignItems'];
  counterAxisSizingMode: AutoLayoutMixin['counterAxisSizingMode'];
  counterAxisSpacing: AutoLayoutMixin['counterAxisSpacing'];
  itemSpacing: AutoLayoutMixin['itemSpacing'];
  layoutMode: AutoLayoutMixin['layoutMode'];
  layoutWrap: AutoLayoutMixin['layoutWrap'];
  paddingBottom: AutoLayoutMixin['paddingBottom'];
  paddingLeft: AutoLayoutMixin['paddingLeft'];
  paddingRight: AutoLayoutMixin['paddingRight'];
  paddingTop: AutoLayoutMixin['paddingTop'];
  primaryAxisAlignItems: AutoLayoutMixin['primaryAxisAlignItems'];
  primaryAxisSizingMode: AutoLayoutMixin['primaryAxisSizingMode'];
  // TODO: add strokesIncludedInLayout
}

export interface GFEAutoLayoutChildrenMixin {
  layoutAlign: AutoLayoutChildrenMixin['layoutAlign'];
  layoutGrow: AutoLayoutChildrenMixin['layoutGrow'];
  layoutPositioning: AutoLayoutChildrenMixin['layoutPositioning'];
}

export interface GFEInferredAutoLayoutResult
  extends GFEAutoLayoutMixin,
    GFEAutoLayoutChildrenMixin {}

export interface GFEMinimalStrokesMixin {
  // TODO: strokeWeight
  dashPattern: ReadonlyArray<number>;
  strokeAlign: MinimalStrokesMixin['strokeAlign'];
  strokes: ReadonlyArray<Paint>;
}

export interface GFEIndividualStrokesMixin {
  strokeBottomWeight: number;
  strokeLeftWeight: number;
  strokeRightWeight: number;
  strokeTopWeight: number;
}

export interface GFEMinimalFillsMixin {
  fills: ReadonlyArray<Paint>;
}

export interface GFEGeometryMixin
  extends GFEMinimalStrokesMixin,
    GFEMinimalFillsMixin {}

export interface GFECornerMixin {
  cornerRadius: number | 'mixed';
  cornerSmoothing: number;
}

export interface GFERectangleCornerMixin {
  bottomLeftRadius: number;
  bottomRightRadius: number;
  topLeftRadius: number;
  topRightRadius: number;
}

export interface GFEMinimalBlendMixin {
  opacity: number;
}

export interface GFEDefaultShapeMixin
  extends GFEBaseNodeMixin,
    GFESceneNodeMixin,
    GFEBlendMixin,
    GFEGeometryMixin,
    GFELayoutMixin {}

export interface GFEBaseFrameMixin
  extends GFEBaseNodeMixin,
    GFESceneNodeMixin,
    GFEChildrenMixin,
    GFEGeometryMixin,
    GFECornerMixin,
    GFERectangleCornerMixin,
    GFEBlendMixin,
    GFELayoutMixin,
    GFEIndividualStrokesMixin,
    GFEAutoLayoutMixin {
  // TODO: Process this
  clipsContent: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GFEDefaultFrameMixin extends GFEBaseFrameMixin {}

export interface GFEFrameNode extends GFEDefaultFrameMixin {
  inferredAutoLayout: GFEInferredAutoLayoutResult | null;

  readonly type: 'FRAME';
}

export interface GFERectangleNode
  extends GFEDefaultShapeMixin,
    GFECornerMixin,
    GFERectangleCornerMixin,
    GFEIndividualStrokesMixin {
  readonly type: 'RECTANGLE';
}

export interface GFEVectorNode extends GFEDefaultShapeMixin, GFECornerMixin {
  readonly type: 'VECTOR';
}

export interface GFENonResizableTextMixin {
  characters: string;
  fontName: FontName | null;
  fontSize: number | null;
  fontWeight: number | null;
  letterSpacing: LetterSpacing | null;
  lineHeight: LineHeight | null;
  textCase: TextCase | null;
  textDecoration: TextDecoration | null;
}

export interface GFETextNode
  extends GFEDefaultShapeMixin,
    GFENonResizableTextMixin {
  textAlignHorizontal: TextNode['textAlignHorizontal'];

  readonly type: 'TEXT';
}

export interface GFEComponentNode extends GFEDefaultFrameMixin {
  readonly type: 'COMPONENT';
}
export interface GFEInstanceNode extends GFEDefaultFrameMixin {
  readonly type: 'INSTANCE';
}

export type GFESceneNode =
  | GFEComponentNode
  | GFEFrameNode
  | GFEInstanceNode
  | GFERectangleNode
  | GFETextNode
  | GFEVectorNode;
