import { Schema, model } from 'mongoose';

interface ITodaysPidor {
  id: number;
  chat_id: number;
  date: Date;
}

const todaysPidorSchema = new Schema<ITodaysPidor>({
  id: { type: Number, required: true },
  chat_id: { type: Number, required: true },
  date: { type: Date, required: true },
});

const TodaysPidor = model<ITodaysPidor>('TodaysPidor', todaysPidorSchema);

export { TodaysPidor, ITodaysPidor };
