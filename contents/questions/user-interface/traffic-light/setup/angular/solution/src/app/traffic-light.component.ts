import {
  Component,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';

type DefaultColors = 'green' | 'yellow' | 'red';

type ColorConfig<Colors> = {
  backgroundColor: string;
  duration: number;
  order: number;
  next: Colors;
};
export type TrafficLightConfig<
  Colors extends DefaultColors,
> = Record<Colors, ColorConfig<Colors>>;

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.css'],
})
export class TrafficLightComponent<
    Colors extends DefaultColors,
  >
  implements OnInit, OnDestroy
{
  @Input({ required: true }) initialColor!: Colors;
  @Input({ required: true })
  config!: TrafficLightConfig<Colors>;
  @Input() layout = 'vertical';

  currentColor!: Colors;
  timerId: ReturnType<typeof setInterval> | null = null;
  trafficLightOrder = (
    a: ColorConfig<Colors>,
    b: ColorConfig<Colors>,
  ) => (a.order > b.order ? -1 : 1);

  ngOnInit() {
    this.currentColor = this.initialColor;
    this.updateLight();
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  updateLight() {
    const { duration, next } =
      this.config[this.currentColor];

    this.timerId = setTimeout(() => {
      this.currentColor = next;
      this.updateLight();
    }, duration);
  }
}
