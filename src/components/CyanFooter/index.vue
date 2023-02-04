<template>
  <footer>
    <div>
      <el-row>
        <el-col :span="6">
          <ul class="data-list">
            <li class="title">
              <span>QUICK LINKS</span>
            </li>
            <li>
              <button>
                Faq
                <i class="iconfont icon-arrowright" />
              </button>
            </li>
            <li>
              <button>Help<i class="iconfont icon-arrowright" /></button>
            </li>
            <li>
              <button>My account<i class="iconfont icon-arrowright" /></button>
            </li>
            <li>
              <button>Blog<i class="iconfont icon-arrowright" /></button>
            </li>
            <li>
              <button>Contacts<i class="iconfont icon-arrowright" /></button>
            </li>
          </ul>
        </el-col>
        <el-col :span="6">
          <ul class="data-list">
            <li class="title">
              <span>CATEGORIES</span>
            </li>
            <li>
              <button>
                Clothes
                <i class="iconfont icon-arrowright" />
              </button>
            </li>
            <li>
              <button>Electronics<i class="iconfont icon-arrowright" /></button>
            </li>
            <li>
              <button>Furniture<i class="iconfont icon-arrowright" /></button>
            </li>
            <li>
              <button>Shoes<i class="iconfont icon-arrowright" /></button>
            </li>
            <li>
              <button>Watches<i class="iconfont icon-arrowright" /></button>
            </li>
          </ul>
        </el-col>
        <el-col :span="6">
          <ul class="data-list">
            <li class="title">
              <span>CONTACTS</span>
            </li>
            <li>
              <button>
                <i
                  class="iconfont icon-phone"
                  style="font-size: 24px"
                />+8613071931265
              </button>
            </li>
            <li>
              <button>
                <i
                  class="iconfont icon-mail"
                  style="font-size: 24px"
                />w13071931265@163.com
              </button>
            </li>
          </ul>
        </el-col>
        <el-col :span="6">
          <ul class="data-list">
            <li class="title">
              <span>KEEP IN TOUCH</span>
            </li>
            <li>
              <el-input v-model="input1" placeholder="Your E-mail">
                <template #append ><el-button class="iconfont">&#xe863;</el-button></template>
              </el-input>
            </li>
          </ul>
          <ul class="data-list" style="margin-top:35px">
              <li class="title">
              <span>Follow Us</span>
            </li>
            <li class="btn-item">
            <button><img src="@/assets/img/footer/twitter_icon.svg" alt="" class=""></button>
            </li>
            <li class="btn-item">
            <button><img src="@/assets/img/footer/facebook_icon.svg" alt="" class=""></button>
            </li>
            <li class="btn-item">
            <button><img src="@/assets/img/footer/instagram_icon.svg" alt="" class=""></button>
            </li>
            <li class="btn-item">
            <button><img src="@/assets/img/footer/youtube_icon.svg" alt="" class=""></button>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"></el-col>
        <el-col :span="12"></el-col>
      </el-row>
       <hr/>
       <p style="font-size: 12px;text-align: center;"><button style="color:white">Powered By CyanSky</button></p >
    </div>
         
  </footer>
</template>

<script setup>
import CyanButton from "@/components/CyanButton/index.vue"
</script>

<style scoped lang="scss">
button{
  background-color: transparent;
  border: none;
}
footer {
  background: #172134;
  width: 100%;
  color: white;
  padding: 60px 0 30px 0;
  > div {
    max-width: 1220px;
    margin: 0 auto;
  }
}
.title {
  font-size: 16px;
  margin-bottom: 15px;
  color: #fff;
  text-transform: uppercase;
}
.data-list {
  text-align: left;
  li:not(:first-child) {
    >button {
      font-size: 14px;
      color: inherit;
      position: relative;
      opacity: 0.8;
      display: inline-block;
      transition: all 0.3s;
      margin-bottom: 10px;
      .iconfont {
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s;
      }
    }
    >button:hover {
      opacity: 1;
      margin-left: 10px;
      .iconfont {
        transition: all 0.3s;
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .btn-item{
      display: inline-block;
      margin-right: 15px;
      button{
          img{
          width: 30px;
          height: 30px;
      }
      }
  }
}
    
    footer hr {
        border-color: rgba(255, 255, 255, 0.15);
        margin: 20px 0;
    }
</style>