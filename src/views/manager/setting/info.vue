<template>
      <LoadingMask :show="loadingFlag" />

  <el-tabs
          v-model="activeName"
          class="set-tabs"
        >
          <el-tab-pane label="基本信息" name="base" class="base-form">

            <el-form :model="personalInfo" label-width="120px">
              <el-form-item label="用户名">
                <label>{{ personalInfo.userName }}</label>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="personalInfo.nickName"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group
                  v-model="personalInfo.sex"
                >
                  <el-radio label="男" />
                  <el-radio label="女" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker v-model="personalInfo.birthday" type="date" />
              </el-form-item>
            </el-form>
            <div class="btn-box">
              
            <CyanButton style="margin-right:20px">提交</CyanButton>
            <CyanButton style="margin-right:20px" @click="logout">退出登录</CyanButton>
            <CyanButton style="margin-right:20px">注销</CyanButton>
            <CyanButton style="margin-right:20px"  @click="joinDialogVisible = true">加入团队</CyanButton>
            <CyanButton @click="createDialogVisible = true">创建团队</CyanButton>
            </div>
          </el-tab-pane>
          <el-tab-pane label="头像照片" name="head">
            <div class="head-form">
            <el-row class="upload-box clearfix">
              <el-col :span="8" class="upload-container">
                  <div class="upload-title">头像上传</div>
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-col>
              <el-col :span="16">
                <div class="head-recommend">
                  <div class="recommend-title">头像推荐</div>
                  <el-row>
                    <el-col :span="3" v-for="pic in 16" :key="pic" class="recommend-container" @click="checkImg(pic)">
                      <img
                        :src="'/src/assets/img/head/' + pic+'.jpg'"
                        class="recommend-pic"
                        :class="{'active':pic==0}"
                      />
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <div class="head-preview">
              <div class="preview-title">效果预览</div>
              <div class="preview-note">
                你上传的图片会自动生成2种尺寸，请注意小尺寸的头像是否清晰
              </div>
              <img :src="imageUrl" class="preview-100" />
              <span>100像素*100像素</span>
              <img :src="imageUrl" class="preview-50" />
              <span>50像素*50像素</span>
            </div>
            </div>
                <CyanButton >提交</CyanButton>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
                v-model="joinDialogVisible"
                title="加入团队"
                width="30%"
                :before-close="handleClose"
            >
            <div class="input-box">
              <input
                id="login_name"
                type="text"
                maxlength="6"
                class="input-verify"
                placeholder="请输入邀请码"
                v-model="verificationCode"
                @input="checkNUm"
              />
              <button class="btn btn-verify">加入团队</button>
            </div>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="joinDialogVisible = false">取消</el-button>
                </span>
                </template>
            </el-dialog>

            <el-dialog
                v-model="createDialogVisible"
                title="创建团队"
                width="30%"
                :before-close="handleClose"
            >
            <div class="input-box">
              <input
                id="login_name"
                type="text"
                maxlength="6"
                class="input-verify"
                placeholder="请输入团队名称"
                v-model="verificationCode"
                @input="checkNUm"
              />
              <button class="btn btn-verify" @click="createTeam">创建团队</button>
            </div>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="createDialogVisible = false">取消</el-button>
                </span>
                </template>
            </el-dialog>
            
</template>

<script setup>
import CyanButton from "@/components/CyanButton/index.vue";
import LoadingMask from "@/components/LoadingMask/index.vue";
import { ElMessage } from 'element-plus'
import { reactive, ref } from "vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const activeName = ref("base");
let personalInfo = reactive({
  userName: '青空',
  nickName: "败家圣手",
  sex: "男",
  birthday: new Date(),
  vipLevel: 3,
  headPhoto: "/src/assets/img/head/1.jpg",
});
let imageUrl=ref('/src/assets/img/head/1.jpg')
function checkImg(index){
  imageUrl.value=`/src/assets/img/head/${index}.jpg`
}

