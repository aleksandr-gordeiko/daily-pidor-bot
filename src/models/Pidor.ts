import { Schema, model } from 'mongoose';

interface IPidor {
  id: number;
  chat_id: number;
  name: string;
  username: string;
  count: number;
}

const pidorSchema = new Schema<IPidor>({
  id: { type: Number, required: true },
  chat_id: { type: Number, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  count: { type: Number, required: true },
});

const Pidor = model<IPidor>('Pidor', pidorSchema);

export { Pidor, IPidor };
