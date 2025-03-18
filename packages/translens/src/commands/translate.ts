import Config from '../config';

export async function translate() {
  const config = new Config().getConfig();
  console.log(config);
}
