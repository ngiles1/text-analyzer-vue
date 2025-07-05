<script setup lang="ts">
interface Props {
  icon: string;
}

const { icon } = defineProps<Props>();
</script>

<template>
<button class="themebutton">
  <Icon
    :icon="icon"
    :viewBox="'0 0 512 512'"
    :height="'1.25rem'"
  />
</button>
</template>

<style scoped lang="scss">
.themebutton {
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: .5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .light-mode & {
    color: #202b37;
    background: #f2f2f7;
    &:hover {
      background-color: #e4e4ef;
    }
  }

  .dark-mode & {
    color: #f2f2f7;
    background: #2a2b37;
    &:hover {
      background-color: #404254;
    }
  }
}
</style>
