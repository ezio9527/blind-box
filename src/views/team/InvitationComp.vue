<template>
 <div class="invitation-comp" v-if="code">
   <div @click="$router.push({ name: 'team' })">
     <span>{{ $t('teamView.invitation') }}</span>
   </div>
   <div id="invitation-url-copy">
     <span>{{ url }}</span>
     <svg class="icon" aria-hidden="true">
       <use xlink:href="#icon-copy"></use>
     </svg>
   </div>
 </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import { mapGetters } from 'vuex'
export default {
  name: 'InvitationComp',
  computed: {
    ...mapGetters({
      code: 'user/getInvitationCode'
    }),
    url () {
      return location.origin + '/invitation/' + this.code
    }
  },
  mounted () {
    const clipboard = new ClipboardJS('#invitation-url-copy', {
      text: () => {
        return this.url
      }
    })
    clipboard.on('success', e => {
      this.$toast(this.$t('success.copyUrl'))
    })
    clipboard.on('error', e => {
      this.$toast(this.$t('error.copyUrl'))
    })
  }
}
</script>

<style lang="less" scoped>
.invitation-comp {
  position: relative;
  z-index: 1;
  margin-top: 20px;
  border-radius: var(--base-border-radius-sm);
  background-color: var(--base-background-color-white);
  padding: var(--base-padding-large);
  div:first-child {
    display: flex;
    justify-content: space-between;
    font: var(--base-text-font-default);
    color: var(--base-text-color-black);
    svg {
      font-size: var(--base-font-size-mini);
    }
  }
  div:last-child {
    margin-top: 8px;
    display: flex;
    align-items: center;
    background-color: var(--base-background-color-gray6);
    font: var(--base-text-font-default);
    color: var(--base-text-color-gray2);
    padding: var(--base-padding-normal);
    border-radius: var(--base-border-radius-sm);
    span {
      word-break: break-all;
      margin-right: 28px;
      flex: 1;
    }
    svg {
      color: var(--base-text-color-blue);
      font-size: var(--base-font-size-super-large);
    }
  }
}
</style>
