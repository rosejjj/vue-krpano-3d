<template>
    <div class="edit">
        <div style="margin-bottom: 20px;">
            <el-radio-group v-model="editType">
                <el-radio-button v-for="item in typeList" :label="item.id" :key="item.id">
                    {{ item.name }}
                </el-radio-button>
            </el-radio-group>
        </div>
        <div v-show="editType == 1">
            <el-button @click="addHost" size="small" type="primary">添加热点</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '哈啊哈',
            editType: '', //当前选择类型
            typeList: [
                {
                    id: 1,
                    name: '热点',
                },
                {
                    id: 2,
                    name: '视角',
                },
                {
                    id: 3,
                    name: '水平偏移',
                },
            ],
        }
    },
    methods: {
        //添加热点
        addHost() {},
        //测试方法
        show(a) {
            console.log('真香', this.text, a)
        },
    },
    mounted() {
        setTimeout(() => {
            this.previewKrpano = document.querySelector('#krpanoSWFObject')
            this.previewKrpano.set('hotspot[xiang].onclick', this.show.bind(this, 1))
        }, 2000)
    },
}
</script>

<style lang="scss" scoped>
.edit {
    padding-top: 10px;
    width: 280px;
}
</style>
