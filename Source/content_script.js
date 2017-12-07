// todo: also make 'original' an array
let replacement_list = [
    {
        original: ["fuck you", "fuk you"],
        new_value: ["🖕 you"],
    },
    {
        original: ["fucking"],
        new_value: ["tooting", "flipping", "fracking", "frik'n", "beeping", "#%&!$@!"],
    },
    {
        original: ["fuck"],
        new_value: ["frak", "beep", "frik", "effing", "beep", "#%&!"],
    },
    {
        original: ["shit"],
        new_value: ["💩", "👎", "★☆☆☆☆ 1/5"],
    },
];

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
    // let replacements = ["tooting", "flipping", "fracking", "frik'n", "beeping", "#%&!$@!"];

    // // todo: each replace uses a random item instead
    // let re = /fucking/gi;
    // let replacement = random_array_item(replacements);
    // v = v.replace(re, replacement);


    replacement_list.forEach(function(replacement) {

        // if boundries:
        // let s = "\\b" + replacement.original + "\\b";
        let original_list = replacement.original;

        original_list.forEach(function(original) {
            let s = "\\b" + original + "\\b";
            let re = new RegExp(s, 'gi');
            let new_values = replacement['new_value'];
            let new_value = random_array_item(new_values);

            // console.log("re:", re, "\nnew:", new_value);
            v = v.replace(re, new_value);
        });

        if (v !== oldValue) {
            textNode.nodeValue = v;
        }
    });

}