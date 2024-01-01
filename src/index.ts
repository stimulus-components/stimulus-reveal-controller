import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  hasHiddenClass: boolean
  hiddenClass: string
  itemTargets: HTMLElement[]
  class: string

  static targets = ['item']
  static classes = ['hidden']

  connect (): void {
    this.class = this.hasHiddenClass ? this.hiddenClass : 'hidden'
  }

  toggle (e): void {
    e.currentTarget.setAttribute('aria-expanded', String(e.currentTarget.getAttribute('aria-expanded') !== 'true'))

    this.itemTargets.forEach(item => {
      item.classList.toggle(this.class)
    })
  }

  show (e): void {
    e.currentTarget.setAttribute('aria-expanded', 'true')

    this.itemTargets.forEach(item => {
      item.classList.remove(this.class)
    })
  }

  hide (e): void {
    e.currentTarget.setAttribute('aria-expanded', 'false')

    this.itemTargets.forEach(item => {
      item.classList.add(this.class)
    })
  }
}
