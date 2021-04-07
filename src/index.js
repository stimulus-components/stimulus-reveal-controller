import { Controller } from 'stimulus'
import { useTransition } from 'stimulus-use'

export default class extends Controller {
  static targets = ['item']
  static classes = ['hidden']

  connect () {
    this.class = this.hasHiddenClass ? this.hiddenClass : 'hidden'

    useTransition(this, {
      element: this.itemTarget,
      hiddenClass: this.class,
      transitioned: !this.itemTarget.classList.contains(this.class)
    })
  }

  toggle () {
    this.toggleTransition()
  }

  show () {
    this.enter()
  }

  hide () {
    this.leave()
  }
}
