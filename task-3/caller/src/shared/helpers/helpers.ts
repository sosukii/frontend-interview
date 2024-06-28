export function generateUniqueID(): number {
  return generateUniqueID.counter++ + Math.random();
}
generateUniqueID.counter = 1;
