<template>
  <div>
    <div/>
      <div class="thanks-image">
        <img src="./svgs/attendance_text_Thankyou.svg"  style="margin-top: 60%" />
      </div>
      <div class="thanks-text">
        送信完了<br>
      ありがとうございました!<br>
      </div>
      <div class="notify-text">
      いただいた写真は私たちで確認後<br>
      Gallery にアップいたします
      </div>
      <div style="text-align: center;">
        <button
            class="topbutton"
            onclick="location.href='/gallery'"
        >
          Gallery へ戻る
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
  font-size: 16px;
  color: $color-navy;
}

.notify-text {
  text-align: center;
  margin-top: 20px;
  line-height: 15px;
  font-size: 10px;
  color: $color-navy;
}


.topbutton {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid $color-navy;
  font-size: 18px;
  padding: 5px 35px;
  border-radius: 50px;
  color: $color-navy;
  margin-top: 35px;
  width: 60%;
}

</style>
