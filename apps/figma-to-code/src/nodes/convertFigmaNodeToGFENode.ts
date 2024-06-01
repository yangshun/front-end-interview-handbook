import type {
  GFEAutoLayoutChildrenMixin,
  GFEAutoLayoutMixin,
  GFEBaseFrameMixin,
  GFEBaseNodeMixin,
  GFEBlendMixin,
  GFEChildrenMixin,
  GFEComponentNode,
  GFECornerMixin,
  GFEDefaultFrameMixin,
  GFEDefaultShapeMixin,
  GFEDimensionAndPositionMixin,
  GFEFrameNode,
  GFEGeometryMixin,
  GFEIndividualStrokesMixin,
  GFEInferredAutoLayoutResult,
  GFEInstanceNode,
  GFELayoutMixin,
  GFEMinimalBlendMixin,
  GFEMinimalFillsMixin,
  GFEMinimalStrokesMixin,
  GFENonResizableTextMixin,
  GFERectangleCornerMixin,
  GFERectangleNode,
  GFESceneNode,
  GFESceneNodeMixin,
  GFETextNode,
  GFEVectorNode,
} from './types';

function convertFigmaBaseNodeMixin(node: BaseNodeMixin): GFEBaseNodeMixin {
  return {
    id: node.id,
    name: node.name,
  };
}

function convertFigmaSceneNodeMixin(node: SceneNodeMixin): GFESceneNodeMixin {
  return {
    visible: node.visible,
  };
}

function convertFigmaChildrenMixin(node: ChildrenMixin): GFEChildrenMixin {
  return {
    children: node.children
      .map((childNode) => convertFigmaNodeToGFENode(childNode))
      .flatMap((childNode) => (childNode != null ? [childNode] : [])),
  };
}

function convertFigmaDimensionAndPositionMixin(
  node: DimensionAndPositionMixin,
): GFEDimensionAndPositionMixin {
  return {
    height: node.height,
    width: node.width,
    x: node.x,
    y: node.y,
  };
}

function convertFigmaAutoLayoutChildrenMixin(
  node: AutoLayoutChildrenMixin,
): GFEAutoLayoutChildrenMixin {
  return {
    layoutAlign: node.layoutAlign,
    layoutGrow: node.layoutGrow,
    layoutPositioning: node.layoutPositioning,
  };
}

function convertFigmaLayoutMixin(node: LayoutMixin): GFELayoutMixin {
  return {
    layoutSizingHorizontal: node.layoutSizingHorizontal,
    layoutSizingVertical: node.layoutSizingVertical,
    ...convertFigmaDimensionAndPositionMixin(node),
    ...convertFigmaAutoLayoutChildrenMixin(node),
  };
}

function convertFigmaAutoLayoutMixin(
  node: AutoLayoutMixin,
): GFEAutoLayoutMixin {
  return {
    counterAxisAlignContent: node.counterAxisAlignContent,
    counterAxisAlignItems: node.counterAxisAlignItems,
    counterAxisSizingMode: node.counterAxisSizingMode,
    counterAxisSpacing: node.counterAxisSpacing,
    itemSpacing: node.itemSpacing,
    layoutMode: node.layoutMode,
    layoutWrap: node.layoutWrap,
    paddingBottom: node.paddingBottom,
    paddingLeft: node.paddingLeft,
    paddingRight: node.paddingRight,
    paddingTop: node.paddingTop,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    primaryAxisSizingMode: node.primaryAxisSizingMode,
  };
}

function convertFigmaMinimalBlendMixin(
  node: MinimalBlendMixin,
): GFEMinimalBlendMixin {
  return {
    opacity: node.opacity,
  };
}

function convertFigmaBlendMixin(node: BlendMixin): GFEBlendMixin {
  return {
    effects: node.effects,
    ...convertFigmaMinimalBlendMixin(node),
  };
}

function convertFigmaInferredAutoLayoutResult(
  node: InferredAutoLayoutResult,
): GFEInferredAutoLayoutResult {
  return {
    ...convertFigmaAutoLayoutMixin(node),
    ...convertFigmaAutoLayoutChildrenMixin(node),
  };
}

function convertFigmaMinimalStrokesMixin(
  node: MinimalStrokesMixin,
): GFEMinimalStrokesMixin {
  return {
    dashPattern: node.dashPattern,
    strokeAlign: node.strokeAlign,
    strokes: node.strokes,
  };
}

function convertFigmaIndividualStrokesMixin(
  node: IndividualStrokesMixin,
): GFEIndividualStrokesMixin {
  return {
    strokeBottomWeight: node.strokeBottomWeight,
    strokeLeftWeight: node.strokeLeftWeight,
    strokeRightWeight: node.strokeRightWeight,
    strokeTopWeight: node.strokeTopWeight,
  };
}

function convertFigmaMinimalFillsMixin(
  node: MinimalFillsMixin,
): GFEMinimalFillsMixin {
  return {
    // TODO: handle mixed.
    fills: node.fills !== figma.mixed ? node.fills : [],
  };
}

function convertFigmaGeometryMixin(node: GeometryMixin): GFEGeometryMixin {
  return {
    ...convertFigmaMinimalStrokesMixin(node),
    ...convertFigmaMinimalFillsMixin(node),
  };
}

