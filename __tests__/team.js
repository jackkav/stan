test('uneven teams ignores last player', () => {
  expect(
    createTeam({
      jack: {},
      katy: {},
      conan: {},
      hannah: {},
      tom: {},
    })
  ).toEqual([
    {
      name: 'team 1',
      players: {
        jack: {},
        katy: {},
      },
    },
    {
      name: 'team 2',
      players: {
        conan: {},
        hannah: {},
      },
    },
  ])
})
test('two teams', () => {
  expect(
    createTeam({
      jack: {},
      katy: {},
      conan: {},
      hannah: {},
    })
  ).toEqual([
    {
      name: 'team 1',
      players: {
        jack: {},
        katy: {},
      },
    },
    {
      name: 'team 2',
      players: {
        conan: {},
        hannah: {},
      },
    },
  ])
})
test('one team', () => {
  expect(
    createTeam({
      jack: {},
      katy: {},
    })
  ).toEqual([
    {
      name: 'team 1',
      players: {
        jack: {},
        katy: {},
      },
    },
  ])
  expect(
    createTeam({
      hannah: {},
      katy: {},
    })
  ).toEqual([
    {
      name: 'team 1',
      players: {
        hannah: {},
        katy: {},
      },
    },
  ])
})

const createTeam = players => {
  let list = Object.keys(players)
  let teams = []
  for (let i = 0; i <= list.length / 2; i++) {
    let tmp = {
      name: 'team ' + (i + 1),
      players: {},
    }
    tmp.players[list.shift()] = {}
    tmp.players[list.shift()] = {}
    teams.push(tmp)
    tmp = {}
  }
  return teams
}
