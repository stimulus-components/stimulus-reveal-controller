import { Controller } from "@hotwired/stimulus"

export default class Reveal extends Controller {
  hasHiddenClass: boolean
  hiddenClass: string
  itemTargets: HTMLElement[]
  class: string

  static targets = ["item"]
  static classes = ["hidden"]

  connect(): void {
    this.class = this.hasHiddenClass ? this.hiddenClass : "hidden"
    this.restoreState()
  }

  toggle(): void {
    this.itemTargets.forEach((item) => {
      item.classList.toggle(this.class)
      this.saveState(item)
    })
  }

  saveState(item: HTMLElement): void {
    if (!item.dataset.revealStoreId) return
    const isHidden = item.classList.contains(this.class)
    sessionStorage.setItem(`reveal-${item.dataset.revealStoreId}`, isHidden ? "false" : "true")
  }

  restoreState() {
    this.itemTargets.forEach((item) => {
      const storedValue = sessionStorage.getItem(`reveal-${item.dataset.revealStoreId}`)
      if (!storedValue) return
      const shouldHide = storedValue === "false"
      item.classList.toggle(this.class, shouldHide)
    })
  }

  show(): void {
    this.itemTargets.forEach((item) => {
      item.classList.remove(this.class)
    })
  }

  hide(): void {
    this.itemTargets.forEach((item) => {
      item.classList.add(this.class)
    })
  }
}
