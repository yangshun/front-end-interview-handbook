import mitt from 'mitt';

type Events = Readonly<{
  focus_on_test: Readonly<{
    index: number;
    path: ReadonlyArray<string>;
  }>;
  show_test_cases: Readonly<{
    index: number;
    path: ReadonlyArray<string>;
  }>;
}>;

const emitter = mitt<Events>();

export default emitter;
