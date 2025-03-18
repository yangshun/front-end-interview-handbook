export interface IPluginRunner {
  /**
   * Translate the following strings to the target locales
   */
  translate(): Promise<void>;
  /**
   * Close the plugin and stop listening for runner events
   */
  closePlugin(): void;
}

export interface IPlugin {
  /**
   * Unique identifier for the plugin
   */
  identifier: string;
  /**
   * The plugin that should start tracking the file
   */
  startTrackingFile: (file: string) => Promise<void>;
  /**
   * Called when the runner is done translating a string
   */
  doneTranslating: () => Promise<void>;
}
