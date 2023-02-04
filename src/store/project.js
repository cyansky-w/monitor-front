import { defineStore } from 'pinia'

export const useProjectStore = defineStore({
    id: 'project',
    state: () => ({
        projectId: 'awdafgawdfagrtdhgdrtg',
        env: undefined,
        timestamp:new Date(),
    }),
    getters: {
        getProjectId : ( state ) => state.projectId,
        getTimestamp : ( state ) => state.timestamp,
        getEnv : ( state ) => state.env,
    },
    actions: {
        setProjectId ( projectId ) { this.projectId = projectId },
        setTimestamp ( timestamp ){ this.timestamp = timestamp },
        setEnv ( env ) { this.env = env },
    }
})