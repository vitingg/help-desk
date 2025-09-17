export function getInitials(fullName: string): string {
  if (!fullName) return "";

  const names = fullName.trim().split(" ");

  const firstInitial = names[0]?.[0] || "";
  const secondInitial = names[1]?.[0] || "";

  return (firstInitial + secondInitial).toUpperCase();
}
