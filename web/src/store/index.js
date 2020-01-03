import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    newList: [],
    cases: [],
    tabs: [],
    rankArticle: {},
    rankList: [],
    commentArt: {},
    comments: [],
    count: {},
    categories: [],
    tags: []
  },
  mutations:{
    increment(state,main){
      state.categories = main.categories
      state.newList = main.newArticlies
      state.cases = main.cases
      state.tabs = main.tabs
      state.rankArticle = main.rank[0]
      state.rankList = main.rank
      state.commentArt = main.hotComment[0].article
      state.comments = main.hotComment.slice(0,9)
      state.count = main.site
      state.tags = main.tags
    }
  }
})

export default store