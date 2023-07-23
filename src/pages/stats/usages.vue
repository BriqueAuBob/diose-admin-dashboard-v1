<template>
  <div class="relative">
    <el-row justify="space-between" style="margin-bottom: 24px">
      <el-col :span="8">Nous avons trouvé {{ meta.total }} résultats</el-col>
      <el-col :span="4">
        <el-input
          v-model="form.search"
          @change="
            () => {
              page = 1;
              getUsages();
            }
          "
        />
      </el-col>
    </el-row>
    <div class="pt-12">
      <div style="height: 70vh; margin-bottom: 24px">
        <el-auto-resizer>
          <template #default="{ height, width }">
            <el-table-v2
              :data="usages"
              :columns="columns"
              :width="width"
              :height="height"
              fixed
            ></el-table-v2>
          </template>
        </el-auto-resizer>
      </div>
      <el-pagination
        :hide-on-single-page="true"
        background
        v-model:current-page="page"
        layout="prev, pager, next"
        :page-count="meta.last_page"
      />
    </div>
  </div>
</template>

<route lang="yaml">
name: "Utilisations des outils"
</route>

<script setup lang="jsx">
import { ref, reactive } from "vue";
import { onMounted, watch } from "@vue/runtime-core";
import { repeat } from "lodash";
import axios from "../../composables/axios";
import { ElTooltip, ElIcon } from "element-plus";
import { Timer } from "@element-plus/icons-vue";
import dayjs from "dayjs";

const usages = ref([]);
const meta = ref({});
const page = ref(1);
const form = reactive({
  search: "",
});
const columns = [
  {
    key: "tool",
    title: "Outil",
    dataKey: "tool",
    width: 150,
    align: "center",
  },
  {
    key: "name",
    title: "Nom d'utilisateur",
    dataKey: "author.username",
    width: 150,
    align: "center",
  },
  {
    key: "created_at",
    title: "Date d'utilisation",
    dataKey: "created_at",
    width: 150,
    align: "center",
    cellRenderer: ({ cellData: date }) => (
      <ElTooltip content={dayjs(date).format("YYYY/MM/DD à HH:mm:ss")}>
        {
          <span>
            <ElIcon>
              <Timer />
            </ElIcon>
            {dayjs(date).format("YYYY/MM/DD")}
          </span>
        }
      </ElTooltip>
    ),
  },
];

const getUsages = async () => {
  const { data } = await axios.get(
    `administration/usages?page=${page.value}&search=${form.search}`
  );
  usages.value = data.usages;
  meta.value = data.meta;
  console.log(usages);
};

onMounted(() => {
  getUsages();
});

watch(page, getUsages);
</script>
