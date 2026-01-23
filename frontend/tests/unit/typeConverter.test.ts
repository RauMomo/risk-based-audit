import { describe, it, expect } from 'vitest'
import { toNumber, toInt, toString, toBoolean, arrayToString, stringToArray } from '~/utils/typeConverter'

describe('typeConverter', () => {
  describe('toNumber', () => {
    it('should convert string to number', () => {
      expect(toNumber('123')).toBe(123)
      expect(toNumber('123.45')).toBe(123.45)
    })

    it('should return default value for invalid input', () => {
      expect(toNumber('invalid')).toBe(0)
      expect(toNumber('invalid', 10)).toBe(10)
    })

    it('should handle null and undefined', () => {
      expect(toNumber(null)).toBe(0)
      expect(toNumber(undefined)).toBe(0)
    })
  })

  describe('toInt', () => {
    it('should convert string to integer', () => {
      expect(toInt('123')).toBe(123)
      expect(toInt('123.45')).toBe(123)
    })

    it('should floor number values', () => {
      expect(toInt(123.45)).toBe(123)
      expect(toInt(123.99)).toBe(123)
    })
  })

  describe('toString', () => {
    it('should convert values to string', () => {
      expect(toString(123)).toBe('123')
      expect(toString(true)).toBe('true')
      expect(toString(null)).toBe('')
      expect(toString(undefined)).toBe('')
    })
  })

  describe('toBoolean', () => {
    it('should convert truthy strings to boolean', () => {
      expect(toBoolean('true')).toBe(true)
      expect(toBoolean('1')).toBe(true)
      expect(toBoolean('yes')).toBe(true)
      expect(toBoolean('on')).toBe(true)
    })

    it('should convert falsy strings to boolean', () => {
      expect(toBoolean('false')).toBe(false)
      expect(toBoolean('0')).toBe(false)
      expect(toBoolean('')).toBe(false)
    })
  })

  describe('arrayToString', () => {
    it('should convert array to comma-separated string', () => {
      expect(arrayToString(['a', 'b', 'c'])).toBe('a, b, c')
    })

    it('should use custom separator', () => {
      expect(arrayToString(['a', 'b', 'c'], '; ')).toBe('a; b; c')
    })
  })

  describe('stringToArray', () => {
    it('should convert comma-separated string to array', () => {
      expect(stringToArray('a, b, c')).toEqual(['a', 'b', 'c'])
    })

    it('should use custom separator', () => {
      expect(stringToArray('a; b; c', ';')).toEqual(['a', 'b', 'c'])
    })
  })
})
