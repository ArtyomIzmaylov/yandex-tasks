const negatives = function(array) {
    arrayOfNegatives = array
    return  {
        getArray() {
            return arrayOfNegatives
        },
        push(x) {
            arrayOfNegatives.push(x)
        },
        shift () {
            if (arrayOfNegatives.length) {
                let firstElem = arrayOfNegatives[0]
                arrayOfNegatives.shift()
                return firstElem
            }
            return 0
        },
        min() {
            if (arrayOfNegatives.length) {
                let min = 99999999
                arrayOfNegatives.forEach( el => {
                    if (min > el) {
                        min = el
                    }
                })
                return min
            }
            return 0
        },
        max() {
            if (arrayOfNegatives.length) {
                let max = 0
                arrayOfNegatives.forEach( el => {
                    if (max < el) {
                        max = el
                    }
                })
                return max
            }
            return 0
        }
    }
}

const negA = negatives([1,2,3,4,5])
