import { Context } from 'grammy';
import { getPidors } from '../db';

const pidorStats = async (ctx: Context): Promise<void> => {
  const pidors = await getPidors();
  let reply = 'Топ педиков:';
  for (let i = 0; i < pidors.length; i++) {
    let name;
    if (pidors[i].username !== undefined) {
      name = `${pidors[i].username}`;
    } else {
      name = pidors[i].name;
    }
    reply += `\n${i + 1}. ${name} - ${pidors[i].count} раз`;
  }
  await ctx.reply(reply);
};

export default pidorStats;
