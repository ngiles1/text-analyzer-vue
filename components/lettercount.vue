<script setup lang="ts">
interface Props {
  letter: string;
  count: number;
  pc: number;
}

const { letter, count, pc } = defineProps<Props>()
</script>

<template>
<div class="letter-count">
  <div class="letter">{{ letter }}</div>

  <div class="bar">
    <div class="bar-inner" :style="`width: ${pc}%`"></div>
  </div>

  <div class="stat">{{ count }} ({{ pc.toFixed(2) }}%)</div>
</div>
</template>

<style scoped lang="scss">
.letter-count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;
  width: 100%;
}

.letter {
  width: 2ch;
}

.bar {
  width: 100%;
  height: .75rem;
  background-color: #f2f2f7;
  border-radius: 99px;
  overflow: hidden;

  .dark-mode & {
    background-color: #21222c;
  }

  .bar-inner {
    background-color: #d3a0fa;
    width: 0;
    height: 100%;
    border-radius: 99px;
    transition: width .2s;
  }
}

.stat {
  width: 7.5rem;
  text-align: right;
}
</style>
