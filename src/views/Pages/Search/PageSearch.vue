<template>
<v-row>
  
</v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { PERMISSION } from "../../../helpers/constants";
import moment from "moment";
export default {
  components: {
    Tags: () => import("../SubComponenet/TagsSC"),
  },
  data() {
    return {
      name: "SEARCH",
 

    };
  },
  computed: {
    ...mapGetters("incidents", ["getUrgancy", "getSver", "getCat", "getfile"]),
    getOperations() {
      return PERMISSION.NOTIFICATIONS.ADD.name;
    },
  },

  methods: {
    ...mapActions("search", ["processSearch"]),
    tagsHandler(tags) {
        
    },

  },
  created() {
    this.fetchSectors();
    this.fetchData();
    this.fetchOrganizations();
  },
};
</script>

