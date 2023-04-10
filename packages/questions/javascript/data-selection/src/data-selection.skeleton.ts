export default function selectData(
  sessions: Array<{ user: number; duration: number; equipment: Array<string> }>,
  options?: {
    user?: number;
    minDuration?: number;
    equipment?: Array<string>;
    merge?: boolean;
  },
): Array<any> {
  throw 'Not implemented!';
}
