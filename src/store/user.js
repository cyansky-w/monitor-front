import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        counter: 0,
        online: false,
        userName: '青空',
        env:'prod',
        projectList: [{
            projectId: 'awdafgawdfagrtdhgdrtg',
            name:'前端监控',
            env: 'dev',
            option: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
            timestamp:new Date('2023-1-1 13:23'),
            userInfo: [{
                name:"用户总数",
                value:1341
            },{
                name:"老用户",
                value:53
            },{
                name:"新用户",
                value:12
            }],
            activeUser: 2341,
            score: 90,
            healthInfo: [{
                name:"JS报错率",
                value:0.76
              },{
                name:"自定义异常率",
                value:0.03
              },{
                name:"接口报错率",
                value:1.25
              },{
                name:"静态资源错误率",
                value:2.43
            }]
        }],
        teamList:[{
            name: "前端监控",
            member: [{
                name: "依托答辩",
                email: "13071931265@163.com",
                role: "管理员",
                oprate: false
            },
            {
                name: "青空",
                email: "2502752775@qq.com",
                role: "成员",
                oprate: false
                
            },{
                name: "逗逗",
                email: "18757424924@qq.com",
                role: "成员",
                oprate: false
            }]
        }]
    }),
    getters: {
        doubleCount: (state) => state.counter * 2,
        getLoginStatus: (state) => state.online,
        getVipLevel: (state) => state.VIPLevel == 0 ? '' : state.VIPLevel,
        getUserName: (state) => state.userName,
        getProjectList: (state) => state.projectList,
        getTeamList: (state) => state.teamList,
        isOnline: (state) => state.online,
    },
    actions: {
        logout() { this.online = false },
        login () { this.online = true },
        addProject () {
            this.projectList.unshift({
                projectId: 'awdafgawdfagrtdhgdrtg',
                name: '客道互动',
                env: 'dev',
                option: [0,0,0,0,0,0,0],
                timestamp:new Date(),
                userInfo: [{
                    name:"用户总数",
                    value:0
                },{
                    name:"老用户",
                    value:0
                },{
                    name:"新用户",
                    value:0
                }],
                activeUser: 0,
                score: 100,
                healthInfo: [{
                    name:"JS报错率",
                    value:0
                  },{
                    name:"自定义异常率",
                    value:0
                  },{
                    name:"接口报错率",
                    value:0
                  },{
                    name:"静态资源错误率",
                    value:0
                }]
            })
        },
        addTeam () {
            this.teamList.unshift({
                name: "客道互动",
                member: [{
                    name: "青空",
                    email: "2502752775@qq.com",
                    role: "管理员",
                    oprate: false
                }]
            })
        }
    }
})