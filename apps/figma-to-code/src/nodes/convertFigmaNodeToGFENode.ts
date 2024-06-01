import type {
  GFEFrameNode,
  GFERectangleNode,
  GFESceneNode,
  GFETextNode,
  GFEVectorNode,
} from './types';

export function convertFigmaNodeToGFENode(
  node: SceneNode,
): GFESceneNode | null {
  // TODO: fix any.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeObject: Record<string, any> = {};

  nodeObject.type = node.type;
  nodeObject.id = node.id;
  nodeObject.name = node.name;
  // DimensionAndPositionMixin
  nodeObject.width = node.width;
  nodeObject.height = node.height;

  console.info(node);

  switch (node.type) {
    case 'TEXT': {
      // SceneNodeMixin
      nodeObject.visible = node.visible;
      // MinimalBlendMixin
      nodeObject.opacity = node.opacity;
      nodeObject.effects = node.effects;

      nodeObject.characters = node.characters;
      nodeObject.fontName =
        node.fontName !== figma.mixed ? node.fontName : null;
      nodeObject.fontWeight =
        node.fontWeight !== figma.mixed ? node.fontWeight : null;
      nodeObject.fontSize =
        node.fontSize !== figma.mixed ? node.fontSize : null;
      nodeObject.letterSpacing =
        node.letterSpacing !== figma.mixed ? node.letterSpacing : null;
      nodeObject.lineHeight =
        node.lineHeight !== figma.mixed ? node.lineHeight : null;
      nodeObject.textAlignHorizontal = node.textAlignHorizontal;
      nodeObject.textDecoration =
        node.textDecoration !== figma.mixed ? node.textDecoration : null;
      nodeObject.textCase =
        node.textCase !== figma.mixed ? node.textCase : null;

      const fills = node.getRangeFills(0, node.characters.length);

      nodeObject.fills = fills !== figma.mixed ? fills : [];

      // TODO: improve typesafety.
      return nodeObject as GFETextNode;
    }

    case 'RECTANGLE': {
      // SceneNodeMixin
      nodeObject.visible = node.visible;
      // MinimalBlendMixin
      nodeObject.opacity = node.opacity;
      // BlendMixin
      nodeObject.effects = node.effects;

      // LayoutMixin
      nodeObject.layoutSizingHorizontal = node.layoutSizingHorizontal;
      nodeObject.layoutSizingVertical = node.layoutSizingVertical;

      // RectangleCornerMixin
      nodeObject.topLeftRadius = node.topLeftRadius;
      nodeObject.topRightRadius = node.topRightRadius;
      nodeObject.bottomRightRadius = node.bottomRightRadius;
      nodeObject.bottomLeftRadius = node.bottomLeftRadius;

      // CornerMixin
      nodeObject.cornerRadius = node.cornerRadius;
      nodeObject.cornerRadius = node.cornerSmoothing;

      // IndividualStrokesMixin
      nodeObject.strokeTopWeight = node.strokeTopWeight;
      nodeObject.strokeBottomWeight = node.strokeBottomWeight;
      nodeObject.strokeLeftWeight = node.strokeLeftWeight;
      nodeObject.strokeRightWeight = node.strokeRightWeight;

      // MinimalFillsMixin
      nodeObject.fills = node.fills !== figma.mixed ? node.fills : [];

      // TODO: improve typesafety.
      return nodeObject as GFERectangleNode;
    }

    case 'VECTOR': {
      // SceneNodeMixin
      nodeObject.visible = node.visible;
      // MinimalBlendMixin
      nodeObject.opacity = node.opacity;
      // BlendMixin
      nodeObject.effects = node.effects;

      // LayoutMixin
      nodeObject.layoutSizingHorizontal = node.layoutSizingHorizontal;
      nodeObject.layoutSizingVertical = node.layoutSizingVertical;

      // CornerMixin
      nodeObject.cornerRadius = node.cornerRadius;
      nodeObject.cornerRadius = node.cornerSmoothing;

      // MinimalStrokesMixin
      nodeObject.strokes = node.strokes;
      nodeObject.strokeAlign = node.strokeAlign;
      nodeObject.dashPattern = node.dashPattern;

      // MinimalFillsMixin
      nodeObject.fills = node.fills !== figma.mixed ? node.fills : [];

      // TODO: improve typesafety.
      return nodeObject as GFEVectorNode;
    }

    case 'COMPONENT':
    case 'INSTANCE':
    case 'FRAME': {
      // SceneNodeMixin
      nodeObject.visible = node.visible;

      nodeObject.children = node.children
        .map((childNode) => convertFigmaNodeToGFENode(childNode))
        .flatMap((childNode) => (childNode != null ? [childNode] : []));

      // MinimalBlendMixin
      nodeObject.opacity = node.opacity;
      // BlendMixin
      nodeObject.effects = node.effects;

      // MinimalFillsMixin
      nodeObject.fills = node.fills !== figma.mixed ? node.fills : [];

      nodeObject.layoutMode = node.layoutMode;
      nodeObject.layoutWrap = node.layoutWrap;

      nodeObject.primaryAxisSizingMode = node.primaryAxisSizingMode;
      nodeObject.counterAxisSizingMode = node.counterAxisSizingMode;

      nodeObject.primaryAxisAlignItems = node.primaryAxisAlignItems;
      nodeObject.counterAxisAlignItems = node.counterAxisAlignItems;
      nodeObject.counterAxisAlignContent = node.counterAxisAlignContent;

      nodeObject.itemSpacing = node.itemSpacing;
      nodeObject.counterAxisSpacing = node.counterAxisSpacing;
      nodeObject.inferredAutoLayout = node.inferredAutoLayout; // TODO: use it for non-autolayout.

      nodeObject.layoutAlign = node.layoutAlign;
      nodeObject.layoutGrow = node.layoutGrow;
      nodeObject.layoutPositioning = node.layoutPositioning; // TODO: Process it.

      nodeObject.layoutSizingHorizontal = node.layoutSizingHorizontal;
      nodeObject.layoutSizingVertical = node.layoutSizingVertical;

      nodeObject.paddingLeft = node.paddingLeft;
      nodeObject.paddingRight = node.paddingRight;
      nodeObject.paddingTop = node.paddingTop;
      nodeObject.paddingBottom = node.paddingBottom;

      // RectangleCornerMixin
      nodeObject.topLeftRadius = node.topLeftRadius;
      nodeObject.topRightRadius = node.topRightRadius;
      nodeObject.bottomRightRadius = node.bottomRightRadius;
      nodeObject.bottomLeftRadius = node.bottomLeftRadius;

      // MinimalStrokesMixin
      nodeObject.strokes = node.strokes;
      nodeObject.strokeAlign = node.strokeAlign;
      nodeObject.dashPattern = node.dashPattern;

      // IndividualStrokesMixin
      nodeObject.strokeTopWeight = node.strokeTopWeight;
      nodeObject.strokeBottomWeight = node.strokeBottomWeight;
      nodeObject.strokeLeftWeight = node.strokeLeftWeight;
      nodeObject.strokeRightWeight = node.strokeRightWeight;

      // TODO: improve typesafety.
      return nodeObject as GFEFrameNode;
    }
  }

  return null;
}
