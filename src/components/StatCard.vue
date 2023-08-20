<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        default: 0,
    },
    tooltip: {
        type: String,
        required: false,
    },
    before: {
        type: Number,
        required: false,
    },
});

const percent = computed(() => {
    if (props.before !== undefined) {
        return Math.round(((props.value - props.before) / Math.max(props.before, 1)) * 100);
    }
    return 0;
});
</script>

<template>
    <div class="statistic-card">
        <el-statistic :value="value">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                    {{ title }}
                    <el-tooltip v-if="tooltip" effect="dark" :content="tooltip" placement="top">
                        <el-icon style="margin-left: 4px" :size="12">
                            <Warning />
                        </el-icon>
                    </el-tooltip>
                </div>
            </template>
        </el-statistic>
        <div class="statistic-footer" v-if="before !== undefined">
            <div class="footer-item">
                <span>Par rapport à la semaine dernière:</span>
                <el-tooltip :content="before.toString()" placement="top" effect="dark">
                    <span :class="percent < 0 ? 'red' : percent === 0 ? 'orange' : 'green'">
                        {{ percent }}%
                        <el-icon>
                            <CaretTop v-if="percent > 0" />
                            <CaretRight v-else-if="percent === 0" />
                            <CaretBottom v-else-if="percent < 0" />
                        </el-icon>
                    </span>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>
