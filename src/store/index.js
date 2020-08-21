import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        title: "Munich Meetup",
        id: 1,
        description: "lorem ipsum dolor sit amet",
        date: new Date(),
        color: "#1F7087",
        postedBy: "Foster the People"
      },
      {
        imageUrl: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        title: "Berlin Meetup",
        id: 2,
        description: "lorem ipsum dolor sit amet",
        date: new Date(),
        color: "#282828",
        postedBy: "Ellie Goulding"
      },
      {
        imageUrl: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        title: "London Meetup",
        id: 3,
        description: "lorem ipsum dolor sit amet",
        date: new Date(),
        color: "#385F73",
        postedBy: "Super Boy"
      },
      {
        imageUrl: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        title: "Paris Meetup",
        id: 4,
        description: "lorem ipsum dolor sit amet",
        date: new Date(),
        color: "#952175",
        postedBy: "Jack the Nice guy"
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        registeredMeetups: [],
        email: payload.email
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    loadMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              location: obj[key].location,
              color: obj[key].color,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            });
          }
          commit("setLoadedMeetups", meetups);
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    createMeetup({ commit, getters }, payload) {
      if (payload.useImageUrl) {
        const meetup = {
          title: payload.title,
          location: payload.location,
          imageUrl: payload.imageUrl,
          description: payload.description,
          date: payload.date
            ? payload.date.toISOString()
            : Date.now().toString(),
          color: payload.color,
          creatorId: getters.user.id
          // id: payload.id ? payload.id : Date.now()
        };
        // NOTE: that you should run async code only in actions
        // NOTE: the collection doesn't have to exist yet
        // NOTE: you can remove the id property coz fb creates that automatically
        firebase
          .database()
          .ref("meetups")
          .push(meetup)
          .then((data) => {
            const key = data.key;
            console.log(data);
            commit("createMeetup", {
              ...meetup,
              id: key
            });
          })
          .catch((error) => console.log(error));
        // Reach out to storage (firebase || mysql) and store data
      } else {
        const meetup = {
          title: payload.title,
          location: payload.location,
          // imageUrl: payload.imageUrl,
          description: payload.description,
          date: payload.date
            ? payload.date.toISOString()
            : Date.now().toString(),
          color: payload.color,
          creatorId: getters.user.id
          // id: payload.id ? payload.id : Date.now()
        };
        // NOTE: that you should run async code only in actions
        // NOTE: the collection doesn't have to exist yet
        // NOTE: you can remove the id property coz fb creates that automatically
        let key, imageUrl;
        firebase
          .database()
          .ref("meetups")
          .push(meetup)
          .then((data) => {
            key = data.key;
            console.log(data);
            // commit("createMeetup", {
            //   ...meetup,
            //   id: key
            // });
            return key;
          })
          .then((key) => {
            const fileName = payload.image.name;
            const ext = fileName.slice(fileName.lastIndexOf("."));
            const storageRef = firebase
              .storage()
              .ref(`meetups/${key}.${ext}`)
              .put(payload.image);
            storageRef.on(
              "state_changed",
              (snapshot) => {
                let uploadValue =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(uploadValue);
              },
              (error) => {
                console.log(error.message);
              },
              () => {
                storageRef.snapshot.ref
                  .getDownloadURL()
                  .then((url) => {
                    imageUrl = url;
                    return firebase
                      .database()
                      .ref("meetups")
                      .child(key)
                      .update({ imageUrl: imageUrl });
                  })
                  .then(() => {
                    commit("createMeetup", {
                      ...meetup,
                      imageUrl,
                      id: key
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            );
          });
        // .then((fileData) => {
        //   return fileData.snapshot.ref.getDownloadURL();
        // })
        // .then((imageUrl) => {
        //   return firebase
        //     .database()
        //     .ref("meetups")
        //     .child(key)
        //     .update({ imageUrl: imageUrl });
        // })
        // .then(() => {
        //   commit("createMeetup", {
        //     ...meetup,
        //     imageUrl,
        //     id: key
        //   });
        // })
        // .catch((error) => {
        //   console.log(error);
        // });

        // Reach out to storage (firebase || mysql) and store data
      }
    },
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          console.log(user);
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid,
            registeredMeetups: [],
            email: user.user.email
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          commit("setUser", null);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          console.log(user);
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid,
            registeredMeetups: [],
            email: user.user.email
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  },
  modules: {}
});
