var app = new Vue({
  el: "#app",
  data: {
    items: null,
    keyword: "",
    message: ""
  },
  watch: {
    keyword: function(newKeyword, oldKeyword) {
      // console.log(newKeyword)
      this.message = "waithing for u to stop typing...";
      this.debouncedGetAnser();
    }
  },
  created: function() {
    // this.keyword = "js";
    // this.getAnser();
    this.debouncedGetAnser = _.debounce(this.getAnser, 1000);
  },
  methods: {
    getAnser: function() {
      if (this.keyword === "") {
        this.items = null;
        this.message = "";
        return;
      }

      this.message = "Loading...";
      var vm = this;
      var params = {
        page: 1,
        per_pages: 20,
        query: this.keyword
      };
      axios
        .get("https://qiita.com/api/v2/items", {
          params
        })
        .then(res => {
          vm.items = res.data;
          console.log(res);
        })
        .catch(error => {
          vm.message = "Error!" + error;
        })
        .finally(() => {
          vm.message = "";
        });
    }
  }
});
