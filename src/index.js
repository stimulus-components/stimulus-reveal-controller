import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['item']
  static classes = ['hidden']

  // Lifecycle Events
  connect () {
    this.class = this.hasHiddenClass ? this.hiddenClass : 'hidden'
    this.isTransitioning = false
  }

  // Actions

  toggle () {
    if (this.isTransitioning) {
      return
    }

    this.isTransitioning = true

    Promise.all(this.itemTargets.map(item => this.toggleItem(item))).then(() => {
      this.isTransitioning = false
    })
  }

  show () {
    if (this.isTransitioning) {
      return
    }

    this.isTransitioning = true

    Promise.all(this.itemTargets.map(item => this.showItem(item))).then(() => {
      this.isTransitioning = false
    })
  }

  hide () {
    if (this.isTransitioning) {
      return
    }

    this.isTransitioning = true

    Promise.all(this.itemTargets.map(item => this.hideItem(item))).then(() => {
      this.isTransitioning = false
    })
  }

  // Private

  async toggleItem (item) {
    if (item.classList.contains(this.class)) {
      await this.showItem(item)
      return
    }

    await this.hideItem(item)
  }

  async showItem (item) {
    if (!item.classList.contains(this.class)) {
      return
    }

    item.classList.remove(this.class)

    const data = item.dataset

    if (data.transitionShow && data.transitionShowStart && data.transitionShowEnd) {
      const enterClassList = data.transitionShow.split(' ')
      const startClassList = data.transitionShowStart.split(' ')
      const endClassList = data.transitionShowEnd.split(' ')

      await this.animateTransition(item, enterClassList, startClassList, endClassList)
    }
  }

  async hideItem (item) {
    if (item.classList.contains(this.class)) {
      return
    }

    const data = item.dataset

    if (data.transitionHide && data.transitionHideStart && data.transitionHideEnd) {
      const enterClassList = data.transitionHide.split(' ')
      const startClassList = data.transitionHideStart.split(' ')
      const endClassList = data.transitionHideEnd.split(' ')

      await this.animateTransition(item, enterClassList, startClassList, endClassList)
    }

    item.classList.add(this.class)
  }

  async animateTransition (item, enterClassList, startClassList, endClassList) {
    const commonClasses = []

    new Set([...enterClassList, ...startClassList, ...endClassList]).forEach(className => {
      if (item.classList.contains(className)) {
        commonClasses.push(className)
      }
    })

    item.classList.remove(...commonClasses)
    item.classList.add(...enterClassList)
    item.classList.add(...startClassList)
    await this.nextFrame()
    item.classList.remove(...startClassList)
    item.classList.add(...endClassList)
    await this.afterTransition(item)
    item.classList.remove(...endClassList)
    item.classList.remove(...enterClassList)
    item.classList.add(...commonClasses)
  }

  nextFrame () {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve)
      })
    })
  }

  afterTransition (item) {
    return new Promise(resolve => {
      const duration =
        Number(
          getComputedStyle(item)
            .transitionDuration.split(',')[0]
            .replace('s', '')
        ) * 1000

      setTimeout(() => {
        resolve()
      }, duration)
    })
  }
}
