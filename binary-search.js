var binaryOps = {}

binaryOps.upsert = function (array, item, compare, update) {
  var index = binaryOps.findAny(array, item, compare)
  if (typeof index === 'undefined') throw new Error('und')
  if (typeof index === 'undefined') throw new Error('und')
  if (binaryOps.isFound(index)) {
    update(array[index], item)
    return index
  } else {
    return binaryOps.insertAtIndex(array, index, item)
  }
}

binaryOps.insert = function (array, item, compare) {
  var index = binaryOps.findAny(array, item, compare)
  return binaryOps.insertAtIndex(array, index, item)
}

binaryOps.findAny = function (array, item, compare, minIndex, maxIndex) {
  if (array.length === 0) return Number.POSITIVE_INFINITY
  if (array.length === 1) return binaryOps.easySingle(array[0], item, compare)
  var currentCompare
  if (typeof minIndex === 'undefined' || minIndex === 0) {
    currentCompare = binaryOps.easyMin(array, item, compare)
    if (currentCompare !== false) return currentCompare
    minIndex = 1
  }
  if (typeof maxIndex === 'undefined' || maxIndex === array.length - 1) {
    currentCompare = binaryOps.easyMax(array, item, compare)
    if (currentCompare !== false) return currentCompare
    maxIndex = array.length - 2
  }
  var currentIndex
  var currentElement

  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0
    currentElement = array[currentIndex]
    currentCompare = compare(currentElement, item)

    if (currentCompare < 0) {
      minIndex = currentIndex + 1
    }
    else if (currentCompare > 0) {
      maxIndex = currentIndex - 1
    } else {
      return currentIndex
    }
  }
  return -minIndex
}

binaryOps.findRange = function (array, item, compare, minIndex, maxIndex) {
  if (array.length === 0) return Number.POSITIVE_INFINITY
  if (array.length === 1) return binaryOps.easySingle(array[0], item, compare)
  var currentCompare
  if (typeof minIndex === 'undefined' || minIndex === 0) {
    currentCompare = binaryOps.easyMin(array, item, compare)
    if (currentCompare === Number.NEGATIVE_INFINITY) return currentCompare
    if (currentCompare !== false) {
      return [currentCompare, binaryOps.findLast(array, item, compare)]
    }
    minIndex = 1
  }
  if (typeof maxIndex === 'undefined' || maxIndex === array.length - 1) {
    currentCompare = binaryOps.easyMax(array, item, compare)
    if (currentCompare === Number.POSITIVE_INFINITY) return currentCompare
    if (currentCompare !== false) {
      return [binaryOps.findFirst(array, item, compare), currentCompare]
    }
    maxIndex = array.length - 2
  }
  var currentIndex
  var currentElement

  var bounds = []
  var trueMin = minIndex
  var trueMax = maxIndex

  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0
    currentElement = array[currentIndex]
    currentCompare = compare(currentElement, item)

    if (currentCompare < 0) {
      minIndex = currentIndex + 1
    }
    else if (currentCompare > 0) {
      trueMax = currentIndex
      maxIndex = currentIndex - 1
    }
    else if (compare(array[currentIndex - 1], item) !== 0) {
      bounds[0] = currentIndex
      if (bounds[0] > trueMin) trueMin = bounds[0]
      break
    } else {
      if (compare(array[currentIndex + 1], item) !== 0) {
        bounds[1] = currentIndex
      } else {
        trueMin = currentIndex
      }
      maxIndex = currentIndex
    }
  }
  if (typeof bounds[0] === 'undefined') return -minIndex
  if (typeof bounds[1] !== 'undefined') return bounds
  bounds[1] = binaryOps.findLast(array, item, compare, trueMin, trueMax)
  return bounds
}

