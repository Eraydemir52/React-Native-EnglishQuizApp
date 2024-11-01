export function calculateScore(correctAnswer, totalQuestion) {
  const score = (correctAnswer / totalQuestion) * 100;
  return Math.ceil(score);
}
