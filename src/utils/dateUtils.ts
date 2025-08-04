export function formatDate(date: Date): string {
  // Use a consistent date format that works the same on server and client
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
}

export function formatDateSafe(date: Date): string {
  // Alternative approach: use ISO string and format manually
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Force UTC to ensure consistency
    }).format(date);
  } catch (error) {
    // Fallback for older browsers or server environments
    return formatDate(date);
  }
}
