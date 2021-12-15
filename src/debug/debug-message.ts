import { Quote } from '@/quotes/quote';
import { RequestType } from '@/request-type';

export type DebugMessageType = 'received' | `requested-${RequestType}`;

export class DebugMessage {
  public readonly timestamp = new Date();

  constructor(
    public readonly type: DebugMessageType,
    public readonly contents?: Quote,
  ) {}
}
