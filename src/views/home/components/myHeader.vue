<template>
  <el-row
    type="flex"
    justify="space-between"
    align="center"
  >
    <el-col
      class="text-left flex-row -cen"
      :span="3"
    >
      <img
        style="width: 19px; height: 16px; margin-right: 5px"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAgCAQAAADUbcI4AAAAw0lEQVRIieXUsQ3CMBCFYVsI0VLTQGkxBFU2YgdW8CyUzJAe6LIBFdJPkShKQmxfLgYJ8Vy4efd1d8ZEwhN5DjHpD7FFpHP5HoZlnwnD4nlQZMCweICaY1W/MBXBWgrgyjKGJLAeVeEkVADTUaOYlhrB9NQb1qMCkWOnFDUFc1TZMAk3ARtwHhseFmB6LrQBKi68mwoudjW6XDET63BHCZW+tI6qpjhTUlKyUWPGsG7+e1PczsDa4kewXU5Mkh/GbtOwF8chuoRpuoMfAAAAAElFTkSuQmCC"
        alt="返回"
      />
      <el-button
        class="white"
        type="text"
      >返回</el-button>
    </el-col>
    <el-col
      class="text-center"
      :span="18"
    >室内全景图</el-col>
    <el-col
      class="flex-row end-cen"
      :span="2"
    >
      <img
        style="width: 16px; height: 16px; margin-right: 3px"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAeElEQVRIx2P4//f/9/8f/7/+//T/WgY08B8KgCyR/w/A8Op/LRyKgOAYHgPE4apeohlBsgHoRpBhAKoRZBmAbASZBiCMwGcAklGYBsCMoMAAiBFIXFCKwA2xg2MM/ykDZ0YNGDVgEBrAQCQYNWB4GzBUk/JViuAqADqBxrkM22DzAAAAAElFTkSuQmCC"
      />
      <el-button
        class="white"
        @click="save"
        type="text"
      >保存</el-button>
      <img
        class="ml10"
        style="width: 11px; height: 16px; margin-right: 3px"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAgCAQAAAC8nkAAAAAAyUlEQVQ4y63UsUqCYRQGYAPHiqIhRCIauo2CgkAQvADBIZCauxYTHATBsakhEMRbkYioCJIKpyCfhhrafH/wnZ/l+845b6lUJMpOHKb4Ggs3dhP84jdvmsvx/9yq5JiZVo7hTjXHvDvPMYzs5ZgP7RzD2H6O+XRpLcUwcZBj5i5yDFdF8GsRPM3xl0aKp46zBy50rWdfd+80nWDPRjbuB2fpIvVtZiv6qJYu/8BWdlZP6unBDm1nJfOssbxkOvg2tJMV49HfHaw2PwNYCmuPIq+dAAAAAElFTkSuQmCC"
      />
      <el-button
        class="white"
        @click="preview"
        type="text"
      >预览</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    save() {
      this.$message.success('保存成功');
    },
    preview() {
      this.$emit('preview');
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header.header {
  height: 40px;
  line-height: 40px;
  border-color: #4b4b4b #000 #000 #4b4b4b;
  border-style: solid;
  border-width: 1px;
}
</style>

