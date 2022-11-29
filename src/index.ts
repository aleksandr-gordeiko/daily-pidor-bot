import { Bot } from 'grammy/out/bot';
import { connectDB, closeConnection } from './db';

import error from './middlewares/error';
import rememberPidor from './middlewares/remember_pidor';

import pidorToday from './commands/pidor_today';
import pidorStats from './commands/pidor_stats';

const bot: Bot = new Bot(process.env.BOT_API_TOKEN);

bot.use(error);
bot.use(rememberPidor);

bot.command('pidor_today', pidorToday);
bot.command('pidor_stats', pidorStats);

process.once('SIGINT', () => {
  closeConnection()
    .then(() => console.log('SIGINT occurred, exiting'))
    .catch(() => console.log('SIGINT occurred, exiting with no db connection closed'));
});
process.once('SIGTERM', () => {
  closeConnection()
    .then(() => console.log('SIGTERM occurred, exiting'))
    .catch(() => console.log('SIGTERM occurred, exiting with no db connection closed'));
});

connectDB()
  .then(() => bot.start())
  .catch((err) => console.log(err));
