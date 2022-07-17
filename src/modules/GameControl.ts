//游戏控制器
import Food from './food'
import ScorePanel from './scorePanel'
import Snake from './snake';
export default class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  //创建一个属性存储蛇的移动方向（按键方向
  direction: string = ''
  //记录游戏是否结束
  isLive = true
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    this.init()
  }
  //游戏初始化方法，调用后游戏即开始
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))

    //调用run方法,使蛇移动
    this.run()
  }

  //键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    // console.log(this.direction)

    //修改direction属性
    this.direction = event.key
    // this.run()
  }
  run() {
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break;
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10
        break;
      case "ArrowRight":
      case "Right":
        X += 10
        break
    }
    this.checkEat(X,Y)
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e: any) {
      alert(e.message + 'Game Over')
      this.isLive = false
    }

    //开启定时器调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  //检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
     if(X === this.food.X && Y === this.food.Y){
       //食物位置变化
       this.food.change()
       //分数增加
       this.scorePanel.addScore()
       //蛇增加一节
       this.snake.addBody()
     }
  }
}