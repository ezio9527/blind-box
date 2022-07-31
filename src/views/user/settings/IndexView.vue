<template>
  <div class="settings-view">
    <van-nav-bar :title="$t('userView.settingsView.title')" left-arrow @click-left="$router.push({ name: 'home' })"/>
  </div>
</template>

<script>
export default {
  name: 'SettingsView'
}
</script>

<style lang="less" scoped>
.settings-view {
}
</style>
