<script>
  import Auth from '../SubComponenet/AuthorizationChacker'
  import vue from 'vue';
  export default {
    methods:{
methodThatForcesUpdate () {
      // ...
      this.$forceUpdate();
      // ...
    }
    },
    data (){
      return {
      }
    },
    created()
    {

    localStorage.removeItem('token');
    localStorage.removeItem('userRef');
    localStorage.removeItem('claims');
    localStorage.setItem('isLoggedOut',true);
    this.$router.push("/");

    }
  }
</script>