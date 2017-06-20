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
                token: "fountain.dialogue",
                regex: /^([A-Z*_]+[0-9A-Z (._\-')]*)(\^?)?(?:\n(?!\n+))([\s\S]+)/
            }, {
                token: "fountain.parenthetical",
                regex: /^(\(.+\))$/
            }, {
                token: "fountain.transition",
                regex: /^((?:FADE (?:TO BLACK|OUT)|CUT TO BLACK)\.|.+ TO\:)|^(?:> *)(.+)/,
            }, {
                token: "fountain.scene_heading",
                regex: /^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i
            }, {
                token: "fountain.section",
                regex: /^(#+)(?: *)(.*)/,

            }, {
                token: "fountain.synopsis",
                regex: /^(?:\=(?!\=+) *)(.*)/,
            }, {
                token: "fountain.action",
                regex: /^(.+)/
            }]
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