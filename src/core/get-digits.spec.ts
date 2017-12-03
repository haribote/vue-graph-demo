import { expect } from 'chai'
import getDigits from './get-digits'

describe('getDigits', () => {
  it('should return 1', () => {
    expect(getDigits(1))
      .to.equal(1)
  })

  it('should return 3', () => {
    expect(getDigits(100))
      .to.equal(3)
  })

  it('should return 5', () => {
    expect(getDigits(10000))
      .to.equal(5)
  })
})
