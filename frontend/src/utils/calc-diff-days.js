export function calcDiffDays(second) {
    return Math.round((second - new Date()) / (1000 * 60 * 60 * 24))
}