const joinDialogVisible = ref(false)
const createDialogVisible = ref(false)
let loadingFlag = ref(false);
function showLoading() {
  loadingFlag.value = true;
}
function hideLoading() {
  loadingFlag.value = false;
}

function createTeam(){
  showLoading()
  createDialogVisible.value = false
  setTimeout(() => {
    userStore.addTeam();
    hideLoading(),
    ElMessage({
      message: '创建成功',
      type: 'success',
    })
  },1000)
}

function logout(){
  userStore.logout()
}
</script>

<style scoped lang="scss">
.btn-box{
  padding:30px 100px;
}
.btn-form{
  padding: 0 !important;
}
.set-tabs{
  text-align:left;
}
.set-account{
  padding: 20px 0;
}
.security-container{
  padding: 10px;
}
[class^='account-icon'] {
    display: block;
    width: 84px;
    height: 70px;
    margin: 0 auto 25px;
    background-repeat: no-repeat;
    background-image: url(//misc.360buyimg.com/user/myjd/safe/auth/rubik/2.0.34/css/i/auth-index-ico.png);
    overflow: hidden;
}
[class^='account-icon2'] {
    margin: 25px auto 27px;
    width: 58px;
    height: 46px;
    background-position: 50%;
    background-image: url(//misc.360buyimg.com/user/myjd/safe/auth/rubik/2.0.34/css/i/auth-index-ico.png);
}
.account-icon-phone{
    background-position: 0 0;
}
.account-icon-password{
    background-position: 0 -80px;
}
.account-icon2-quit{
    background-position: -185px -224px;
}
.account-icon2-cancle{
    background-position: -185px 0;
}
.account-title{
  font-size :24px;
  margin-bottom: 20px;
}
.account-describe{
  color: #777;
  margin-bottom: 25px;
}
.upload-container{
  border-right: 1px solid #004dda;
}
.address-info{
  padding-left: 20px;
}
.address-list{
  padding-top: 10px;
}
.account-set-container {
  width: 100%;
  max-width: 1220px;
  margin: 50px auto;
}
.set-aside {
  text-align: left;
}
.set-main{
  background: white;
  padding: 10px 30px ;
}
.aside-th {
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5em;
}
.aside-td {
  color: #555;
  font-size: 16px;
  line-height: 1.2em;
  &:hover {
    color: #004dda;
    cursor: pointer;
  }
}
.td-oncheck{
  color: #004dda;
}
.base-form {
  width: 50%;
  padding-top: 20px;
  padding-bottom: 30px ;
}
.head-form{padding: 30px 0;}
.avatar-uploader {
  width: 80%;
  height: 80%;
  padding-top: 5px;
  display: inline-block;
}
.avatar-uploader .avatar {
  width: 160px;
  height: 160px;
  display: block;
}
.avatar-uploader ::v-deep .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader ::v-deep .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
}
.upload-box {
  height: 250px;
  line-height: 2em;
}
.head-preview {
  text-align: left;
}
.preview-100,.preview-50{
  box-sizing: content-box;
  padding-left: 20px;
  padding-right: 5px;
}
.preview-100 {
  width: 100px;
  height: 100px;
}
.preview-50 {
  width: 50px;
  height: 50px;
}
.preview-title {
  padding-top: 10px;
}
.preview-note {
  color: #aaa;
  padding: 10px 0;
}
.head-recommend {
  padding-left: 15px;
  padding-bottom: 20px;
  text-align: left;
  box-sizing: border-box;
}
.recommend-container{
  padding-right: 15px;
  padding-top: 10px;
}
.recommend-pic{
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid transparent;
  &:hover{
  border: 2px solid #004dda;
  }
  &.active{
  border: 2px solid #004dda;
  }
}
.recommend-title,.upload-title{
  text-align: left;
  padding: 10px;
}
.set-address{
  text-align: left;
  padding: 20px 0;
}
.security-card{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    border: 1px solid  #004dda;
}
</style>