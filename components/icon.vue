<script setup lang="ts">
interface Props {
  icon: string;
  ariaHidden?: boolean;
  focusable?: string | number;
  viewBox: string;
  height?: string;
}

const { icon, ariaHidden = true, focusable = "false", viewBox, height = '1em' } = defineProps<Props>();
</script>

<template>
<svg
  class="ui_icon"
  :aria-hidden="ariaHidden"
  :focusable="focusable"
  :viewBox="viewBox"
  :style="`height: ${height};`"
>
  <use :href="`/assets/images/icons.svg#${icon}`"></use>
</svg>
</template>

<style scoped lang="scss">
.ui_icon {
  fill: currentColor;
  width: auto;
}
</style>
