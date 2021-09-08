import { HttpMethod } from 'utils/http.util';

/**
 * Dracula Color Palette
 * @see {@link https://draculatheme.com}
 */
export enum Color {
  CYAN = '#8be9fd',
  GREEN = '#50fa7b',
  ORANGE = '#ffb86c',
  PINK = '#ff79c6',
  PURPLE = '#bd93f9',
  RED = '#ff5555',
  YELLOW = '#f1fa8c',
  WHITE = '#f8f8f2',
}

export const getMethodColor = (method: HttpMethod): Color => {
  switch (method) {
    case 'GET':
      return Color.GREEN;
    case 'POST':
    case 'PUT':
      return Color.YELLOW;
    case 'DELETE':
      return Color.RED;
    case 'OPTIONS':
      return Color.PURPLE;
    default:
      return Color.WHITE;
  }
};

export const getStatusColor = (status: number): Color => {
  return status >= 500
    ? Color.RED
    : status >= 400
    ? Color.ORANGE
    : status >= 300
    ? Color.YELLOW
    : status >= 200
    ? Color.GREEN
    : Color.WHITE;
};
