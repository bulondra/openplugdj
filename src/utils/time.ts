export function now(): number {
    return Date.now();
}

export function seconds(seconds: number): number {
    return seconds * 1000;
}

export function minutes(minutes: number): number {
    return minutes * 60 * 1000;
}

export function calculateRemaining(
    startTime: number,
    duration: number
): number {
    const elapsed = now() - startTime;
    const remaining = duration - elapsed;
    return remaining > 0 ? remaining : 0;
}