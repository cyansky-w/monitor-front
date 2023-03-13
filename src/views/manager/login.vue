<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-content">
        <div class="login-statement iconfont">
          &#xe783;青空不会以任何理由要求您汇款，谨防诈骗
        </div>
        <div class="login-box" :class="{'hidden':isRegister || isForget,'login-box-hidden':isRegister || isForget}">
          <div class="login-tab">
          <div @click="accountLogin = true" :class="{ active: accountLogin }">
            账户登录
          </div>
          <div @click="accountLogin = false" :class="{ active: !accountLogin }">
            验证码登录
          </div>
        </div>
        <div class="login-form">
          <div class="login-account" v-if="accountLogin">
            <div class="input-box">
              <label for="login_name" class="iconfont account-icon"
                >&#xe735;</label
              >
              <input
                id="login_name"
                type="text"
                class="input-account"
                placeholder="请输入手机/用户名/邮箱"
              />
              <button class="iconfont icon-clear icon-xmark"></button>
            </div>
            <div class="input-box">
              <label for="login_name" class="iconfont account-icon"
                >&#xe9e2;</label
              >
              <input
                id="login_name"
                type="password"
                class="input-account"
                placeholder="请输入密码"
              />
              <button class="iconfont icon-clear icon-xmark"></button>
            </div>
            <div class="login-operation">
              <button @click="isForget = true">忘记密码?</button>
            </div>
          </div>
          <div class="login-verify" v-else>
            <div class="input-box">
              <label for="login_name" class="iconfont verify-icon"
                >+86</label
              >
              <input
                id="login_name"
                type="text"
                class="input-account"
                placeholder="请输入手机号"
                v-model="phone"
                @input="checkNUm"
              />
              <button class="iconfont icon-clear icon-xmark"></button>
            </div>
            <div class="input-box">
              <input
                id="login_name"
                type="text"
                maxlength="6"
                class="input-verify"
                placeholder="请输入验证码"
                v-model="verificationCode"
                @input="checkNUm"
              />
              <button class="btn-verify">获取验证码</button>
            </div>
          </div>
        </div>
        </div>
        <div class="register-box" :class="{'hidden':!isRegister && ! isForget,'register-box-hidden':!isRegister && ! isForget}">
          <div class="register-tab">
            <div>
              {{ isRegister ? '用户注册' : '找回密码' }}
            </div>
          </div>
          <div class="register-form">
            <div class="input-box" @click="clearValue">
              <label for="login_name" class="iconfont verify-icon"
                >+86</label
              >
              <input
                id="login_name"
                type="text"
                class="input-account"
                placeholder="请输入手机号"
                v-model="phone"
                @input="checkNUm"
              />
              <button class="iconfont icon-clear icon-xmark"></button>
            </div>
            <div class="input-box">
              <input
                id="login_name"
                type="text"
                maxlength="6"
                class="input-verify"
                placeholder="请输入验证码"
                v-model="verificationCode"
                @input="checkNUm"
              />
              <button class="btn btn-verify">获取验证码</button>
            </div>
            <div class="input-box" @click="clearValue">
              <label for="login_name" class="iconfont account-icon"
                >&#xe9e2;</label
              >
              <input
                id="login_name"
                type="password"
                class="input-account"
                placeholder="请输入密码"
              />
              <button class="iconfont icon-clear icon-xmark"></button>
            </div>
            <div class="input-box" @click="clearValue">
              <label for="login_name" class="iconfont account-icon"
                >&#xe9e2;</label
              >
              <input
                id="login_name"
                type="password"
                class="input-account"
                placeholder="确认密码"
              />
              <button class="iconfont icon-clear icon-xmark"></button>
            </div>
          </div>
        </div>
        <div class="login-submit" >
          <button @click="login"></button>
                <CyanButton class="btn-login" :disabled="!agreeCase" @click="login">{{isRegister?'注册':  isForget ? '确认' : '登录'}}</CyanButton>
                <el-checkbox v-model="agreeCase" size="small">
                    <span>我已阅读并同意<button>服务条款</button>、<button>隐私政策</button></span>
                </el-checkbox>
            </div>
            <div class="btn-switch">
              <button v-if="isRegister || isForget" class="iconfont icon-left-circle"  @click="isRegister = false; isForget = false">返回登录</button>  
              <button v-else class="iconfont icon-right-circle"  @click="isRegister = true">立即注册</button>  
            </div>
      </div>
    </div>
  </div>
  <CyanFooter/>

