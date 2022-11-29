import { connect, connection } from 'mongoose';
import { User } from 'typegram';
import { IPidor, Pidor } from './models/Pidor';
import { TodaysPidor } from './models/TodaysPidor';

const url: string = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;

const connectDB = async (): Promise<void> => {
  try {
    await connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    throw new Error(`DB connection error: ${err}`);
  }
};

const closeConnection = async (): Promise<void> => {
  try {
    await connection.close();
  } catch (err) {
    throw new Error('DB connection closure fail');
  }
};

const saveOrUpdatePidor = async (pidor: User, chat_id: number): Promise<void> => {
  const pidors = await Pidor.find({ id: pidor.id, chat_id });
  if (pidors.length !== 0) {
    await Pidor.updateOne({ id: pidor.id }, {
      username: pidor.username,
      name: `${pidor.first_name} ${pidor.last_name}`,
    });
  } else {
    const name = `${pidor.first_name}${pidor.last_name ? ` ${pidor.last_name}` : ''}`;
    await Pidor.create({
      id: pidor.id,
      chat_id,
      username: pidor.username,
      name,
      count: 0,
    });
  }
};

const getPidors = async (chat_id: number): Promise<IPidor[]> => Pidor.find({ chat_id });

const incrementPidorCount = async (pidor: IPidor): Promise<void> => {
  await Pidor.updateOne({ id: pidor.id, chat_id: pidor.chat_id }, { count: pidor.count + 1 });
};

const setTodaysPidor = async (pidor: IPidor): Promise<boolean> => {
  const lastTodaysPidor = (await TodaysPidor.find({ chat_id: pidor.chat_id }).sort({ date: -1 }).limit(1))[0];
  const now = new Date();
  if (lastTodaysPidor === undefined
      || lastTodaysPidor.date.getDate() !== now.getDate()
      || lastTodaysPidor.date.getMonth() !== now.getMonth()
      || lastTodaysPidor.date.getFullYear() !== now.getFullYear()) {
    await TodaysPidor.create({
      id: pidor.id,
      chat_id: pidor.chat_id,
      date: now,
    });
    return true;
  }
  return false;
};

export {
  connectDB,
  closeConnection,
  saveOrUpdatePidor,
  getPidors,
  incrementPidorCount,
  setTodaysPidor,
};
