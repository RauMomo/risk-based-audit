export const generatedRiskProfileId = (
  category: string,
  index: number,
): string => {
  var currentYear = new Date().getFullYear();
  if (category)
    return `RISK-${category.toUpperCase()}-${currentYear}-${index + 1}`;

  return `RISK--${index + 1}`;
};
