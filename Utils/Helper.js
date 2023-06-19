export function remap(value, oldMin, oldMax, newMin, newMax) {
    const clampedValue = Math.max(oldMin, Math.min(value, oldMax));

    const normalizedValue = (clampedValue - oldMin) / (oldMax - oldMin);

    const remappedValue = normalizedValue * (newMax - newMin) + newMin;

    return remappedValue;
}

export function isValueInRange(value, min, max) {
    return value >= min && value <= max;
}
