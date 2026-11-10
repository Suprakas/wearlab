/**
 * Formats a numeric value into whole Indian Rupees (₹) using Intl.NumberFormat.
 * Example: 699 -> "₹699", 1028 -> "₹1,028"
 */

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return inrFormatter.format(amount);
}
