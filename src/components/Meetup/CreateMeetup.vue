<template>
  <v-container>
    <v-row cols="12">
      <v-col class="d-flex justify-center pb-0"
        ><p class="text-h4 mt-6">Create A New Meetup</p></v-col
      >
    </v-row>
    <v-row cols="12" sm="10">
      <v-col class="d-flex mx-auto justfy-center">
        <v-card class="px-6 pb-6 mx-auto" max-width="700" style="width: 100%;">
          <v-card-title>Add Meetup Details</v-card-title>
          <v-form @submit.prevent="onCreateMeetup">
            <v-text-field
              autofocus
              v-model="title"
              :counter="20"
              label="Meetup Title"
              required
              outlined
              hint="e.g. My Awesome Meetup"
            >
            </v-text-field>
            <!-- <v-switch v-model="useImageUrl" :label="imageTypeLabel"></v-switch> -->
            <v-radio-group
              v-model="useImageUrl"
              @change="checkImageType($event)"
              row
              mandatory
            >
              <v-radio label="Use Image Url" :value="true"></v-radio>
              <v-radio label="Upload Image File" :value="false"></v-radio>
            </v-radio-group>
            <v-text-field
              v-if="useImageUrl"
              v-model="imageUrl"
              label="Image Url"
              append-icon="mdi-link"
              class="mt-1"
              required
              hint="e.g. https://site.com/path/to/image.jpg"
              outlined
            >
            </v-text-field>
            <v-file-input
              v-else
              label="Upload Image"
              solo
              prepend-icon="mdi-camera"
              accept="image/*"
              @change="onFilePicked($event)"
            ></v-file-input>
            <div class="subheading" v-if="imageUrl">Image Preview</div>
            <v-img
              v-if="imageUrl"
              :src="imageUrl"
              :gradient="`to top right, ${color.value}EE, ${color.value}00`"
              aspect-ratio="1.7"
            ></v-img>
            <v-select
              :items="colors"
              append-icon="mdi-palette"
              outlined
              item-text="name"
              item-value="value"
              hint="Select A Theme color"
              v-model="color"
              return-object
              class="mt-3"
            >
              <v-icon slot="append" :color="`${color.value}`"
                >mdi-package</v-icon
              ><v-icon slot="append" :color="`${color.value}`"
                >mdi-invert-colors</v-icon
              >
            </v-select>
            <v-text-field
              v-model="location"
              label="Meetup Location"
              append-icon="mdi-google-maps"
              required
              outlined
              hint="e.g. Some City, Some Country, Earth"
            ></v-text-field>
            <v-textarea
              name="input-7-1"
              label="Meetup Description"
              hint="e.g. An awesome meetup. Free drinks yo!"
              outlined
              v-model="description"
              class="mt-1"
              append-icon="mdi-pencil"
            ></v-textarea>
            <v-card-title>Set the Date and Time</v-card-title>
            <v-card-subtitle
              ><span>{{ submitableDateTime }}</span></v-card-subtitle
            >
            <v-row justify="space-around">
              <v-date-picker class="mb-3" v-model="datePicker"></v-date-picker>
              <v-time-picker v-model="timePicker" format="24hr"></v-time-picker>
            </v-row>
            <v-btn
              class="primary"
              type="submit"
              :disabled="!formIsValid"
              block
              large
              :loading="loading"
              >Create Meetup</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import md5 from "md5-hash";

export default {
  data() {
    return {
      title: "",
      loading: false,
      creator: this.userDetails,
      creatorImage: this.userImage,
      imageUrl: null,
      description: "",
      location: "",
      datePicker: new Date().toISOString().substr(0, 10),
      timePicker: "00:00",
      image: null,
      useImageUrl: true,
      color: { name: "Dark Grey", value: "#282828" },
      colors: [
        { name: "Dark Grey", value: "#282828" },
        { name: "Blue", value: "#1e88e5" },
        { name: "Indigo", value: "#3949ab" },
        { name: "Pink", value: "#d81b60" },
        { name: "Red", value: "#e53935" },
        { name: "Purple", value: "#8e24aa" },
        { name: "Teal", value: "#00897b" },
        { name: "Cyan", value: "#00838f" }
      ]
    };
  },
  methods: {
    onCreateMeetup() {
      this.loading = true;
      let meetupData;
      if (this.useImageUrl) {
        meetupData = {
          useImageUrl: this.useImageUrl,
          title: this.title,
          location: this.location,
          description: this.description,
          imageUrl: this.imageUrl,
          color: this.color.value,
          date: this.submitableDateTime,
          creatorImage: this.creatorImage
        };
        console.log(meetupData);
      } else {
        if (!this.image) {
          return;
        }
        meetupData = {
          useImageUrl: this.useImageUrl,
          title: this.title,
          location: this.location,
          description: this.description,
          image: this.image,
          color: this.color.value,
          date: this.submitableDateTime,
          creatorImage: this.creatorImage
        };
        console.log(meetupData);
      }

      this.$store.dispatch("createMeetup", meetupData);
      setTimeout(() => {
        this.loading = false;
        this.$router.push("/meetups");
      }, 2000);
    },
    onFilePicked(file) {
      console.log(file);
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(file);
      this.image = file;

      // const files = event.target.files;
      // let fileName = files[0].filename;
      // console.log(fileName);
    },
    checkImageType(event) {
      console.log(event);
      // this.useImageUrl = event;
      console.log(typeof this.useImageUrl, this.useImageUrl);
    }
  },
  computed: {
    imageTypeLabel() {
      return this.useImageUrl ? "Use Image Url" : "Upload Image File";
    },
    formIsValid() {
      return (
        this.title !== "" &&
        this.imageUrl !== "" &&
        this.location !== "" &&
        this.description !== ""
      );
    },
    userDetails() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    },
    submitableDateTime() {
      const date = new Date(this.datePicker);

      if (typeof this.timePicker === "string") {
        console.log("string", this.timePicker, date);
        console.log(this.$store.getters.user);
        let hours = this.timePicker.match(/^(\d+)/)[1];
        let minutes = this.timePicker.match(/:(\d+)/)[1];

        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        console.log("date", this.timePicker, date);
        date.setHours(this.timePicker.getHours());
        date.setMinutes(this.timePicker.getMinutes());
      }
      console.log(date);
      return date;
    },
    userImage() {
      const gravatar = md5(this.$store.getters.user.email.trim().toLowerCase());
      return `https://www.gravatar.com/avatar/${gravatar}`;
    }
  }
};
</script>

<style></style>
