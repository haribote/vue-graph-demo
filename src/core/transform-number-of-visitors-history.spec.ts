import { expect } from 'chai'

import transformNumberOfVisitorsHistory from './transform-number-of-visitors-history'

describe('transformNumberOfVisitorsHistory', () => {
  it('should transform from `NpbSeasonInterface[]` to linear by team', () => {
    expect(transformNumberOfVisitorsHistory(
      [
        {
          'season': 2017,
          'data': [
            {
              'team': 0,
              'value': 100
            },
            {
              'team': 1,
              'value': 200
            },
            {
              'team': 2,
              'value': 300
            }
          ]
        },
        {
          'season': 2016,
          'data': [
            {
              'team': 0,
              'value': 200
            },
            {
              'team': 1,
              'value': 300
            },
            {
              'team': 2,
              'value': 100
            }
          ]
        },
        {
          'season': 2015,
          'data': [
            {
              'team': 0,
              'value': 300
            },
            {
              'team': 1,
              'value': 100
            },
            {
              'team': 2,
              'value': 200
            }
          ]
        }
      ],
      [
        {
          'id': 0,
          'name': 'hoge',
          'color': '#FF0000',
          'league': 0
        },
        {
          'id': 1,
          'name': 'piyo',
          'color': '#00FF00',
          'league': 0
        },
        {
          'id': 2,
          'name': 'fuga',
          'color': '#0000FF',
          'league': 0
        }
      ]
    ))
      .to.deep.equal([[300, 200, 100], [100, 300, 200], [200, 100, 300]])
  })
})
