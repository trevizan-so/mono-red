"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decodeHTMLEntities = (rawStr) => {
    return rawStr.replace(/&#(\d+);/g, ((match, dec) => `${String.fromCharCode(dec)}`));
};
exports.default = decodeHTMLEntities;
//# sourceMappingURL=decodeHtmlEntites.js.map