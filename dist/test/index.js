"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
require("mocha");
var chai = require("chai");
var omt_1 = require("../omt");
var dbPath = './merkledatabase';
var dbPath2 = './merkledatabase2';
var dbPath3 = './merkledatabase3';
var defaultLeaves = [
    {
        key: 1,
        value: 'hello world!'
    },
    {
        key: 500,
        value: 'wow cool tree guy!'
    },
    {
        key: 30,
        value: 'gee I love cool stuff'
    },
    {
        key: 15,
        value: '4th time\'s the charm'
    }
];
chai.should();
describe('merkle proof tester', function () {
    it('should make some inserts', function () { return __awaiter(_this, void 0, void 0, function () {
        var omt, value1, value2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    omt = new omt_1.OrderedMerkleTree(dbPath);
                    return [4, omt.insertMany(defaultLeaves)];
                case 1:
                    _a.sent();
                    return [4, omt.get(1)];
                case 2:
                    value1 = _a.sent();
                    return [4, omt.get(500)];
                case 3:
                    value2 = _a.sent();
                    chai.expect(value1).to.eql('hello world!');
                    chai.expect(value2).to.eql('wow cool tree guy!');
                    omt.db.close();
                    return [2];
            }
        });
    }); });
    it('should prove an entry', function () { return __awaiter(_this, void 0, void 0, function () {
        var omt, proof;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    omt = new omt_1.OrderedMerkleTree(dbPath);
                    return [4, omt.insertMany(defaultLeaves)];
                case 1:
                    _a.sent();
                    proof = omt_1.verifyProof(omt.proof(15));
                    chai.expect(proof).to.eql(true);
                    omt.db.close();
                    return [2];
            }
        });
    }); });
    it('should update a value', function () { return __awaiter(_this, void 0, void 0, function () {
        var omt, updated, proof;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    omt = new omt_1.OrderedMerkleTree(dbPath);
                    return [4, omt.insertMany(defaultLeaves)];
                case 1:
                    _a.sent();
                    return [4, omt.update(30, "hello")];
                case 2:
                    _a.sent();
                    return [4, omt.get(30)];
                case 3:
                    updated = _a.sent();
                    chai.expect(updated).to.eql("hello");
                    proof = omt.proof(30);
                    chai.expect(proof.node.value).to.eql('hello');
                    chai.expect(omt_1.verifyProof(proof)).to.eql(true);
                    omt.db.close();
                    return [2];
            }
        });
    }); });
    it('should falsify a modified proof', function () { return __awaiter(_this, void 0, void 0, function () {
        var omt, updated, proof;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    omt = new omt_1.OrderedMerkleTree(dbPath);
                    return [4, omt.insertMany(defaultLeaves)];
                case 1:
                    _a.sent();
                    return [4, omt.update(30, "hello")];
                case 2:
                    _a.sent();
                    return [4, omt.get(30)];
                case 3:
                    updated = _a.sent();
                    chai.expect(updated).to.eql("hello");
                    proof = omt.proof(30);
                    proof.node.value = 'bad proof node';
                    chai.expect(omt_1.verifyProof(proof)).to.eql(false);
                    omt.db.close();
                    return [2];
            }
        });
    }); });
});
