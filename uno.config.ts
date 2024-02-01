import { defineConfig, Extractor } from 'unocss'

export const defaultSplitRE = /[\\:]?[\s'"`;{}]+/g
export const splitWithVariantGroupRE = /([\\:]?[\s"'`;<>]|:\(|\)"|\)\s)/g

export function splitCode(code: string): string[] {
  return code.split(defaultSplitRE)
}

export const extractorSplit: Extractor = {
  name: '@unocss/core/extractor-split',
  order: 0,
  extract(res) {
    console.log('extractorSplit', res.id)
    return splitCode(res.code)
  },
}

export default defineConfig({
  extractors: [
    extractorSplit
  ],
  content: {
    pipeline: {
      include: ['./src/**/*.{vue,ts,jsx,tsx}' ],
    }
  },
})
