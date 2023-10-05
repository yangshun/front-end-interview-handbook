import mitt from 'mitt';

type Events = Readonly<{
  focus_on_test: Readonly<{
    filePath: string;
    index: number;
    specParts: ReadonlyArray<string>;
  }>;
}>;

const emitter = mitt<Events>();

export default emitter;
