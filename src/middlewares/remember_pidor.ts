import { Context } from 'grammy';
import { saveOrUpdatePidor } from '../db';

const rememberPidor = async (ctx: Context, next: () => any): Promise<void> => {
  saveOrUpdatePidor(ctx.from, ctx.chat.id).then();
  await next();
};

export default rememberPidor;
