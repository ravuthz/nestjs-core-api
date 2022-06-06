import { Logger } from '@nestjs/common';

const logger = new Logger('App');

export default {
  jwtSecret: process.env.SECRET_KEY || '#Sr3CR3tK3y$'
}