<template>
<div class="themepicker">
  <div class="themeoptions">
    <Themebutton
      :icon="'icon-sun'"
      @click="$colorMode.preference = 'light'"
    />
    <Themebutton
      :icon="'icon-moon'"
      @click="$colorMode.preference = 'dark'"
    />
    <Themebutton
      :icon="'icon-system'"
      @click="$colorMode.preference = 'system'"
    />
  </div>
</div>
</template>

<style scoped lang="scss">
.themepicker {
  position: relative;
}
.themeoptions {
  display: flex;
  gap: .25rem;
}
</style>