</template>

<script setup>
import CyanButton from "@/components/CyanButton/index.vue";
import CyanFooter from "@/components/CyanFooter/index.vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { ref,computed } from "vue";
const userStore=useUserStore();
const router=useRouter();
let accountLogin = ref(true);
let phone=ref('');
let verificationCode=ref('');
let agreeCase=ref(false);
let isRegister=ref(false)
let isForget=ref(false)
function checkNUm(event){
    event.target.value=event.target.value.replace(/[^\d]/g, '')
}


function clearValue(el){
  if(el.target.tagName=="BUTTON"){
    console.log(el.path[1].children[1].value='')
  }

}
function login(){
  console.log('----------')
  userStore.login();
  router.push({ name: 'index'})
  
}
</script>

<style scoped lang="scss">

.login-bg {
  background-image: url("/src/assets/img/login_bg.jpg");
  height: calc(100vh - 61px);
  background-size: cover;
}
.login-container {
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  position: relative;
  height: 100%;
}
.login-content {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 35%;
  background: rgb(251, 253, 255);
  overflow: hidden;
}
.login-box{
  transition: all 0.3s;
}
.login-box-hidden{
  transform: translateX(-100%);
  position: absolute;
}
.hidden{
  opacity: 0;
  visibility: hidden;
}
.register-box{
  transition: all 0.3s;
}
.register-box-hidden{
  transform: translateX(100%);
  position: absolute;
}
.login-statement {
  background: rgba(0, 77, 218, 0.05);
  text-align: center;
  line-height: 3em;
  font-size: 12px;
  color: grey;
}
.login-tab,.register-tab {
  font-size: 16px;
  padding: 20px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 77, 218, 0.2);
  div {
    display: inline-block;
    text-align: center;
    width: 50%;
    color: rgb(0, 77, 218);
    cursor: pointer;
    box-sizing: border-box;
  }
  div:not(:last-child) {
    border-right: 1px solid rgba(0, 77, 218, 0.2);
  }
  div:hover {
    color: #ffc107;
  }
  .active {
    color: #ffc107;
  }
}

.login-form,.register-form {
  padding-top: 50px;
}
.login-account,.login-verify,.register-form {
  width: 80%;
  margin: 0 auto;
}
.input-account {
  width: 100%;
  background: rgb(242, 242, 242);
  padding: 13px 3em;
  box-sizing: border-box;
  border-radius: 5px;
}
.input-verify{
  width: 100%;
  background: rgb(242, 242, 242);
  padding: 13px;
  box-sizing: border-box;
  border-radius: 5px;
}
.input-box {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}
.account-icon {
  font-size: 16px;
  color: rgba(0, 77, 218, 0.5);
  position: absolute;
  left: 1em;
  top: 50%;
  transform: translateY(-50%);
}
.verify-icon{
  font-size: 14px;
  color: rgba(0, 77, 218, 0.5);
  position: absolute;
  left: .5em;
  top: 50%;
  transform: translateY(-50%);
}
.icon-clear,.btn-verify {
  cursor: pointer;
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 77, 218, 0.5);
}
.btn-verify:hover{
    color: #ffc107;
}
.login-operation {
  text-align: right;
  button {
    cursor: pointer;
    padding: 5px;
  }
  button:hover {
    color: #ffc107;
  }
}
.login-submit{
    width: 60%;
    margin: 0 auto;
    padding: 30px 0;
    text-align: left;
}
.btn-login{
    width: 100%;
    padding: 13px 0;
}
.visible {
  visibility: visible;
  opacity: 1;
}
.btn-switch{
  padding: 15px ;
  background:  rgba(0, 77, 218, 0.05);
  text-align: right;
  button{
    color: rgb(0, 77, 218);
    cursor: pointer;
  }
  button:hover{
    color: #ffc107;
  }
}
button{
  border: none;
  background: none;
}
input{
  border: none;
}
</style>