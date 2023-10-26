let React = {
    createElement: (tag, props, ...children)=>{
        if (typeof tag == "function") return tag(props);
        const element = {
            tag: tag,
            props: {
                ...props,
                children
            }
        };
        console.log(element);
        return element;
    }
};
const App = ()=>/*#__PURE__*/ React.createElement("div", {
        className: "react-2020",
        __source: {
            fileName: "index.tsx",
            lineNumber: 15,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("h1", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 16,
            columnNumber: 9
        },
        __self: this
    }, "Hello, person"), /*#__PURE__*/ React.createElement("input", {
        placeholder: "name",
        type: "text",
        __source: {
            fileName: "index.tsx",
            lineNumber: 17,
            columnNumber: 9
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("p", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 18,
            columnNumber: 9
        },
        __self: this
    }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, sint rerum! Sed consectetur aliquid magni expedita modi ipsam et, id nesciunt dicta consequuntur qui, sint numquam neque debitis perspiciatis ea?"));
const render = (reactElementOrStringOrNumber, container)=>{
    if ([
        "string",
        "number"
    ].includes(typeof reactElementOrStringOrNumber)) {
        container.appendChild(document.createTextNode(String(reactElementOrStringOrNumber)));
        return;
    }
    const actualDomElement = document.createElement(reactElementOrStringOrNumber.tag);
    if (reactElementOrStringOrNumber.props) Object.keys(reactElementOrStringOrNumber.props).filter((p)=>p !== "childer").forEach((p)=>actualDomElement[p] = reactElementOrStringOrNumber[p]);
    if (reactElementOrStringOrNumber.props.children) reactElementOrStringOrNumber.props.children.forEach((child)=>render(child, actualDomElement));
    container.appendChild(actualDomElement);
};
render(/*#__PURE__*/ React.createElement(App, {
    __source: {
        fileName: "index.tsx",
        lineNumber: 39,
        columnNumber: 8
    },
    __self: this
}), document.querySelector("#app"));

//# sourceMappingURL=index.ad9a7e97.js.map
