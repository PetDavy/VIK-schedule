export function getImgTextFromName(name: string) {
  const [firstName, lastName] = name.split(" ");
  const firstLetter = firstName[0];
  const secondLetter = lastName ? lastName[0] : "";

  return `${firstLetter}${secondLetter}`.toUpperCase();
}