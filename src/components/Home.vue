<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex" cols="12">
        <v-row justify="center">
          <v-btn class="my-3 mx-3" x-large router to="/meetups"
            >Explore Meetups</v-btn
          >

          <v-btn class="my-3 mx-3" x-large router to="/meetup/new"
            >Organize A Meetup</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row class="my-16" align="center" v-if="loading" justify="center">
          <v-progress-circular
            :size="200"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-row>

        <v-carousel
          cycle
          progress
          progress-color="red"
          interval="5000"
          continuous
          style="cursor:pointer;"
          show-arrows-on-hover
          v-if="!loading"
        >
          <v-carousel-item
            v-for="(meetup, i) in meetups"
            :key="i"
            :src="meetup.imageUrl"
            transition="slide-x-transition"
            @click="onLoadMeetup(meetup.id)"
            ><div class="title">{{ meetup.title }}</div></v-carousel-item
          >
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex" cols="12">
        <v-row justify="center">
          <p class="text-display">Join our awesome meetups</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push(`/meetups/${id}`);
    }
  }
};
</script>

<style>
.title {
  /* The carousel gives a relative position so is easy to position stuff inside */
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
  width: 100%;
}
</style>
