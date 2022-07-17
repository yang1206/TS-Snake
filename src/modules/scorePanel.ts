//计分板
export default class ScorePanel {
  //score和level用来记录分数和等级

  score = 0
  level = 1

  //分数和等级所在的元素
  scoreEle: HTMLElement
  levelEle: HTMLElement

  //最高等级限制
  maxLevel: number
  //升级所需分数
  upScore: number
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!

    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  //设置一个加分的方法
  addScore() {
    // this.score++
    this.scoreEle.innerHTML = ++this.score + ''

    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  levelUp() {
    if (this.level >= this.maxLevel) return
    this.levelEle.innerHTML = ++this.level + ''
  }
}
// const scorePanel = new ScorePanel()
