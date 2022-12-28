<template>
  <div>

    <section id="top-message">

      <div>&emsp;</div>
      <div class="container" style="margin-bottom: 10px">
        <div class="main-title">ATTENDANCE</div>
        <div class="text_icon">
          <img src="./svgs/attendance.svg" />
        </div>
        <div class="main-text">
          お手数ですが<br>
          <u>xx月xx日(日)</u>までに<br>
          お返事いたけますと幸いです<br>
        </div>
        <div class="main-text" style="font-size: 10px;margin-top: 20px; margin-bottom: 20px">
          ご不明点等ございましたら<br>
          xxx-xxxx-xxxx (新郎携帯)<br>
          もしくは個別LINEにてご連絡ください<br>
        </div>
        <div class="main-text" style="font-size: 10px;margin-top: 30px; margin-bottom: 50px">
          ※は必須項目です
        </div>
      </div>
    </section>
    <section id="form">
      <form
          :action="formAttribute.url"
          method="post"
          @submit.prevent="()=>{}"
          target="dummy-frame"
          name="att_form"
          onsubmit="submitted=true"
      >
        <div class="form-area">
          <div class="form-area_attendance">
            <button
                class="form-area_attendance_btn"
                :class="{'form-area_attendance_btn_selected': formObj.attendance }"
                @click="formObj.attendance=!formObj.attendance"
            >
              <span class="form-area_attendance_btn_top">出席</span><br>
              <span class="form-area_attendance_btn_btm">Attend</span>
            </button>

            <button
                class="form-area_attendance_btn"
                :class="{'form-area_attendance_btn_selected': !formObj.attendance}"
                @click="formObj.attendance=!formObj.attendance"
            >
              <span class="form-area_attendance_btn_top">欠席</span><br>
              <span class="form-area_attendance_btn_btm">Decline</span><br>
            </button>
            <div class="main-text" style="font-size: 10px;margin-top: 0; margin-bottom: 50px">
              お選びください
            </div>
          </div>
          <div hidden>
            <input :name="formAttribute.userid" id="form-userid">
            <input :name="formAttribute.attendance" id="form-attendance">
          </div>


          <div class="form-area_texts form-area_bold"
          >
            <div :class="{'invalid': formObjInvalid.firstName&formObjInvalid.familyName}" id="nameform">
            お名前<span class="form-area_light" style="padding-left: 8px">Name*</span>
              <span v-show="formObjInvalid.familyNameKana&formObjInvalid.firstNameKana" style="font-size: 10px">必ずご入力ください</span>
            <div>
              <input
                  type="text" class="form-area_texts_input1" style="margin-right: 3%;" placeholder="姓"
                  v-model="formObj.familyName" :name="formAttribute.familyName"
                  :class="{'invalid': formObjInvalid.familyName}" id="form-familyName"

              >
              <input
                  type="text" class="form-area_texts_input1" placeholder="名"
                  v-model="formObj.firstName" :name="formAttribute.firstName" id="form-firstName"
                  :class="{'invalid': formObjInvalid.firstName}"
              >
            </div>
            </div>

            <div :class="{'invalid': formObjInvalid.familyNameKana&formObjInvalid.firstNameKana}">
            かな<span class="form-area_light" style="padding-left: 8px">Kana*</span>
              <span v-show="formObjInvalid.familyNameKana&formObjInvalid.firstNameKana" style="font-size: 10px">必ずご入力ください</span>
            <div>
              <input
                  type="text" class="form-area_texts_input1" style="margin-right: 3%;" placeholder="せい"
                  v-model="formObj.familyNameKana" :name="formAttribute.familyNameKana" id="form-familyNameKana"
                  :class="{'invalid': formObjInvalid.familyNameKana}"
              >
              <input
                  type="text" class="form-area_texts_input1" placeholder="めい"
                  v-model="formObj.firstNameKana" :name="formAttribute.firstNameKana" id="form-firstNameKana"
                  :class="{'invalid': formObjInvalid.firstNameKana}"
              >
            </div>
            </div>

            〒<span class="form-area_light" style="padding-left: 8px">Postcode</span>
            <div>
              <input
                  type="text" class="form-area_texts_input2" style="margin-right: 3%;" placeholder="0000000"
                  v-model="formObj.postCode"  :name="formAttribute.postCode" id="form-postCode"
                  @input="inputAddress"
              >
            </div>

            住所<span class="form-area_light" style="padding-left: 8px">Address</span>
            <div>
              <input
                  type="text" class="form-area_texts_input2" style="margin-right: 10px;" placeholder="住所"
                  v-model="formObj.address" :name="formAttribute.address" id="form-address"
              >
            </div>

            建物名<span class="form-area_light" style="padding-left: 8px">Building</span>
            <div>
              <input
                  type="text" class="form-area_texts_input2" style="margin-right: 10px;" placeholder="建物名・部屋番号"
                  v-model="formObj.building" :name="formAttribute.building" id="form-building"
              >
            </div>

            アレルギー<span class="form-area_light" style="padding-left: 8px">Allergy</span>
            <div>
              <input
                  type="text" class="form-area_texts_input2" style="margin-right: 10px;" placeholder="アレルギー"
                  v-model="formObj.allergy" :name="formAttribute.allergy" id="form-allergy"
              >
            </div>

            メッセージ<span class="form-area_light" style="padding-left: 8px">Message</span>
            <div>
              <input
                  type="text" class="form-area_texts_input2" style="margin-right: 10px; height: 106px" placeholder="メッセージ"
                  v-model="formObj.message"  :name="formAttribute.message" id="form-message"
              >
            </div>
