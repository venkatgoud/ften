ace.define("ace/mode/fountain", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text"], function (acequire, exports, module) {
    "use strict";
    var oop = acequire("../lib/oop");
    var TextMode = acequire("./text").Mode;

    var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

    console.log("==== Fountain Mode ===");

    var FountainHighlightRules = function () {
        console.log("==== Fountain Mode Hightlight rules===");
        this.$rules = {
            "start": [{
                token: "fountain.boneyard",
                regex: /(^\/\*|^\*\/)$/
            }, {
                token: "fountain.character",
                regex: /^([A-Z*_]+[0-9A-Z]*)$/,
                next: "dialogue"
            }, {
                token: "fountain.transition",
                regex: /^((?:FADE (?:TO BLACK|OUT)|CUT TO BLACK)\.|.+ TO\:)|^(?:> *)(.+)/,
            }, {
                token: "fountain.scene_heading",
                regex: /^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
                push : [{
                    token : "text",
                    regex : "\\s+"
                }],
                next: "heading"
            }, {
                token: "fountain.section",
                regex: /^(#+)(?: *)(.*)/,

            }, {
                token: "fountain.synopsis",
                regex: /^(?:\=(?!\=+) *)(.*)/,
            }, {
                token: "fountain.action",
                regex: /^(.+)/
            }],
            "heading": [{
                token: "empty_line",
                regex: '^$',
                onMatch: function(val, state, stack, line) {
                    console.log("value " + val)         
                    console.log("state " + state)         
                    console.log("stack " + stack)
                    stack.push("heading")      
                    console.log("line " + line)      
                },
                next: "start"
            }],
            "dialogue": [{
                token: "fountain.parenthetical",
                regex: /^(\(.+\))$/
            },
            {
                token: "fountain.dialogue",
                regex: /^(.+)/,
                next: "start"
            }
            ]

        };
    }
    oop.inherits(FountainHighlightRules, TextHighlightRules);

    var Mode = function () {
        this.HighlightRules = FountainHighlightRules;
        //    this.foldingRules = new FountainFoldMode();
    }

    oop.inherits(Mode, TextMode);

    (function () {
        console.log("==== Fountain Mode comment section ===");
        // configure comment start/end characters
        this.lineCommentStart = "//";
        this.blockComment = { start: "/*", end: "*/" };

        this.getNextLineIndent = function (state, line, tab) {
            if (state == "listblock") {
                var match = /^(\s*)(?:([-+*])|(\d+)\.)(\s+)/.exec(line);
                if (!match)
                    return "";
                var marker = match[2];
                if (!marker)
                    marker = parseInt(match[3], 10) + 1 + ".";
                return match[1] + marker + match[4];
            } else {
                return this.$getIndent(line);
            }
        };
        this.$id = "ace/mode/fountain";

    }).call(Mode.prototype);

    exports.Mode = Mode;
}) 