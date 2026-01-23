import { describe, it, expect } from 'vitest'
import { formatCurrency, formatNumber, formatPercent, clamp, roundTo } from '~/utils/numberFormatter'

describe('numberFormatter', () => {
  describe('formatCurrency', () => {
    it('should format number as currency', () => {
      expect(formatCurrency(1234.56)).toContain('1,234.56')
    })
  })

  describe('formatNumber', () => {
    it('should format number with thousand separators', () => {
      expect(formatNumber(1234567)).toContain('1,234,567')
    })

    it('should format number with decimals', () => {
      expect(formatNumber(1234.567, 2)).toContain('1,234.57')
    })
  })

  describe('formatPercent', () => {
    it('should format number as percentage', () => {
      expect(formatPercent(50)).toContain('50')
      expect(formatPercent(75.5, 1)).toContain('75.5')
    })
  })

  describe('clamp', () => {
    it('should clamp value between min and max', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })
  })

  describe('roundTo', () => {
    it('should round to decimal places', () => {
      expect(roundTo(1.2345, 2)).toBe(1.23)
      expect(roundTo(1.2355, 2)).toBe(1.24)
      expect(roundTo(1.2345, 0)).toBe(1)
    })
  })
})