<!--            コメント-->

            お連れ様<span class="form-area_light" style="padding-left: 8px">Companion</span>
            <div>
              <input
                  type="text" class="form-area_texts_input2" style="margin-right: 10px; height: 106px" placeholder="お連れ様"
                  v-model="formObj.companion"   :name="formAttribute.companion" id="form-companion"
              >
              <div class="main-text" style="font-size: 10px;margin-top: 0; margin-bottom: 50px">
                ※ご同伴のお子様がいらっしゃいましたらご記入ください
              </div>
            </div>
            <div class="submit">
              <button
                  @click="formSubmit"
                  class="submit-button"
                >
                {{labelSubmit}}
              </button>
            </div>
          </div>
        </div>

        <iframe name="dummy-frame" id="dummy-frame" style="display:none;" :onload="onDummyLoad"></iframe>
      </form>

    </section>

  </div>

</template>

<script setup lang="ts">
import formAttribute from './formAttributes.json'
import {computed, ref, watchEffect} from 'vue'
import {fetchAddress} from './assets/scripts/wrapYubin.js'
import {useAuthenticator} from '@aws-amplify/ui-vue'

const auth = useAuthenticator()
const submitted = ref(false)
const isSubmitting = ref(false)
const labelSubmit = computed(()=>{
    if (isSubmitting.value) {
        return '送信中...'
    }else {
        return '送信'
    }
})


const onDummyLoad = () => {
    // if(submitted.value) {
    //   // window.location.href = "#"
    // }
}

const formObj = ref({
    userid: '',
    attendance: true,
    firstName: '',
    familyName: '',
    firstNameKana: '',
    familyNameKana: '',
    postCode: '',
    address: '',
    building: '',
    allergy: '',
    message: '',
    companion: ''
})

const formObjInvalid = ref({
    userid: false,
    firstName: false,
    familyName: false,
    firstNameKana: false,
    familyNameKana: false,
    postCode: false,
    address: false,
    building: false,
    allergy: false,
    message: false,
    companion: false
})

watchEffect(()=>{
    formObj.value.userid = auth.user.username
})


