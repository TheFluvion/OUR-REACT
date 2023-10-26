let React = {
    createElement: (tag, props, ...children) => {
        if (typeof tag == 'function') {
            try {
                return tag(props)
            } catch ({ promise, key }) {
                promise.then(data => {
                    promiceCache.set(key, data)
                    rerender()
                })
                return { tag: 'h1', props: { children: ['I AM LOADING'] } }
            }
        }
        const element = {
            tag: tag, props: { ...props, children }
        }
        return element
    }
}

const states = []
let stateCursor = 0

const useState = (initialState) => {
    const FROZENCURSOR = stateCursor
    states[FROZENCURSOR] = states[FROZENCURSOR] || initialState
    let setState = (newState) => {
        states[FROZENCURSOR] = newState
        rerender()
    }
    stateCursor++

    return [states[FROZENCURSOR], setState]
}

const promiceCache = new Map()
const createResource = (thingThatReturnASomething, key) => {
    if (promiceCache.has(key)) {
        return promiceCache.get(key)
    }

    throw { promise: thingThatReturnASomething(), key }
}

const App = () => {
    const [name, setName] = useState('person')
    const [count, setCount] = useState(0)
    const dogPhotoUrl = createResource(() => fetch('https://dog.ceo/api/breeds/image/random')
        .then(r => r.json())
        .then(payload => payload.message), 'dogPhoto')

    return (
        <div className='react-2020'>
            <h1>Hello, {name}</h1>
            <input value={name} onchange={e => setName(e.target.value)} placeholder='name' type='text' />
            <h2>The count is: {count}</h2>
            <img alt='doggy' src={dogPhotoUrl} />
            <button onclick={() => setCount(count + 1)}>+</button>
            <button onclick={() => setCount(count - 1)}>-</button>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, sint rerum! Sed consectetur aliquid magni expedita modi ipsam et, id nesciunt dicta consequuntur qui, sint numquam neque debitis perspiciatis ea?</p>
        </div>
    )
}

const render = (reactElementOrStringOrNumber, container) => {
    if (['string', 'number'].includes(typeof reactElementOrStringOrNumber)) {
        container.appendChild(document.createTextNode(String(reactElementOrStringOrNumber)))
        return
    }
    const actualDomElement = document.createElement(reactElementOrStringOrNumber.tag)
    if (reactElementOrStringOrNumber.props) {
        Object.keys(reactElementOrStringOrNumber.props)
            .filter(p => p !== 'childer')
            .forEach(p => actualDomElement[p] = reactElementOrStringOrNumber.props[p])
    }
    if (reactElementOrStringOrNumber.props.children) {
        reactElementOrStringOrNumber.props.children.forEach(child => render(child, actualDomElement));
    }
    container.appendChild(actualDomElement)
}

const rerender = () => {
    stateCursor = 0
    document.querySelector('#app').firstChild.remove
    render(<App />, document.querySelector('#app'))
}

render(<App />, document.querySelector('#app'))
