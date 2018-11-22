<template>
  <div class="top">
    <spm-header :title="$route.meta.title">
      <spm-button @click.native="back" v-if="$store.state.headerBar.isBack" slot="left" icon="back">返回</spm-button>
      <spm-button @click.native="save" v-if="$store.state.headerBar.isAddressSave" slot="right">保存</spm-button>
      <spm-button @click.native="add" v-if="$store.state.headerBar.isWaterAdd" slot="right">创建配送单</spm-button>
    </spm-header>
  </div>
</template>
<script src="./Top.js"></script>
<style>

</style>
