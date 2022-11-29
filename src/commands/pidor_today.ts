import { Context } from 'grammy';
import { getPidors, incrementPidorCount, setTodaysPidor } from '../db';

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const pidorToday = async (ctx: Context): Promise<void> => {
  const pidors = await getPidors(ctx.chat.id);
  const pidor = pidors[Math.floor(Math.random() * pidors.length)];
  if (await setTodaysPidor(pidor)) {
    await incrementPidorCount(pidor);
    let name;
    if (pidor.username !== undefined) {
      name = `@${pidor.username} `;
    } else {
      name = pidor.name;
    }

    await ctx.reply('8===D    o');
    await sleep(1);
    await ctx.reply('8=O');
    await sleep(1);
    await ctx.reply('8===D    O');
    await sleep(1);
    await ctx.reply(`Пидором дня объявляется - ${name}!`);
  } else {
    await ctx.reply('Пидор дня уже выбран!');
  }
};

export default pidorToday;
