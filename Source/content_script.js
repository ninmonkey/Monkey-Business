let replacement_list = [
    {
        original: ["mother fucker"],
        new_value: ["mom-sexer", "mother fricker", "incestial coitus", "Oedipusal urges intensify"],
    },
    {
        original: ["whore", "slut"],
        new_value: ["sex enthusiast", "frequent genital flyer"],
    },
    {
        original: ["hype"],
        new_value: ["over-enthusiastic-reach-around", "On 🔥 On 🔥!"],
    },
    {
        original: ["cunt", "cunty"],
        new_value: ["see you next tuesday 😊"],
    },
    {
        original: ["pussy", "cat", "puss"],
        new_value: ["🐱", "meow"],
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
    {
        original: ["mra", "redpill"],
        new_value: ["boys scared by women", "Women?! I'm a ferengi ACK ACK ACK"],
    },
    {
        original: ["asshole", "butthole"],
        new_value: ["🍑🕳", "nature's pocket", "coinpurse"],
    },
    {
        original: ["edgy", "edge"],
        new_value: ["🔪"],
    },
    {
        original: ["Flat Earth", "Flat Earther", "Flat-Earther"],
        new_value: ["I drink lead paint.", "I sniff glue"],
    },
    {
        original: ["debate"],
        new_value: ["fisticuffs", "👊icuffs", "I took Philosophy 101"],
    },
    {
        original: ["white knight"],
        new_value: ["I'm afraid of decent interactions with women.",
            "I don't hate women, but FEMALES reee!",
            "I respect women, but...",
        ],
    },
    {
        original: ["troll"],
        new_value: ["aroused by being edgy", "thinks he's clever"],
    },
    {
        original: ["hell"],
        new_value: ["H-E double hockey sticks", "text input on iOS"],
    },
    {
        original: ["cuck"],
        new_value: ["Partner over-share"],
    },
    {
        original: ["sjw"],
        new_value: ["skeleton"],
    },
    {
        original: ["ass", "butt"],
        new_value: ["🍑"],
    },

    {
        original: ["omg"],
        new_value: ["oh your god", "ermahgerd"],
    },
    {
        original: ["kek"],
        new_value: ["😂", "😹", "🤣", "ayy lmao"],
    },
    {
        original: ["penis"],
        new_value: ["🍆"],
    },
    {
        original: ["bot"],
        new_value: ["🤖"],
    },
];

// todo: custom list for discord and /r/waiaas
let waiaas_list = [
    {
        original: ["peyton"],
        new_value: ["🦐", "weebury"],
    },
];

// console.log("Monkey Business");
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

    replacement_list.forEach(function(replacement) {

        let original_list = replacement.original;

        original_list.forEach(function(original) {
            // Haven't fully decided whether to use boundries
            let match_original = "\\b" + original + "\\b";
            let re = new RegExp(match_original, 'gi');
            let new_value = random_array_item(replacement.new_value);

            // console.log("re:", re, "\nnew:", new_value); // note: console is very slow
            v = v.replace(re, new_value);
        });

        if (v !== oldValue) {
            textNode.nodeValue = v;
        }
    });

}