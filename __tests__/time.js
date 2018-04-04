test('12 hour dates and that', () => {
  expect(timeConversion('07:45:00PM')).toEqual('19:45:00')
  expect(timeConversion('12:45:00PM')).toEqual('12:45:00')
  expect(timeConversion('12:45:00AM')).toEqual('00:45:00')
})

function timeConversion(s) {
  const midday = '12'
  const midnight = '00'
  const isAM = s[8] !== 'P'
  const isTwelve = s.slice(0, 2) === '12'
  const isMidday = !isAM && isTwelve
  const isMidnight = isAM && isTwelve
  const hours = +s.slice(0, 2)
  const minutesAndSeconds = s.slice(2, 8)
  if (isMidday) return midday + minutesAndSeconds
  if (isMidnight) return midnight + minutesAndSeconds
  return isAM ? s.slice(0, 8) : hours + 12 + minutesAndSeconds
}
test('pad minutes', () => {
  expect(pad(70)).toEqual('70')
  expect(pad(0)).toEqual('00')
  expect(pad(5)).toEqual('05')
  expect(pad('75')).toEqual('75')
  expect(pad('5')).toEqual('05')
})
const pad = x => (x < 10 ? '0' + x : x + '')

test('seconds to duration', () => {
  expect(formatDuration(0)).toEqual('now')
  expect(formatDuration(1)).toEqual('1 second')
  expect(formatDuration(5)).toEqual('5 seconds')
  expect(formatDuration(62)).toEqual('1 minute and 2 seconds')
  expect(formatDuration(120)).toEqual('2 minutes')
  expect(formatDuration(3662)).toEqual('1 hour, 1 minute and 2 seconds')
  expect(formatDuration(7777)).toEqual('2 hours, 9 minutes and 37 seconds')
  expect(formatDuration(77777)).toEqual('21 hours, 36 minutes and 17 seconds')
  expect(formatDuration(177777)).toEqual('2 days, 1 hour, 22 minutes and 57 seconds')
  expect(formatDuration(77777777)).toEqual('2 years, 170 days, 4 hours, 56 minutes and 17 seconds')
})

const pl = (h, u) => (!h ? '' : `${h} ${u}${h > 1 ? 's' : ''}`)

const formatDuration = seconds => {
  if (!seconds) return 'now'
  const r = {}
  const s = {
    year: 31536000,
    // month: 2592000,
    // week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }
  d = seconds
  Object.keys(s).forEach(key => {
    r[key] = Math.floor(d / s[key])
    d -= r[key] * s[key]
  })
  const c = [
    pl(r.year, 'year'),
    pl(r.day, 'day'),
    pl(r.hour, 'hour'),
    pl(r.minute, 'minute'),
    pl(r.second, 'second'),
  ].filter(x => !!x)
  return c.length === 1 ? c[0] : `${c.slice(0, -1).join`, `} and ${c[c.length - 1]}`
}
