import { Quote } from '@/quotes/quote';

export type DebugMessageType = 'received-quote' | 'request-by-author' | 'request-random' | 'request-by-tag' | 'request-by-work';

export class DebugMessage {
  public readonly timestamp = new Date();

  constructor(
    public readonly type: DebugMessageType,
    public readonly contents?: Quote,
  ) {}
}
