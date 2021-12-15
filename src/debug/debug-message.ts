export type DebugMessageType = 'received-quote';

export class DebugMessage {
  constructor(
    public readonly timestamp: Date,
    public readonly type: DebugMessageType,
    public readonly contents: any
  ) {}
}
