<template>
  <v-card height="580" class="ma-4 mb-6">
    <v-card-title v-text="title"></v-card-title>
    <v-toolbar
        flat
    >
      <v-btn color="#6A5ACD" class="mt-1 ml-1 white--text" @click="createSection">
        <v-icon>mdi-plus</v-icon>
        创建版块
      </v-btn>
    </v-toolbar>
    <v-row no-gutters justify="center">
      <v-col>
        <v-data-table
            :headers="headers"
            :items="sectionInfo"
            class="elevation-1 px-5"
            hide-default-footer
            height="460"
        >
          <template v-slot:[`item.sectionAvatar`]="{ item }">
           <v-avatar class="my-2"><img
               alt="Avatar"
               :src=item.sectionAvatar
           ></v-avatar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on">
                <v-icon
                    @click="stepToSection(item)"
                >
                  mdi-location-enter
                </v-icon>
              </v-btn>
              </template>
              <span>进入版块</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on">
                <v-icon
                    @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                </v-btn>
              </template>
              <span>编辑信息</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <CreateSection
        :showSectionDialog="this.showSectionDialog"
        @callBack_1="callBack_1"
        @submit_1="submit_1"
    >
    </CreateSection>
    <EditSection
        :showEditDialog="this.showEditDialog"
        :Intro="item.sectionIntro"
        :SubsectionList="item.subSectionList"
        :SectionId="item.sectionId"
        @callBack_2="callBack_2"
        @submit_2="submit_2"
    >
    </EditSection>
  </v-card>
</template>

<script>
import CreateSection from "@/views/home/account/components/CreateSection";
import {get_user_sections} from "@/api/account";
import EditSection from "@/views/home/account/components/EditSection";
export default {
  name: "AccountSection",
  components: {EditSection, CreateSection},
  data(){
    return {
      title:"我的版块",
      showSectionDialog: false,
      showEditDialog: false,
      headers: [
        {
          text: '版块名',
          align: 'start',
          sortable: false,
          value: 'sectionName',
        },
        { text: '版块头像', value: 'sectionAvatar', sortable: false },
        { text: '收藏人数', value: 'userCounts', sortable: false },
        { text: '帖子数量', value: 'postCounts', sortable: false },
        { text: '版块操作', value: 'actions', sortable: false },
      ],
      item:[],
      sectionInfo:[],
      postId:0,
      control:false,
      showConfirm:false,
      valid: true,
      isEdit:false,
    }
  },
  methods:{
    createSection(){
      this.showSectionDialog = !this.showSectionDialog
    },
    editItem(item){
      console.log(item)
      this.showEditDialog = !this.showEditDialog
      this.item = item
    },
    callBack_1(flag){
      this.showSectionDialog  = flag
    },
    callBack_2(flag){
      this.showEditDialog  = flag
    },
    submit_1(flag){
      this.showSectionDialog = flag
      window.location.reload();
    },
    submit_2(flag){
      this.showEditDialog = flag
      window.location.reload();
    },
    closeConfirm(flag){
      this.showConfirm = flag
      window.location.reload();
    },
    stepToSection(item){
      this.$router.push({path: '/section/'+ item.sectionId, params:{id:item.sectionId}})
    },
  },
  mounted() {
    get_user_sections()
        .then(res => {
      if(res.code === 20000){
        console.log("获取用户版块信息成功")
        this.sectionInfo = res.data.sectionInfo
      }
      else{
        console.log(res.msg)
        this.$message.error("用户版块信息获取失败！")
      }
    })
        .catch((err) => console.log("error: " + err));
  }
}
</script>

<style scoped>
.lead{
  margin-top:7px
}
.v-text-field{
  width:45px;
  height:20px;
  margin-left: 8px;
  margin-right: 8px
}
.goBtn{
  margin-left:10px
}
</style>