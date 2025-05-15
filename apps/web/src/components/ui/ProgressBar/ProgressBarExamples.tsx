import UIExamplesGroup from '../misc/UIExamplesGroup';
import {
  themeGradientGreenYellow,
  themeGradientPinkPurple,
  themeGradientPurpleGreen,
} from '../theme';
import ProgressBar from './index';

export default function ProgressBarExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Progress Bars">
      <div className="flex flex-col gap-y-6">
        {[0, 25, 50, 100].map((value) => (
          <ProgressBar
            key={value}
            label="Completed questions"
            total={100}
            value={value}
          />
        ))}
      </div>
      <div className="flex flex-col gap-y-6">
        {['h-1', 'h-2', 'h-3', 'h-4'].map((heightClass) => (
          <ProgressBar
            key={heightClass}
            heightClass={heightClass}
            label="Completed questions"
            total={100}
            value={50}
          />
        ))}
      </div>
      <div className="flex flex-col gap-y-6">
        {[
          themeGradientPurpleGreen,
          themeGradientGreenYellow,
          themeGradientPinkPurple,
        ].map((themeGradient) => (
          <ProgressBar
            key={themeGradient.startColor}
            label="Completed questions"
            progressClass={themeGradient.className}
            total={100}
            value={50}
          />
        ))}
      </div>
    </UIExamplesGroup>
  );
}
