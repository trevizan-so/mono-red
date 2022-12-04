"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputData = exports.InputData = void 0;
class InputData {
    constructor() {
        this.cardName = "";
        this.isFoil = false;
        this.set = "";
    }
}
exports.InputData = InputData;
class OutputData {
    constructor() {
        this.cardName = "";
        this.searchTimestamp = "";
        this.prices = [];
    }
}
exports.OutputData = OutputData;
//# sourceMappingURL=dto.js.map