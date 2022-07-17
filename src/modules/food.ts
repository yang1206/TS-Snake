//定义食物类Food
export default  class Food {
  element: HTMLElement;
  constructor() {
    //获取页面的food元素并将其赋值给element
    this.element = document.getElementById('food')!
  }
  //定义一个获取食物X轴坐标的方法
  get X() {
    return this.element.offsetLeft
  }
  //定义一个获取食物Y轴坐标的方法
  get Y() {
    return this.element.offsetTop
  }
  //修改食物的位置
  change() {
    //生成一个随机的位置
    //食物的位置最小是0，最大是290
    //蛇移动一次是10像素，所以食物移动要是10的倍数
    let top = Math.round(Math.random() * 29) * 10
    let left = Math.round(Math.random() * 29) * 10
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}


// const food = new Food()
// console.log(food.X, food.Y);
// food.change()
