console.log("Monkey Business");
walk(document.body);

if (window.MutationObserver) {
    let observer = new MutationObserver(function (mutations) {
        Array.prototype.forEach.call(mutations, function (m) {
            if (m.type === 'childList') {
                walk(m.target);
            } else if (m.target.nodeType === 3) {
                handleText(m.target);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: true
    });
}

function walk(node) {
    let child, next;

    switch ( node.nodeType ) {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while ( child ) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case 3: // Text node
            handleText(node);
            break;
    }
}

function handleText(textNode) {
    if (textNode.parentElement.tagName.toLowerCase() === "script" ||
    		textNode.parentElement.isContentEditable === true) {
        return false;
    }

    let oldValue = textNode.nodeValue;
    let v = oldValue;

    v = v.replace(/\bsjw(s?)\b/ig, "skeleton$1");
    v = v.replace(/\bsocjus\b/ig, "skeletonism");
    v = v.replace(/\b(a)n (skeletons?)\b/ig, "$1 $2");
    v = v.replace(/\b(s)ocial justice (warriors?)/ig, "$1keleton $2");

    if (v !== oldValue) {
        textNode.nodeValue = v;
    }
}