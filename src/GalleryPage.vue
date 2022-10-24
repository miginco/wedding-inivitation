
<script setup lang="ts">
// import GalleryThumb from './assets/components/galleryThumb.vue'
import GalleryContent from './assets/components/galleryContent.vue'
import {computed, ref, watchEffect} from 'vue'
import {Storage} from 'aws-amplify'
import {useAuthenticator} from '@aws-amplify/ui-vue'
import FilterCheckbox from './assets/components/filterCheckbox.vue'
const auth = useAuthenticator()

const isSubmitting = ref(false)
const labelSubmit = computed(()=>{
    if (isSubmitting.value) {
        return '送信中...'
    }else {
        return '送信'
    }
})


const isOpened = ref(false)
const showtaro = ref(true)
const showhanako = ref(true)


watchEffect(() => {
    // if (!showhanako.value && !showtaro.value) {
    //     showhanako.value = true
    //     showtaro.value = true
    // }
})

const mode = computed(() => {
    let ret = 0
    if (showtaro.value) {ret += 1}
    if (showhanako.value) {ret += 2}
    if (ret > 2) {ret = 0}
    return ret
})

const files = ref<File[]|null>(null)

const openUpload = () => {
    isOpened.value = true
    document.getElementById('hidden-file-input').click()
}

const isSelected = computed(() => {
    return files.value !== null
})

const filename = (src_filename: string) =>{
    let ret = ''
    const userid = auth.user.username
    const ext = src_filename.slice(-5)
    const a = new Date()
    const uid = '-'+Math.random().toString(32).substring(2)

    const strDate = String(a.getFullYear())+ '-' +String(a.getMonth()+1) + String(a.getDate()) + '-' + String(a.getHours())+String(a.getMinutes()) + '-' + String(a.getSeconds())
    ret = strDate + '-' + userid + uid + ext
    return ret
}

const onSubmit = () => {
    isSubmitting.value = true
    const tmpFiles = []

    for (let i = 0; i<files.value.length; i++){tmpFiles.push(files.value[i])}
    console.log(tmpFiles)

    const a = Promise.all(tmpFiles.map(
        async file => {
            console.log(file)
            await Storage.put(filename(file.name), file)
        }
    ))

    a.then((res) => {
        console.log(res)
    })
    a.catch((e) => {
        console.log(e)
    })
    a.finally(() => {
        window.location.href = '/thanks-for-photo'
        // isSubmitting.value = false
        // isOpened.value=false
        // files.value = null
    })

}

const onChanged = (e) => {
    files.value = e.target.files
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
        document.getElementById('preview-image').setAttribute('src', String(e.target.result))
    }
    fileReader.readAsDataURL(e.target.files[0])
}

const onCanceled = () => {
    isOpened.value=false
    files.value = null
}
</script>

<template>
   <section id="top-message">

      <div>&emsp;</div>
      <div class="container" style="margin-bottom: 10px">
        <div class="main-title">GALLARY</div>
        <div class="text_icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 32 32">
              <g transform="scale(2)">
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
              </g>
            </svg>
        </div>


        <div class="main-text ">
          みんなで作るアルバム<br><br>

          お手持ちの思い出の写真を<br>
          下記ボタンからアップロード！<br>
          みなさん秘蔵のお写真をお待ちしております！<br>
          ※共有可能なお写真をお願いします<br>
        </div>
        <div class="scrolldown1"></div>

      </div>

     <div class="submit">
       <button
           @click="openUpload"
           class="upload-button"
           type="submit"
       >
         アップロード
       </button>
     </div>

     <div
         id="overlay" v-show="isOpened"
     >
       <input type="file" id="hidden-file-input" hidden @change="onChanged" multiple>

       <div class="image-preview">
         <div class="empty-image">
           <div style="margin-top: 200px">
             <img id="preview-image" src = "" alt="prev" v-show="isSelected" style="width:80%; height:auto">
             <span  v-show="!isSelected">画像を選択してください</span>
           </div>
         </div>
       </div>

       <div class="close-btn" >
         <button @click="onCanceled" class="submit-button" type="submit">
           キャンセル
         </button>
         <button @click="onSubmit" class="submit-button" type="submit">
           {{labelSubmit}}
         </button>
       </div>
     </div>

     <div class="filter-area">
       SORT<br>
       <span @click="showtaro=!showtaro">
         <filter-checkbox :checked="showtaro" :size="17"/>
         taro
       </span>
       <span style="padding-left: 30px"/>
       <span @click="showhanako=!showhanako">
         <filter-checkbox :checked="showhanako" :size="17"/>
         hanako
       </span>

     </div>

     <gallery-content :switch="mode"/>
  </section>

</template>

<style scoped lang="scss">
@import "src/assets/scss/variables.scss";

.filter-area {
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
}

.upload-button {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid $color-navy;
  font-size: 18px;
  width: 165px;
  padding: 3px 0;

  border-radius: 50px;
  color: $color-navy;
}

.empty-image {
  height: 300px;
  width: auto;
  text-align: center;
  vertical-align: middle;
}

.submit-button {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid $color-navy;
  font-size: 18px;
  margin: 0 10px;
  width: 30%;
  padding: 3px 0;

  border-radius: 50px;
  color: $color-navy;
}

.submit {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 50px;
}

.main-title{
  margin-top: 80px;
  margin-bottom: 10px;
}

.scrolldown1{
  position: relative;
  margin-top: 30px;
  left:0%;

  /*全体の高さ*/
  height:110px;

}
/* 線の描写 */
.scrolldown1::after{
  /*描画位置*/

  top: 0;
}
#close-icon {
  width: 32px;
  height: 32px;
}

#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:rgba(255, 255, 255, 0.9);
}

.close-btn {
  margin-top: 100px;
  text-align: center;
  align-items: flex-end;
}

.filter-area {}

.filter-checkbox{

}



</style>

