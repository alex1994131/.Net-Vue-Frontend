<template>
  <v-card flat>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Registration successful!</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
        <v-row>
        
        
          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="department"
              :items="GetDepartments"
                 item-text="name"
              item-value="id"
              color="pink"
              label="مركزية الحوادث"
              required
            ></v-select>
          </v-col>

          
        
       
        </v-row>
         <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="statType"
              :items="getStatus"
              item-text="statusString"
              item-value="id"
              color="pink"
              label="الحالات"
              required
            ></v-select>
          </v-col>
           <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="form.favoriteAnimal"
              :items="animals"
              :rules="rules.animal"
              color="pink"
              label="حادث جديد"
              required
            ></v-select>
          </v-col>
           <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="form.favoriteAnimal"
              :items="animals"
              :rules="rules.animal"
              color="pink"
              label="حادث مغلق"
              required
            ></v-select>
          </v-col>
           <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="form.favoriteAnimal"
              :items="animals"
              :rules="rules.animal"
              color="pink"
              label=" تنبيه جديد"
              required
            ></v-select>
          </v-col>
           <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="form.favoriteAnimal"
              :items="animals"
              :rules="rules.animal"
              color="pink"
              label="تنبيه مغلق"
              required
            ></v-select>
          </v-col>
           <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="form.favoriteAnimal"
              :items="animals"
              :rules="rules.animal"
              color="pink"
              label="تنبيه متجاهل "
              required
            ></v-select>
          </v-col>
           <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="form.favoriteAnimal"
              :items="animals"
              :rules="rules.animal"
              color="pink"
              label="المهام"
              required
            ></v-select>
          </v-col>
         
      </v-container>
     
    </v-form>
   
  </v-card>
</template>


<script>
import { mapActions, mapGetters, mapState } from "vuex";
  export default {
    data () {
        
      const defaultForm = Object.freeze({
          
        first: '',
        
        last: '',
        bio: '',
        favoriteAnimal: '',
        age: null,
        terms: false,
      })

      return {
           statType: null,
           department: null,
        form: Object.assign({}, defaultForm),
        rules: {
          age: [
            val => val < 10 || `I don't believe you!`,
          ],
          animal: [val => (val || '').length > 0 || 'This field is required'],
          name: [val => (val || '').length > 0 || 'This field is required'],
        },
        animals: ['Dog', 'Cat', 'Rabbit', 'Turtle', 'Snake'],
        conditions: false,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.',
        snackbar: false,
        terms: false,
        defaultForm,
      }
    },

    computed: {
         ...mapGetters("departments", ["GetDepartments"]),
          ...mapGetters("StatusStore", ["getStatus"]),
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.favoriteAnimal &&
          this.form.terms
        )
      },
    },

    methods: {
         ...mapActions("departments", ["fetchDepartments"]),
          ...mapActions("StatusStore", ["fetchStatuses" ]),
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      },
    },
     created () {
    
     this.fetchDepartments();
      this.fetchStatuses();
  }
  }
</script>