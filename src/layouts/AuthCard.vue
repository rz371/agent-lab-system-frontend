<template>
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="container">
      <div class="header">
        <div>
          <h3><slot name="firstTitle"></slot></h3>
        </div>
        <span class="second-title"><slot name="secondTitle"></slot></span>
      </div>

      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  text-align: center;
  .header {
    margin-bottom: 20px;
    .second-title {
      font-size: 12px;
    }
  }
}
</style>
