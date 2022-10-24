<template>
  <div>
    <div/>
      <div class="thanks-image">
        <img src="./svgs/attendance_text_Thankyou.svg"  style="margin-top: 60%" />
      </div>
      <div class="thanks-text">
        送信完了<br>
      ありがとうございました
      </div>
      <div style="text-align: center;">
        <button
            class="topbutton"
            onclick="location.href='/'"
        >
          TOP
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";

.thanks-image {
  display: flex;
  align-items: center;
  justify-content: center;

}

img.thanks-image {

}

.thanks-text {
  text-align: center;
  margin-top: 50px;
  line-height: 30px;
  font-size: 14px;
  color: $color-navy;
}

.topbutton {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid $color-navy;
  font-size: 18px;
  padding: 5px 50px;
  border-radius: 50px;
  color: $color-navy;
  margin-top: 35px;
  width: 162px;
}

</style>
