export const formatPrice = (pkr: number) => `Rs. ${pkr.toLocaleString()}`;
export const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(" ");

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" });
}
