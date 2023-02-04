import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        counter: 0,
        online: false,
        userName: '用户名',
        projectId: '',
        env:'prod',

    }),
    getters: {
        doubleCount: (state) => state.counter * 2,
        getLoginStatus: (state) => state.online,
        getVipLevel: (state) => state.VIPLevel == 0 ? '' : state.VIPLevel,
        getUserName: (state) => state.userName,
        getProjectId: (state) => state.projectId,

    },
    actions: {
        logout() { this.online = false },
        login () { this.online = true }
    }
})