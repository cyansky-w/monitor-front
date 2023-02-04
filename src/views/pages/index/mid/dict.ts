import { reactive } from "vue"

const dict=reactive({
    "statusLisit":[{"name":"正常","value":0},{"name":"警告","value":1}],
    "envLisit":[{"name":"测试","value":"test"},{"name":"开发","value":"dev"},{"name":"生产","value":"prod"}]
})
export default dict