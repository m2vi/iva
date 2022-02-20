export type LibHumanFileSize = {
  [prefix in 'si' | 'iec']: {
    thresh: number;
    units: Array<{short: string; long: string}>;
  };
};

class Lib {
  get humanFileSize(): LibHumanFileSize {
    return {
      si: {
        thresh: 1000,
        units: [
          {short: 'KB', long: 'Kilobyte'},
          {short: 'MB', long: 'Megabyte'},
          {short: 'GB', long: 'Gigabyte'},
          {short: 'TB', long: 'Terabyte'},
          {short: 'PB', long: 'Petabyte'},
          {short: 'EB', long: 'Exabyte'},
          {short: 'ZB', long: 'Zettabyte'},
          {short: 'YB', long: 'Yottabyte'},
        ],
      },
      iec: {
        thresh: 1024,
        units: [
          {short: 'KiB', long: 'Kibibyte'},
          {short: 'MiB', long: 'Mebibyte'},
          {short: 'GiB', long: 'Gibibyte'},
          {short: 'TiB', long: 'Tebibyte'},
          {short: 'PiB', long: 'Pebibyte'},
          {short: 'EiB', long: 'Exbibyte'},
          {short: 'ZiB', long: 'Zebibyte'},
          {short: 'YiB', long: 'Yobibyte'},
        ],
      },
    };
  }
}

export const lib = new Lib();
export default lib;
