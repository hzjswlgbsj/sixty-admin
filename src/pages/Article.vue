<template>
  <div>
    <Table stripe :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import { getArticles } from '../services/article'
export default {
  name: 'Article',
  data () {
    return {
      articles: [],
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      this.articles = await getArticles()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
