import mitt from 'mitt';

type TimerEvents = Readonly<{
  pause_timer: void;
}>;

const emitter = mitt<TimerEvents>();

export default emitter;
