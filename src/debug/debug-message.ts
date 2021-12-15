import { Quote } from '@/quotes/quote';

export type DebugMessageType = 'received' | 'requested';

export class DebugMessage {
  public readonly timestamp = new Date();

  constructor(
    public readonly type: DebugMessageType,
    public readonly contents?: Quote,
  ) {}
}
