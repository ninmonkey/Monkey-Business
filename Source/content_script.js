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

    switch (node.nodeType) {
        // Element, Document, DocumentFragment
        case 1:
        case 9:
        case 11:
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        // text
        case 3:
            handleText(node);
            break;
    }
}

let replacement_list = [];
function random_array_item(items) {
    return items[Math.floor(Math.random()*items.length)];
}

function handleText(textNode) {
    if (textNode.parentElement.tagName.toLowerCase() === "script" ||
    		textNode.parentElement.isContentEditable === true) {
        return false;
    }

    let oldValue = textNode.nodeValue;
    let v = oldValue;
    let replacements = ["tooting", "flipping", "fracking", "frik'n", "beeping", "#%&!$@!"];

    // todo: each replace uses a random item instead
    let re = /fucking/gi;
    let replacement = random_array_item(replacements);
    v = v.replace(re, replacement);


    // v = v.replace(/\bthe(s?)\b/ig, "skeleton$1");
    // v = v.replace(/\bchrome\b/ig, "skeletonism");
    // v = v.replace(/\bcode\b/ig, "kjittycat");
    // v = v.replace(/\b(a)n (skeletons?)\b/ig, "$1 $2");
    // v = v.replace(/\b(s)ocial justice (warriors?)/ig, "$1keleton $2");

    if (v !== oldValue) {
        textNode.nodeValue = v;
    }
}