function convertFigmaCornerMixin(node: CornerMixin): GFECornerMixin {
  return {
    cornerRadius:
      node.cornerRadius !== figma.mixed ? node.cornerRadius : 'mixed',
    cornerSmoothing: node.cornerSmoothing,
  };
}

function convertFigmaRectangleCornerMixin(
  node: RectangleCornerMixin,
): GFERectangleCornerMixin {
  return {
    bottomLeftRadius: node.bottomLeftRadius,
    bottomRightRadius: node.bottomRightRadius,
    topLeftRadius: node.topLeftRadius,
    topRightRadius: node.topRightRadius,
  };
}

function convertFigmaDefaultShapeMixin(
  node: DefaultShapeMixin,
): GFEDefaultShapeMixin {
  return {
    ...convertFigmaBaseNodeMixin(node),
    ...convertFigmaSceneNodeMixin(node),
    ...convertFigmaBlendMixin(node),
    ...convertFigmaGeometryMixin(node),
    ...convertFigmaLayoutMixin(node),
  };
}

function convertFigmaBaseFrameMixin(node: BaseFrameMixin): GFEBaseFrameMixin {
  return {
    clipsContent: node.clipsContent,
    ...convertFigmaBaseNodeMixin(node),
    ...convertFigmaSceneNodeMixin(node),
    ...convertFigmaChildrenMixin(node),
    ...convertFigmaGeometryMixin(node),
    ...convertFigmaCornerMixin(node),
    ...convertFigmaRectangleCornerMixin(node),
    ...convertFigmaBlendMixin(node),
    ...convertFigmaLayoutMixin(node),
    ...convertFigmaGeometryMixin(node),
    ...convertFigmaIndividualStrokesMixin(node),
    ...convertFigmaAutoLayoutMixin(node),
  };
}

function convertFigmaDefaultFrameMixin(
  node: DefaultFrameMixin,
): GFEDefaultFrameMixin {
  return {
    ...convertFigmaBaseFrameMixin(node),
  };
}

function convertFigmaFrameNode(node: FrameNode): GFEFrameNode {
  return {
    inferredAutoLayout: convertFigmaInferredAutoLayoutResult(node),
    type: 'FRAME',
    ...convertFigmaDefaultFrameMixin(node),
  };
}

function convertFigmaRectangleNode(node: RectangleNode): GFERectangleNode {
  return {
    type: 'RECTANGLE',
    ...convertFigmaDefaultShapeMixin(node),
    ...convertFigmaCornerMixin(node),
    ...convertFigmaRectangleCornerMixin(node),
    ...convertFigmaIndividualStrokesMixin(node),
  };
}

function convertFigmaVectorNode(node: VectorNode): GFEVectorNode {
  return {
    type: 'VECTOR',
    ...convertFigmaDefaultShapeMixin(node),
    ...convertFigmaCornerMixin(node),
  };
}

function convertFigmaNonResizableTextMixin(
  node: NonResizableTextMixin,
): GFENonResizableTextMixin {
  return {
    characters: node.characters,
    fontName: node.fontName !== figma.mixed ? node.fontName : null,
    fontSize: node.fontSize !== figma.mixed ? node.fontSize : null,
    fontWeight: node.fontWeight !== figma.mixed ? node.fontWeight : null,
    letterSpacing:
      node.letterSpacing !== figma.mixed ? node.letterSpacing : null,
    lineHeight: node.lineHeight !== figma.mixed ? node.lineHeight : null,
    textCase: node.textCase !== figma.mixed ? node.textCase : null,
    textDecoration:
      node.textDecoration !== figma.mixed ? node.textDecoration : null,
  };
}

function convertFigmaTextNode(node: TextNode): GFETextNode {
  return {
    textAlignHorizontal: node.textAlignHorizontal,
    type: 'TEXT',
    ...convertFigmaDefaultShapeMixin(node),
    ...convertFigmaNonResizableTextMixin(node),
  };
}

function convertFigmaComponentNode(node: ComponentNode): GFEComponentNode {
  return {
    type: 'COMPONENT',
    ...convertFigmaDefaultFrameMixin(node),
  };
}

function convertFigmaInstanceNode(node: InstanceNode): GFEInstanceNode {
  return {
    type: 'INSTANCE',
    ...convertFigmaDefaultFrameMixin(node),
  };
}

export function convertFigmaNodeToGFENode(
  node: SceneNode,
): GFESceneNode | null {
  console.info(node);

  switch (node.type) {
    case 'TEXT': {
      return convertFigmaTextNode(node);
    }
    case 'RECTANGLE': {
      return convertFigmaRectangleNode(node);
    }
    case 'VECTOR': {
      return convertFigmaVectorNode(node);
    }
    case 'COMPONENT': {
      return convertFigmaComponentNode(node);
    }
    case 'INSTANCE': {
      return convertFigmaInstanceNode(node);
    }
    case 'FRAME': {
      return convertFigmaFrameNode(node);
    }
    default: {
      console.info(`Unsupported ${node.type} node (${node.id})`);

      return null;
    }
  }
}
