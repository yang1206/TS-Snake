export default class Snake {
  //表示蛇头的元素
  head: HTMLElement
  //蛇身体（包括蛇头
  bodies: HTMLCollection
  //蛇的容器
  element: HTMLElement
  constructor() {
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.element = document.getElementById('snake')!
    this.bodies = this.element.getElementsByTagName('div')!
  }
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  //设置蛇头坐标
  set X(value: number) {
    //如果新值与旧值相同，return
    if (this.X === value) return
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }
    //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      //如果发生了掉头，让蛇向反方向继续移动
      if (value > this.X) {
        //如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，使蛇继续向左走
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }
  set Y(value: number) {
    if (this.Y === value) return
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了!')
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      //如果发生了掉头，让蛇向反方向继续移动
      if (value > this.Y) {
        //如果新值value大于旧值Y，则说明蛇在向下走，此时发生掉头，使蛇继续向上走
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }

    //移动身体
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }
  //蛇增加身体的方法
  addBody() {
    this.element.insertAdjacentHTML('beforeend', "<div></div>")
  }
  //添加一个蛇身移动的方法
  moveBody() {
    //将后边的身体设置为前边身体的位置
    // console.log(this.bodies.length);
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      //将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px'
    }
  }
  //检查蛇头有没有撞到身体
  checkHeadBody() {
    //获取所有身体，检查其是否和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = (this.bodies[i] as HTMLElement)
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        throw new Error('撞到自己了')
      }
    }
  }
}