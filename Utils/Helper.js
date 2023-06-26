import { MathUtils } from 'three'

export function remap(value, oldMin, oldMax, newMin, newMax) {
    const clampedValue = Math.max(oldMin, Math.min(value, oldMax));

    const normalizedValue = (clampedValue - oldMin) / (oldMax - oldMin);

    const remappedValue = normalizedValue * (newMax - newMin) + newMin;

    return remappedValue;
}

export function isValueInRange(value, min, max) {
    return value >= min && value <= max;
}

export function randomRange(range) {
    return MathUtils.randFloat(range.x, range.y)
}
