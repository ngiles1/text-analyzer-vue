<script setup lang="ts">
interface Props {
  bg: string;
  number: number;
  label: string;
}

const { bg = '#e4e4ef', number = 0, label = ''} = defineProps<Props>()

const formatNumber = (number: number) => {
  return new Intl.NumberFormat(navigator.language).format(number)
}
</script>

<template>
<div
  class="stat"
  :style="`background: ${bg}`"
>
  <div class="stats__info">
    <div class="number">{{ formatNumber(number) }}</div>
    <div class="label">{{ label }}</div>
  </div>
</div>
</template>

<style scoped lang="scss">
.stat {
  padding: 1rem;
  border-radius: .75rem;
  height: 130px;
  background-color: red;
  flex: 1 1 100%;
  display: flex;
  align-items: center;

  @media(min-width: 576px) {
    height: 150px;
    flex: 0 0 calc(50% - 0.5rem);
  }

  @media(min-width: 992px) {
    flex: 1;
  }
}

.number {
  font-size: clamp(2.5rem, 1.8497rem + 3.4682vw, 4rem);
  font-weight: 700;
  line-height: .75;
}

.label {
  font-size: 20px;
  margin-top: .5rem;
}
</style>