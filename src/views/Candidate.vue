<template>
    <div class="admin-dashboard">
        <v-main>
            <v-container class="py-2 px-2" fluid>
                <v-subheader class="d-flex justify-space-between align-center">
                    <h3>Dashboard</h3>
                    <!-- <v-btn class="rounded-lg" color="success" >
            Add candidate
        </v-btn> -->
                    <div>
                        <v-btn class="rounded-lg" color="success" @click="openLinkedInDialog">Go to LinkedIn Job
                            Posting</v-btn>
                    </div>
                    <div>
                        <v-btn class="rounded-lg" color="primary" @click="openPlatformDialog">Add Platform</v-btn>
                    </div>

                </v-subheader><br>
                <div class="platform-buttons">
                    <v-btn v-for="platform in platforms" :key="platform.platFormID" class="rounded-lg platform-button"
                        color="primary" @click="redirectToPlatform(platform)">
                        {{ platform.platFormName }}
                    </v-btn>
                </div>
                <v-data-table caption="test" v-model:sort-by="sortBy" :headers="headers" :items="items" class="elevation-1">
                    <template v-slot:item.status="{ item }">
                        <v-chip :color="getStatusColor(item.columns.status)" small>
                            {{ item.columns.status }}
                        </v-chip>
                    </template>
                    <template #item.actions="{ item }">
                        <v-btn color="primary" @click="openDialog(item)">
                            Action
                        </v-btn>
                    </template>
                </v-data-table>
                <candidate-dialog ref="candidateDialog" :inputJson="jsonData" :dialogItem="dialogItem" />
                <platform-dialog ref="PlatformDialog" @platform-submitted="handlePlatformSubmitted"></platform-dialog>
            </v-container>
        </v-main>
    </div>
</template>
  
<script>
import CandidateDialog from './CandidateDialog.vue';
import PlatformDialog from './PlatformDialog.vue';
import { fetchRecruitmentList, fetchRecruitmentById, fetchPlatFormList } from '@/services/ApiService';


export default {
    components: {
        CandidateDialog,
        PlatformDialog
    },
    mounted() {
        // Fetch data from the API when the component is mounted
        this.fetchRecruitmentList();
        this.fetchPlatFormList();
    },
    data() {
        return {
            items: [],
            dialogItem: [],
            platforms: [],
            headers: [
                { title: 'ID', key: 'cn_id' },
                { title: 'Status', key: 'status' },
                { title: 'Name', key: 'full_name' },
                { title: 'Email', key: 'email' },
                { title: 'Nationality', key: 'nationality' },
                { title: 'Phone Number', key: 'tel_number' },
                { title: 'Japanese Proficiency', key: 'japanese_proficiency_test' },
                { title: 'Status Of Residence', key: 'status_of_residence' },
                { title: 'interview_result', key: 'interview_result' },
                { title: 'Name', key: 'actions', sortable: false }
            ],
            jsonData: []
        };
    },
    methods: {
        async fetchRecruitmentList() {
            try {
                const data = await fetchRecruitmentList();
                this.items = data['body'];
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async openDialog(item) {
            this.dialogItem = item.columns;

            // Check if dialogItem is defined and contains the necessary properties
            try {
                const data = await fetchRecruitmentById(item.columns);
                this.jsonData = []
                this.jsonData.push(data)
            } catch (error) {
                console.error('Error:', error);
            }

            this.$refs.candidateDialog.dialog = true;
            // You can also pass the item to the dialog component if needed
            this.$refs.candidateDialog.item = item;
        },
        async fetchPlatFormList() {
            try {
                const data = await fetchPlatFormList();
                this.platforms = data['body'];
            } catch (error) {
                console.error('Error:', error);
            }
        },
        getStatusColor(status) {
            // Define colors for different status values
            switch (status) {
                case 'Pending':
                    return 'orange';
                case 'In Progress':
                    return 'blue';
                case 'Ongoing':
                    return 'green';
                default:
                    return 'grey';
            }
        },
        openLinkedInDialog() {
            const linkedInJobPostingUrl = "https://www.linkedin.com/job-posting/?trk=flagship3_job_home";
            window.open(linkedInJobPostingUrl, "LinkedInJobPosting", "width=800,height=600");
        },
        openPlatformDialog() {
            this.$refs.PlatformDialog.dialogVisible = true;
            this.platformDialog = true;
        },
        redirectToPlatform(platform) {
            window.location.href = platform.platFormURL;
        },
        handlePlatformSubmitted(platformData) {
            this.platforms.push(platformData);
        },
    }
};
</script>

<style scoped>
.platform-buttons {
    display: flex;
    gap: 10px;
}

.platform-button {
    flex: 1;
}
</style>