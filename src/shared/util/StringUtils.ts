export class StringUtils {
  static isEmpty(input: string): boolean {
    return input == null || input.length == 0;
  }

  static isNotEmpty(input: string): boolean {
    return !StringUtils.isEmpty(input);
  }

  static isBlank(input: string): boolean {
    if (StringUtils.isEmpty(input)) {
      return true;
    }

    return input.split('').filter(it => !/\s/.test(it)).length == 0;
  }

  static isNotBlank(input: string): boolean {
    return !StringUtils.isBlank(input);
  }
}
