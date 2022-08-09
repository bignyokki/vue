var items = [
  {
    name: '鉛筆',
    price: 300,
    quantity: 0
  },
  {
    name: 'ノート',
    price: 400,
    quantity: 0
  },
  {
    name: '消しゴム',
    price: 500,
    quantity: 0
  }
]

var vm = new Vue({
  // 「el」:Vueインスタンスをマウントする要素
  el: '#app',
  data: {
    items: items
  },
  filters: {
    numberWithDelimiter: function (value) {
      if (!value) {
        return '0'
      }
      return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    }
  },
  methods:{
    doBuy: function () {
      // 本来はここでサーバーとの通信を行う
      alert(this.totalPriceWithTax + '円のお買い上げ！')
      this.items.forEach(function (item) {
        item.quantity = 0
      })
    }
  },
  computed: { // 算出プロパティ
    totalPrice: function () {
      // this経由でインスタンス内のデータにアクセス
      // reduceメソッド: 配列の要素を一つずつ処理して結果を返す
      //   array.reduce( function( 引数1, 引数2, 引数3 引数4 ){return 処理}, 初期値 )
      //     引数1: 処理前の値（直前の処理結果）(sum)
      //     引数2: 現在の要素の値(item)
      //     引数3: 現在の要素のインデックス番号(なし)
      //     引数4: 元の配列(なし)
      return this.items.reduce(function (sum, item) {
        return sum + (item.price * item.quantity)
      }, 0)
    },
    totalPriceWithTax: function () {
      // 算出プロパティに依存した算出プロパティーも定義できる
      return Math.floor(this.totalPrice * 1.08)
    },
    canBuy: function () {
      return this.totalPrice >= 1000 // 1000円以上から購入可能にする
    },
    errorMessageStyle: function () {
      // canBuyが偽の時赤く表示する
      return {
        border: this.canBuy ? '' : '1px solid red',
        color: this.canBuy ? '' : 'red'
      }
    }
  }
})