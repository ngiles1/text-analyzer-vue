<script setup lang="ts">
const colorMode = useColorMode()

const baseURL = useRuntimeConfig().app.baseURL
provide('baseURL', baseURL)

const spacesExcluded: Ref<boolean> = ref(false)

const input: Ref<string | null> = ref('Design is the silent ambassador of your brand. Simplicity is key to effective communication, creating clarity in every interaction. A great design transforms complex ideas into elegant solutions, making them easy to understand. It blends aesthetics and functionality seamlessly.');

const charCount: ComputedRef<number> = computed(() => {
  if(spacesExcluded.value) {
    return input.value?.replace(/\s/g, '').length ?? 0
  } else {
    return input.value?.length ?? 0
  }
})

const timeToRead: ComputedRef<string> = computed(() => {
  const minutes = Math.round(charCount.value / 200)

  if(minutes < 1) {
    return '< 1 minute'
  } else {
    return `${minutes} minute${minutes > 1  ? 's' : ''}`
  }
})

const showMore: Ref<boolean> = ref(false)

interface CharDistribution {
  [character: string]: number;
}
const charDistribution: ComputedRef<CharDistribution> = computed(() => {
  let result: CharDistribution = {}

  if (input.value) {
    for (let character of input.value) {
      if (/[a-zA-Z]/.test(character)) {
        const character2 = character.toUpperCase()
        if (!result[character2]) {
          result[character2] = 0
        }
        result[character2] += 1
      }
    }
  }
  
  const sortedEntries = Object.entries(result).sort((a, b) => b[1] - a[1])
  const sortedResult: CharDistribution = Object.fromEntries(sortedEntries)
  return sortedResult
})

const charDistributionCut: ComputedRef<CharDistribution> = computed(() => {
  let sortedEntries = []
  if(!showMore.value) {
    sortedEntries = Object.entries(charDistribution.value).sort((a, b) => b[1] - a[1]).slice(0, 5)
  } else {
    sortedEntries = Object.entries(charDistribution.value).sort((a, b) => b[1] - a[1])
  }
  const sortedResult: CharDistribution = Object.fromEntries(sortedEntries)
  return sortedResult;
})

const words: ComputedRef<string[]> = computed(() => {
  return input.value?.trim().split(/\s+/).filter(word => word.length > 0) || []
})

// Might implement this later
// interface WordsSorted {
//   [length: number]: string[]
// }
// const wordsSorted: ComputedRef<WordsSorted> = computed(() => { 
//   const result: WordsSorted = {}

//   words.value.forEach(word => {
//     const length = word.length
//     if (!result[length]) {
//       result[length] = []
//     }
//     result[length].push(word)
//   })

//   return result
// })

const sentences: ComputedRef<string[]> = computed(() => {
  return input.value?.trim().split(/[.!?]+\s+/).filter(sentence => sentence.length > 0) || []
})
</script>

<template>
  <ColorScheme placeholder="..." tag="div">
    <div class="container">
      <header>
        <img
          :src="`${baseURL}/assets/images/logo-dark-theme.svg`"
          alt="Logo"
          width="251"
          height="40"
          v-if="$colorMode.preference === 'dark'"
        >
        <img
          :src="`${baseURL}/assets/images/logo-light-theme.svg`"
          alt="Logo"
          width="251"
          height="40"
          v-else
        >

        <Themepicker />
      </header>

      <h1>Analyze&nbsp;your&nbsp;text<br />in&nbsp;real&#8209;time</h1>
      
      <section>
        <textarea rows="8" v-model="input">
        </textarea>
        <div id="input-foot">
          <div>
            <input type="checkbox" id="excludeSpaces" v-model="spacesExcluded">
            <label for="excludeSpaces">Exclude Spaces</label>
          </div>
          <div>Approx. reading time: {{ timeToRead }}</div>
        </div>
      </section>
      
      <section>
        <div class="stats">
          <Stat
            :bg="`#d3a0fa url('${baseURL}/assets/images/pattern-character-count.svg') no-repeat center left+130%/55%`"
            :label="'Total Characters'"
            :number="charCount"
          />
          <Stat
            :bg="`#ff9f00 url('${baseURL}/assets/images/pattern-word-count.svg') no-repeat center left+130%/55%`"
            :label="'Word Count'"
            :number="words.length"
          />
          <Stat
            :bg="`#fe8159 url('${baseURL}/assets/images/pattern-sentence-count.svg') no-repeat center left+130%/55%`"
            :label="'Sentence Count'"
            :number="sentences.length"
          />
        </div>
      </section>

      <section>
        <h2>Letter Density</h2>
        <div v-if="Object.keys(charDistribution).length">
        <TransitionGroup
          name="list"
          tag="ul"
          class="density-list"
          style="margin: .75rem 0;"
        >
          <li v-for="(amount, char) in charDistributionCut" :key="char">
            <Lettercount
              :letter="`${char as string}`"
              :count="amount"
              :pc="(amount / (input?.length ?? 1) * 100) || 0"
            />
          </li>
        </TransitionGroup>
        
        <button
          class="see-more-btn"
          v-if="Object.keys(charDistribution).length > 5"
          @click="showMore = !showMore"
        >
          {{ showMore ? 'Hide' : 'Show' }} {{ Object.keys(charDistribution).length - 5 }} {{ showMore ? 'Letters' : 'More' }}
          <Icon
            v-if="!showMore"
            :icon="'icon-angle-down'"
            :viewBox="'0 0 24 24'"
            :height="'1em'"
          />
          <Icon
            v-else
            :icon="'icon-angle-up'"
            :viewBox="'0 0 24 24'"
            :height="'1em'"
          />
        </button>
      </div>
        <p v-else>No characters found. Start typing to see letter density.</p>
      </section>

    </div>
  </ColorScheme>
</template>

<style scoped lang="scss">
.list-move,
.list-enter-active,
.list-leave-active {
  transition: transform 0.5s, opacity .5s;
  width: 100%;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transition: opacity .5s;
}

.list-leave-active {
  opacity: 0;
}
</style>
