import { Body } from '../objects/Body'

/**
 * Collision "matrix". It's actually a triangular-shaped array of whether two bodies are touching this step, for reference next step
 * @class ArrayCollisionMatrix
 * @constructor
 */
export class ArrayCollisionMatrix {
  matrix: number[] // The matrix storage.

  constructor() {
    this.matrix = []
  }

  /**
   * Get an element
   * @method get
   * @param  {Number} i
   * @param  {Number} j
   * @return {Number}
   */
  get(i: Body, j: Body): number {
    i = i.index
    j = j.index
    if (j > i) {
      const temp = j
      j = i
      i = temp
    }
    return this.matrix[((i * (i + 1)) >> 1) + j - 1]
  }

  /**
   * Set an element
   * @method set
   * @param {Number} i
   * @param {Number} j
   * @param {Number} value
   */
  set(i: Body, j: Body, value: boolean): void {
    i = i.index
    j = j.index
    if (j > i) {
      const temp = j
      j = i
      i = temp
    }
    this.matrix[((i * (i + 1)) >> 1) + j - 1] = value ? 1 : 0
  }

  /**
   * Sets all elements to zero
   * @method reset
   */
  reset(): void {
    for (let i = 0, l = this.matrix.length; i !== l; i++) {
      this.matrix[i] = 0
    }
  }

  /**
   * Sets the max number of objects
   * @method setNumObjects
   * @param {Number} n
   */
  setNumObjects(n: number): void {
    this.matrix.length = (n * (n - 1)) >> 1
  }
}
