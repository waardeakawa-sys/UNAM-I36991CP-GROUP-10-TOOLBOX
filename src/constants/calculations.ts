// lib/calculations.ts

// ========================================
// GEOLOGICAL CONSTANTS
// ========================================

export const GEOLOGY = {
  SOFT_ROCK: 0.35,
  STANDARD_GROUND: 0.4,
  HARD_ROCK: 0.5,
};

// ========================================
// BURDEN CALCULATION
// B = K × d
// K = burden factor
// d = hole diameter
// ========================================

export function calculateBurden(
  holeDiameter: number,
  geologyFactor: number
) {
  return geologyFactor * holeDiameter;
}

// ========================================
// SPACING CALCULATION
// S = 1.15 × B
// ========================================

export function calculateSpacing(burden: number) {
  return 1.15 * burden;
}

// ========================================
// HOLE DEPTH CALCULATION
// H = 2.5 × B
// ========================================

export function calculateHoleDepth(burden: number) {
  return 2.5 * burden;
}

// ========================================
// SUB-DRILLING
// J = 0.3 × B
// ========================================

export function calculateSubDrilling(burden: number) {
  return 0.3 * burden;
}

// ========================================
// EXPLOSIVE QUANTITY
// We = B × S × H × rockDensity
// ========================================

export function calculateExplosiveQuantity(
  burden: number,
  spacing: number,
  holeDepth: number,
  rockDensity: number
) {
  return burden * spacing * holeDepth * rockDensity;
}

// ========================================
// POWER FACTOR
// PF = Q / V
// Q = explosive quantity
// V = rock volume
// ========================================

export function calculatePowerFactor(
  explosiveQuantity: number,
  rockVolume: number
) {
  return explosiveQuantity / rockVolume;
}

// ========================================
// SPECIFIC CHARGE
// SC = Q / V
// ========================================

export function calculateSpecificCharge(
  explosiveQuantity: number,
  rockVolume: number
) {
  return explosiveQuantity / rockVolume;
}

// ========================================
// DETONATOR ESTIMATION
// Simple estimation
// ========================================

export function calculateDetonators(
  blastArea: number,
  spacing: number
) {
  return Math.ceil(blastArea / spacing);
}

// ========================================
// STEMMING MATERIAL
// Gravel/Oil estimation
// ========================================

export function calculateStemming(
  holeDepth: number
) {
  return holeDepth * 0.7;
}

// ========================================
// DANGER LEVEL
// ========================================

export function calculateDangerLevel(
  explosiveType: string,
  waterContent: number
) {
  if (
    explosiveType === 'ANFO' &&
    waterContent < 20
  ) {
    return 'LOW';
  }

  if (
    explosiveType === 'Heavy ANFO' &&
    waterContent >= 20
  ) {
    return 'MEDIUM';
  }

  return 'HIGH';
}

// ========================================
// FRAGMENTATION THROW DISTANCE
// ========================================

export function calculateThrowDistance(
  explosiveQuantity: number
) {
  return explosiveQuantity * 1.5;
}

// ========================================
// EXPLOSIVE TYPE SELECTOR
// ========================================

export function determineExplosiveType(
  landscape: string,
  waterContent: number
) {
  if (
    landscape === 'Mountainous' &&
    waterContent < 20
  ) {
    return 'ANFO';
  }

  if (
    landscape === 'Mountainous' &&
    waterContent >= 20
  ) {
    return 'Emulsion Explosive';
  }

  if (
    landscape === 'Rocky' &&
    waterContent < 20
  ) {
    return 'Heavy ANFO';
  }

  return 'Slurry / Water Gel';
}