binaryOps.findFirst = function (array, item, compare, minIndex, maxIndex) {
  if (array.length === 0) return Number.POSITIVE_INFINITY
  if (array.length === 1) return binaryOps.easySingle(array[0], item, compare)
  var ret = binaryOps.easyOut(array, item, compare)
  var currentCompare
  if (typeof minIndex === 'undefined' || minIndex === 0) {
    currentCompare = binaryOps.easyMin(array, item, compare)
    if (currentCompare !== false) {
      return currentCompare
    }
    minIndex = 1
  }
  if (typeof maxIndex === 'undefined' || maxIndex === array.length - 1) {
    currentCompare = binaryOps.easyMax(array, item, compare)
    if (currentCompare === Number.POSITIVE_INFINITY) return currentCompare
    if (currentCompare !== false) {
      if (compare(array[currentCompare - 1], item) < 0) {
        return currentCompare
      }
    }
    maxIndex = array.length - 2
  }
  var currentIndex
  var currentElement

  if (minIndex === 0) {
    var c = compare(array[0], item)
    if (c === 0) {
      return 0
    }else if (c < 0) {
      return Number.NEGATIVE_INFINITY
    }
    minIndex++
  }

  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0
    currentElement = array[currentIndex]
    currentCompare = compare(currentElement, item)

    if (currentCompare < 0) {
      minIndex = currentIndex + 1
    }
    else if (currentCompare > 0) {
      maxIndex = currentIndex - 1
    }
    else if (compare(array[currentIndex - 1], item) < 0) {
      return currentIndex
    } else {
      maxIndex = currentIndex - 1
    }
  }
  return -minIndex
}

binaryOps.findLast = function (array, item, compare, minIndex, maxIndex) {
  if (array.length === 0) return Number.POSITIVE_INFINITY
  if (array.length === 1) return binaryOps.easySingle(array[0], item, compare)
  var currentCompare
  if (typeof maxIndex === 'undefined' || maxIndex === array.length - 1) {
    currentCompare = binaryOps.easyMax(array, item, compare)
    if (currentCompare !== false) {
      return currentCompare
    }
    maxIndex = array.length - 2
  }
  if (typeof minIndex === 'undefined' || minIndex === 0) {
    currentCompare = binaryOps.easyMin(array, item, compare)
    if (currentCompare === Number.NEGATIVE_INFINITY) return currentCompare
    if (currentCompare !== false) {
      if (compare(array[currentCompare + 1], item) < 0) {
        return currentCompare
      }
    }
    minIndex = 1
  }
  var currentIndex
  var currentElement

  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0
    currentElement = array[currentIndex]
    currentCompare = compare(currentElement, item)

    if (currentCompare < 0) {
      minIndex = currentIndex + 1
    }
    else if (currentCompare > 0) {
      maxIndex = currentIndex - 1
    }
    else if (compare(array[currentIndex + 1], item) !== 0) {
      return currentIndex
    } else {
      minIndex = currentIndex + 1
    }
  }

  return -minIndex
}

binaryOps.easyMin = function (array, item, compare) {
  var i = 0,c = compare(array[i], item)
  if (c > 0) return Number.NEGATIVE_INFINITY
  if (c === 0) return i
  return false
}

binaryOps.easyMax = function (array, item, compare) {
  var i = array.length - 1,c = compare(array[i], item)
  if (c < 0) return Number.POSITIVE_INFINITY
  if (c === 0) return i
  return false
}

binaryOps.easySingle = function (aitem, item, compare) {
  var currentCompare = compare(aitem, item)
  if (currentCompare > 0) return Number.NEGATIVE_INFINITY
  if (currentCompare < 0) return Number.POSITIVE_INFINITY
  return 0
}

binaryOps.isFound = function (index) {
  if (index < 0) return false
  if (index === Number.POSITIVE_INFINITY) return false
  return true
}

binaryOps.insertAtIndex = function (array, index, item) {
  if (binaryOps.isFound(index)) throw new Error('cannot overwrite what already exists')
  if (index === Number.POSITIVE_INFINITY) {
    array.push(item)
    return array.length - 1
  }
  if (index === Number.NEGATIVE_INFINITY) {
    array.unshift(item)
    return 0
  }
  index *= -1

  array.splice(index, 0, item)
  return index
}

if (typeof module !== 'undefined' && module.exports) module.exports = binaryOps
