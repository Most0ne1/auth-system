
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  return {
    user: { id:1, name: body.email, email },
    token: 'your_generated_token_here',
  };
});
