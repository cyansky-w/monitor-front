import { defineStore } from 'pinia'

export const useProjectStore = defineStore({
    id: 'project',
    state: () => ({
        projectId: 'awdafgawdfagrtdhgdrtg',
        env: 'dev',
        timestamp:new Date(),
        name: "客道互动",
        createTime:new Date(),
        teamName: '客道互动',
        online:false
    }),
    getters: {
        getProjectId : ( state ) => state.projectId,
        getTimestamp : ( state ) => state.timestamp,
        getEnv : ( state ) => state.env,
        getInfo: (state) => ({...state}) 
    },
    actions: {
        setProjectId ( projectId ) { this.projectId = projectId },
        setTimestamp ( timestamp ){
            console.log('timestamp', timestamp)
            this.timestamp = timestamp 
        },
        setEnv ( env ) { this.env = env },
        selectProject() { this.online = true },
    }
})