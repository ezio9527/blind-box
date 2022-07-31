<template>
  <div class="header-comp">
    <!--头像-->
    <div class="header-head_img">
      <svg class="icon icon-head-img" aria-hidden="true">
        <use xlink:href="#icon-head-img"></use>
      </svg>
    </div>
    <!--账号-->
    <div class="header-account">
      <span class="header-account_nick">Amngsi</span>
      <span class="header-account_email">Amngsi@163.com</span>
    </div>
    <!--语言-->
    <div>
      <van-button class="header-lang">
        <template #icon>
          <svg class="icon icon-earth" aria-hidden="true">
            <use xlink:href="#icon-earth"></use>
          </svg>
        </template>
        English
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComp'
}
</script>

<style lang="less" scoped>
.header-comp {
  display: flex;
  justify-content: space-between;
  //头像
  .header-head_img {
    width: 60px;
    height: 60px;
    font-size: 60px;
    overflow: hidden;
    background-color: var(--base-background-color-light-2);
    border-radius: 1000px;
    margin-left: var(--base-padding-lg);
    margin-right: 27px;
    color: #F5F5F9;
  }

  //账号
  .header-account {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .header-account_nick {
      margin-top: 8px;
      font-size: var(--base-font-size-medium);
      color: var(--base-text-color-dark);
    }

    .header-account_email {
      margin-bottom: 4px;
      font-size: var(--base-font-size-normal);
      color: var(--base-text-color-gray);
    }
  }

  //语言
  .header-lang {
    --van-button-default-background-color: var(--base-primary-color);
    --van-button-default-border-color: var(--base-primary-color);
    --van-button-border-radius: var(--base-border-radius-sm);
  }
}
</style>
