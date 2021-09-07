const getEnv = <T>(name: string, defaultValue: T) => {
  const value = process.env[name];
  if (!value) return defaultValue;
  return value as unknown as T;
};

export const getEnvString = (
  name: string,
  defaultValue: string = ''
): string => {
  return getEnv<string>(name, defaultValue);
};

export const getEnvNumber = (
  name: string,
  defaultValue: number = 0
): number => {
  return getEnv<number>(name, defaultValue);
};

export const getEnvArray = (
  name: string,
  defaultValue: string = ''
): Array<string> => {
  return getEnv<string>(name, defaultValue).split(', ');
};

export default getEnv;
