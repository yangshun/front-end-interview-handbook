type Session = { user: number; duration: number; equipment: Array<string> };
type Options = {
  user?: number;
  minDuration?: number;
  equipment?: Array<string>;
  merge?: boolean;
};

export default function selectData(
  sessions: Array<Session>,
  options?: Options,
): Array<Session> {
  throw 'Not implemented!';
}
