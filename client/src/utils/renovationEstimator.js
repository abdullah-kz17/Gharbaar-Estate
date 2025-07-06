// renovationEstimator.js
// Utility for renovation cost estimation (Pakistan market rates, 2024)

// Rate table (PKR per sqft)
const RATE_TABLE = {
  tile: {
    tier1: { material: 350, labor: 80 },
    tier2: { material: 250, labor: 80 },
    tier3: { material: 180, labor: 80 },
  },
  paint: {
    tier1: { material: 120, labor: 40 },
    tier2: { material: 90, labor: 40 },
    tier3: { material: 60, labor: 40 },
  },
  wood: {
    tier1: { material: 600, labor: 120 },
    tier2: { material: 400, labor: 120 },
    tier3: { material: 250, labor: 120 },
  },
  sheet: {
    tier1: { material: 200, labor: 50 },
    tier2: { material: 150, labor: 50 },
    tier3: { material: 100, labor: 50 },
  },
  wallpaper: {
    tier1: { material: 300, labor: 60 },
    tier2: { material: 200, labor: 60 },
    tier3: { material: 120, labor: 60 },
  },
};

// Petrol/transport cost
const PETROL_COST = (totalArea) => (totalArea > 200 ? totalArea * 10 : 500); // PKR
// Service fee (optional)
const SERVICE_FEE = 500; // PKR
// Tax rate (optional)
const TAX_RATE = 0.05; // 5%

// Supported defect types and tiers
export const DEFECT_TYPES = Object.keys(RATE_TABLE);
export const QUALITY_TIERS = [
  { value: 'tier1', label: 'Tier 1 (Premium)' },
  { value: 'tier2', label: 'Tier 2 (Standard)' },
  { value: 'tier3', label: 'Tier 3 (Economy)' },
];

/**
 * Calculate renovation cost for a list of defects.
 * @param {Array} defects - Array of { area, type, tier }
 * @param {Object} [options] - Additional options (e.g., includeServiceFee, includeTax)
 * @returns {Object} - { breakdown, total, totalWithTax, ... }
 */
export function estimateRenovationCost(defects, options = {}) {
  let totalMaterial = 0;
  let totalLabor = 0;
  let totalArea = 0;
  const breakdown = [];

  for (const defect of defects) {
    const { area, type, tier } = defect;
    if (!RATE_TABLE[type] || !RATE_TABLE[type][tier]) continue;
    const { material, labor } = RATE_TABLE[type][tier];
    const materialCost = area * material;
    const laborCost = area * labor;
    breakdown.push({
      ...defect,
      materialCost,
      laborCost,
      total: materialCost + laborCost,
    });
    totalMaterial += materialCost;
    totalLabor += laborCost;
    totalArea += area;
  }

  const petrolCost = PETROL_COST(totalArea);
  let subtotal = totalMaterial + totalLabor + petrolCost;
  if (options.includeServiceFee) subtotal += SERVICE_FEE;
  let tax = options.includeTax ? subtotal * TAX_RATE : 0;
  let total = subtotal + tax;

  return {
    breakdown,
    totalMaterial,
    totalLabor,
    petrolCost,
    serviceFee: options.includeServiceFee ? SERVICE_FEE : 0,
    tax,
    total,
    subtotal,
  };
} 