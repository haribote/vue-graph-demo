export default function getDigits (num: number): number {
  return Math.log(num) / Math.LN10 + 1 | 0
}
