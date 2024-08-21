export const formatDiscountNumber = (discount: number): string | null => {
  if (discount === 0) {
    return null;
  }
  return `${Math.round(-discount * 100)}%`;
};
