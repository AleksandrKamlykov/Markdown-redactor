const resultText = document.querySelector('.result'),
    markdownText = document.querySelector('#markdown');

let textForCopy = ''

markdownText.addEventListener('input', function (event) {
    resultText.innerHTML = ''
    let textCode = event.target.value.split('```')


    let textArr = event.target.value.split('\n')
    textForCopy = event.target.value

    textArr.forEach((elem, i) => {
        if (!elem) {
            return resultText.append(document.createElement('br'))
        }

        const child = identElem(elem)

        // if (textCode.length === 3) {
        //     const childMultiLine = document.createElement('code')
        //     childMultiLine.classList.add('code-text')
        //     childMultiLine.textContent = textCode[1]

        //     resultText.append(childMultiLine)
        //     return
        // }

        if (child.nodeName === 'OL' && resultText.lastChild?.nodeName === 'OL') {
            resultText.lastChild.append(child.childNodes[0])
        } else {
            resultText.append(child)
        }

    })




})

function identElem(text, multiline) {

    if (/___|\*\*\*|---/.test(text)) {

        const elem = document.createElement('div')
        elem.style.borderBottom = '3px solid #bbb'

        return elem

    } if (/#{1,6}/g.test(text)) {
        const count = text.split('').filter((l, i) => (l === '#') && i <= 6).length
        const innText = text.slice(count)
        const elem = document.createElement(`h${count}`)
        elem.textContent = innText
        return elem
    }
    if (/__\w+__/g.test(text) || /\*\*\w+\*\*/g.test(text)) {
        const elem = document.createElement('span')
        elem.style.fontWeight = 700
        elem.textContent = text.slice(2, -2)
        return elem
    }
    if (/_\w+_/g.test(text) || /\*\w+\*/g.test(text)) {
        const elem = document.createElement('span')
        elem.style.fontStyle = 'italic'
        elem.textContent = text.slice(2, -2)
        return elem
    }
    if (/~~\w+~~/g.test(text)) {
        const elem = document.createElement('span')
        elem.style.textDecoration = 'line-through'
        elem.textContent = text.slice(2, -2)
        return elem
    } if (/^\``/g.test(text) && /\``$/.test(text)) {
        console.log(text);
        const elem = document.createElement('code')
        elem.classList.add('code-text')
        elem.textContent = text.slice(2, -2).replace('_NeXtLiNeTo_', '\n')
        return elem
    }
    if (/^`/g.test(text) && /`$/.test(text)) {
        const elem = document.createElement('code')
        elem.classList.add('code-text')
        elem.textContent = text.slice(1, -1)
        return elem
    }
    if (/^\*/g.test(text)) {
        const elem = document.createElement('li')
        elem.textContent = text.slice(1)
        return elem
    }
    if (/^\>/g.test(text)) {
        const elem = document.createElement('pre')
        elem.style.borderLeft = '5px solid #bbb'
        elem.style.paddingLeft = '5px'
        elem.style.lineHeight = 2
        elem.textContent = text.slice(1)
        return elem
    }
    if (/^\d{1}/gm.test(text)) {
        const ul = document.createElement('ol')
        const elem = document.createElement('li')
        elem.textContent = text.slice(1) || ''
        ul.append(elem)
        return ul

    } if (/^\[/.test(text) && /\)$/.test(text)) {
        const textArr = text.slice(1, -1).replace('](', ';').split(';')
        const textcont = textArr[0]
        const link = textArr[1]
        const elem = document.createElement('a')
        elem.classList.add('result-link')
        elem.textContent = textcont
        elem.href = link
        elem.target = '_blank'
        return elem

    } if (/^!\[/.test(text) && /\)$/.test(text)) {
        const textArr = text.slice(1, -1).replace('](', ';').split(';')
        const altText = textArr[0]
        const link = textArr[1]
        const elem = document.createElement('img')
        elem.classList.add('result-img')
        elem.alt = altText
        elem.src = link
        return elem

    } else {
        const elem = document.createElement('span')
        elem.textContent = text
        return elem
    }
}