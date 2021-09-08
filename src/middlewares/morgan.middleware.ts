import chalk from 'chalk';
import morgan from 'morgan';
import { Color, getMethodColor, getStatusColor } from 'utils/color.util';
import { HttpMethod } from 'utils/http.util';

morgan.token('method', (req) => {
  const method = req.method as HttpMethod;
  return chalk.hex(getMethodColor(method)).bold(method);
});

morgan.token('status', (_, res) => {
  const status = res.headersSent ? res.statusCode : undefined;
  return chalk.hex(getStatusColor(status)).bold(status);
});

const colorizeMorgan = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.status(req, res),
    chalk.hex(Color.PURPLE).bold(tokens.url(req, res)),
    chalk.hex(Color.GREEN).bold(tokens['response-time'](req, res) + 'ms'),
  ].join(' ');
});

export default colorizeMorgan;