const formSubmit = () => {
    const setVal = ({id, v}) => {
        const tgt = document.getElementById(id)
        if (tgt !== null && 'value' in tgt) {
            tgt.value = v
        }
    }

    validateFormObj()
    if(isValid.value) {
        const form = document.getElementsByName('att_form')[0]
        if ('submit' in form) {
            isSubmitting.value = true
            setVal({id:'form-userid', v:formObj.value.userid})
            setVal({id:'form-attendance', v:formObj.value.attendance})
            setVal({id:'form-firstName', v:formObj.value.firstName})
            setVal({id:'form-familyName', v:formObj.value.familyName})
            setVal({id:'form-firstNameKana', v:formObj.value.firstNameKana})
            setVal({id:'form-familyNameKana', v:formObj.value.familyNameKana})
            setVal({id:'form-postCode', v:formObj.value.postCode})
            setVal({id:'form-address', v:formObj.value.address})
            setVal({id:'form-building', v:formObj.value.building})
            setVal({id:'form-allergy', v:formObj.value.allergy})
            setVal({id:'form-message', v:formObj.value.message})
            setVal({id:'form-companion', v:formObj.value.companion})

            form.submit()
            setTimeout(() => {
                window.location.href = '/thanks'
                console.log('submit.')
                isSubmitting.value = false
            }, 1000)
        }
    }else{
        window.location.href = '#'
    }
}

const validateFormObj = () => {
    formObjInvalid.value.familyName = formObj.value.familyName.length==0
    formObjInvalid.value.firstName = formObj.value.firstName.length==0
    formObjInvalid.value.firstNameKana = formObj.value.firstNameKana.length==0
    formObjInvalid.value.familyNameKana = formObj.value.familyNameKana.length==0
}

const isValid = computed(()=> {
    return !(formObjInvalid.value.familyName || formObjInvalid.value.firstName || formObjInvalid.value.firstNameKana || formObjInvalid.value.familyNameKana)
})

const inputAddress = () => {
    if(formObj.value.postCode.length <7) { return }
    fetchAddress(formObj.value.postCode)
        .then((address) => {
            if(typeof address === 'string')
                formObj.value.address = address
        },
        () =>{
            console.log('invalid postalcode.')
        })
}

</script>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";

.main {
  background-image: url("./svgs/attendance.bg.svg");
  margin-top: 0;
  margin-bottom: 0;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: top;
}

.main-title{
  margin-top: 80px;
  margin-bottom: 10px;
}


button {
  display: inline-block;
}

input{
}
::placeholder{
  padding-left: 10px;
  padding-top: 10px;
  vertical-align: text-top;
  font-size: 18px;
  color: rgba(0, 27, 67, 0.5);
}

.form-area {
  color: $color-navy;
  margin: 0 30px;
}

.form-area_bold {
  font-size: 18px;
  letter-spacing: 1.08px;
}

.form-area_light {
  font-size: 20px;
  font-weight: 50;
  letter-spacing: 0.86px;
}

.invalid {
  color: rgb(255, 38, 0)
}

.form-area_attendance {
  text-align: center;
}

.form-area_attendance_btn {
  text-align: center;
  padding: 13px 3px;
  margin: 15px;
  background-color: rgba(0, 0, 0, 0);
  border-color: $color-navy;
  color: $color-navy;
  border-radius: 300px;
  border-width: 0;
  text-decoration: line-through;
}

.form-area_attendance_btn_selected {
  border-width: 1px;
  text-decoration: none;
}

.form-area_attendance_btn_top {
  font-size: 28px;
  padding-left: 10px;
  letter-spacing: 10px;
}

.form-area_attendance_btn_btm {
  font-size: 15px;
  font-weight: 100;
}

.form-area_texts {
  border-width: 0;

}

.form-area_texts_input1 {
  border-width: 0;
  background-color: $color-white;
  height: 40px;
  width: 48%;
  margin-top: 18px;
  margin-bottom: 25px;
}

.form-area_texts_input2 {
  border-width: 0;
  background-color: $color-white;
  height: 40px;
  width: 99%;
  margin-top: 18px;
  margin-bottom: 25px;
}

.submit {
  text-align: center;
}

.submit-button {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid $color-navy;
  font-size: 18px;
  padding: 5px 50px;
  border-radius: 50px;
  color: $color-navy;
}





</style>
