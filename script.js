const ref = {
  output: document.querySelector('.output'),
  clear: document.querySelector('.clear'),
  numbers: document.querySelector('.numbers'),
  calculations: document.querySelector('.calculations'),
}

let value = ''
let lastCalculation = ''

const splitBySymbol = (str, symbol) => {
  const result = str.split(symbol)

  return result.map((element) => Number(element))
}

const handleClear = () => {
  value = ''
  ref.output.innerHTML = value
}

const handleNumbers = (e) => {
  const currentSymbol = e.target.dataset.symbol
  if (!currentSymbol) {
    return
  }

  value += currentSymbol
  ref.output.innerHTML = value
}

const handleCalculations = (e) => {
  const currentSymbol = e.target.dataset.symbol
  if (!currentSymbol) {
    return
  }

  if (currentSymbol === '=') {
    const result = splitBySymbol(value, lastCalculation)

    switch (lastCalculation) {
      case '÷':
        value = result.reduce((acc, element, index) => {
          if (index === 0) {
            return (acc = element)
          }

          return (acc = acc / element)
        }, 0)
        break

      case 'x': {
        value = result.reduce((acc, element, index) => {
          if (index === 0) {
            return (acc = element)
          }

          return (acc = acc * element)
        }, 0)
        break
      }

      case '-':
        value = result.reduce((acc, element, index) => (acc -= element), 0)
        break

      case '+':
        value = result.reduce((acc, element) => (acc += element), 0)
        break
    }
  } else {
    value += currentSymbol
  }

  lastCalculation = currentSymbol
  ref.output.innerHTML = value
}

ref.clear.addEventListener('click', handleClear)
ref.numbers.addEventListener('click', handleNumbers)
ref.calculations.addEventListener('click', handleCalculations)
