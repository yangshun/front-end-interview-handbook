import mitt from 'mitt';

type TimerEvents = Readonly<{
  stop_timer: void;
}>;

const emitter = mitt<TimerEvents>();

export default emitter;
