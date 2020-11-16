<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    />

    <v-main>
      <Autocomplete
        :list-movies="listMovies"
        :requesting="waitingProgress"
        @change-title="changeTitle"
      />
    </v-main>
  </v-app>
</template>

<script>
import Autocomplete from '@/components/Autocomplete'
import debounce from '@/utils/debounce'

export default {
  name: 'App',

  components: {
    Autocomplete
  },
  data: () => ({
    quantityResults: 0,
    movies: [],
    requesting: false,
    delay: 150
  }),
  computed: {
    listMovies () {
      return this.movies
    },
    waitingProgress () {
      return this.requesting
    },
    executeDebouncedTitle () {
      return debounce(this.fetchOMDB, this.delay)
    }
  },
  methods: {
    fetchOMDB (title) {
      window.fetch(`http://localhost:8080/search?q=${title}`, {
        "headers": {
          'accept': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(({ totalResults, Search }) => {
          this.quantityResults = totalResults
          this.movies = Search
          this.requesting = false
        })
        .catch(console.error)
    },
    changeTitle (title) {
      if (title.length > 3) {
        this.requesting = true
        this.executeDebouncedTitle(title)
      }
    }
  }
};
</script>
