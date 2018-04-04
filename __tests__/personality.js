test('get dimensions', () => {
  expect(getDimension('1')).toEqual(53)
  expect(getDimension('2')).toEqual(50)
  expect(getDimension('3')).toEqual(57)
  expect(getDimension('4')).toEqual(55)
  expect(getDimension('5')).toEqual(60)
})
// (1) Extraversion, (2) Agreeableness, (3) Conscientiousness, (4) Emotional Stability, or (5) Intellect/Imagination
const getDimension = d => {
  const a = q.filter(x => x.s.includes(d)).reduce((acc, x) => acc + x.r, 0)
  const b = a / 60
  return Math.round(b * 100)
}
const flip = x => (x === 1 ? 5 : x === 2 ? 4 : x === 4 ? 2 : x === 5 ? 1 : 3)
const q = [
  {q: 'I am the life of the party.', s: '(1+)', r: 5},
  {q: 'Feel little concern for others.', s: '(2-)', r: 3},
  {q: 'I am always prepared.', s: '(3+)', r: 3},
  {q: 'Get stressed out easily.', s: '(4-)', r: 5},
  {q: 'Have a rich vocabulary.', s: '(5+)', r: 5},
  {q: "Don't talk a lot.", s: '(1-)', r: 3},
  {q: 'I am interested in people.', s: '(2+)', r: 3},
  {q: 'Leave my belongings around.', s: '(3-)', r: 3},
  {q: 'I am relaxed most of the time.', s: '(4+)', r: 3},
  {q: 'Have difficulty understanding abstract ideas.', s: '(5-)', r: 3},
  {q: 'Feel comfortable around people.', s: '(1+)', r: 3},
  {q: 'Insult people.', s: '(2-)', r: 1},
  {q: 'Pay attention to details.', s: '(3+)', r: 5},
  {q: 'Worry about things.', s: '(4-)', r: 3},
  {q: 'Have a vivid imagination.', s: '(5+)', r: 3},
  {q: 'Keep in the background.', s: '(1-)', r: 3},
  {q: "Sympathize with others' feelings.", s: '(2+)', r: 3},
  {q: 'Make a mess of things.', s: '(3-)', r: 3},
  {q: 'Seldom feel blue.', s: '(4+)', r: 3},
  {q: 'I am not interested in abstract ideas.', s: '(5-)', r: 3},
  {q: 'Start conversations.', s: '(1+)', r: 3},
  {q: "I am not interested in other people's problems.", s: '(2-)', r: 3},
  {q: 'Get chores done right away.', s: '(3+)', r: 3},
  {q: 'I am easily disturbed.', s: '(4-)', r: 3},
  {q: 'Have excellent ideas.', s: '(5+)', r: 5},
  {q: 'Have little to say.', s: '(1-)', r: 3},
  {q: 'Have a soft heart.', s: '(2+)', r: 3},
  {q: 'Often forget to put things back in their proper place.', s: '(3-)', r: 3},
  {q: 'Get upset easily.', s: '(4-)', r: 5},
  {q: 'Do not have a good imagination.', s: '(5-)', r: 3},
  {q: 'Talk to a lot of different people at parties.', s: '(1+)', r: 3},
  {q: 'I am not really interested in others.', s: '(2-)', r: 3},
  {q: 'Like order.', s: '(3+)', r: 2},
  {q: 'Change my mood a lot.', s: '(4-)', r: 2},
  {q: 'I am quick to understand things.', s: '(5+)', r: 3},
  {q: "Don't like to draw attention to myself.", s: '(1-)', r: 3},
  {q: 'Take time out for others.', s: '(2+)', r: 3},
  {q: 'Shirk my duties.', s: '(3-)', r: 4},
  {q: 'Have frequent mood swings.', s: '(4-)', r: 3},
  {q: 'Use difficult words.', s: '(5+)', r: 3},
  {q: "Don't mind being the center of attention.", s: '(1+)', r: 3},
  {q: "Feel others' emotions.", s: '(2+)', r: 3},
  {q: 'Follow a schedule.', s: '(3+)', r: 5},
  {q: 'Get irritated easily.', s: '(4-)', r: 3},
  {q: 'Spend time reflecting on things.', s: '(5+)', r: 3},
  {q: 'I am quiet around strangers.', s: '(1-)', r: 3},
  {q: 'Make people feel at ease.', s: '(2+)', r: 5},
  {q: 'I am exacting in my work.', s: '(3+)', r: 3},
  {q: 'Often feel blue.', s: '(4-)', r: 3},
  {q: 'I am full of ideas.', s: '(5+)', r: 5},
]
