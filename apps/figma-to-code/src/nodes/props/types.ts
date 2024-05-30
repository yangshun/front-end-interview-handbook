export type GFENodePropertiesList = Array<{
  label: string;
  value: number | string;
}>;

export type GFENodeMetadata = {
  content: string | null;
  type: 'BLOCK' | 'IMAGE' | 'INLINE' | 'SVG' | null;
  visible: boolean;
};

export type GFECSSProperties = Record<string, number | string>;

export type GFETailwindClasses = Set<string>;
