export interface ConsoleCustomConfig {
  label: string;
  color?: string;
}

export class Console {
  default: globalThis.Console;
  constructor() {
    this.default = globalThis.console;
  }

  initialize(job: string) {
    console.log('%c[INITIALIZED]', 'color: #5da7f2', job);
  }

  fetch(data: any, service: string, ...props: any) {
    console.log('%c[FETCH]', 'color: #07821d', {data: data, service}, ...props);
  }

  info(name: any, ...props: any) {
    console.log('%c[INFO]', 'color: #0362fc', name, ...props);
  }

  load(info: any, result: any, ...props: any) {
    console.log('%c[LOAD]', 'color: #fce303', info, {result}, ...props);
  }

  error(message: any, error: any, ...props: any) {
    console.log('&c[ERROR]', 'color: #f54242', message, {error}, ...props);
  }

  log(message: any, ...props: any) {
    console.log('%c[LOG]', 'color: #8c7086', message, ...props);
  }

  custom({label, color = '#8c7086'}: ConsoleCustomConfig, ...props: any) {
    console.log(`&c[${label}]`, `color: ${color}`, ...props);
  }
}

export default new Console();
