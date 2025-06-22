"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const JWT_PASSWORD = "!24435f";
const app = (0, express_1.default)();
const UsernewSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, { message: "atleast 3 character" }),
    password: zod_1.z.string().min(6, { message: "Atleast 6 charcter long" }),
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Signup
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = UsernewSchema.safeParse(req.body);
    if (!result.success) {
        res.status(404).json({
            msg: "Please enter valid credentials",
        });
        return;
    }
    const { username, password } = result.data;
    const existingUser = yield db_1.userModel.findOne({ username });
    if (existingUser) {
        res.status(404).json({
            msg: "User already exists",
        });
        return;
    }
    const newPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield db_1.userModel.create({
            username,
            password: newPassword,
        });
        res.status(200).json({
            msg: "User Signed Up Successfully",
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            msg: "Server error",
            error,
        });
        return;
    }
}));
// Signin
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = UsernewSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            msg: "Please enter valid credentials",
            error: result.error.format(),
        });
        return;
    }
    const { username, password } = result.data;
    const existingUser = yield db_1.userModel.findOne({ username });
    if (!existingUser) {
        res.status(403).json({
            msg: "User does not exist",
        });
        return;
    }
    //@ts-ignore
    const isValid = yield bcrypt_1.default.compare(password, existingUser.password);
    if (!isValid) {
        res.status(401).json({
            msg: "Invalid password",
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, JWT_PASSWORD);
    res.status(200).json({
        msg: "Login successful",
        token,
    });
    return;
}));
// Create content
app.post("/api/v1/content", middleware_1.UserMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    yield db_1.ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: [],
    });
    res.status(200).json({
        msg: "Content Added Successfully",
    });
    return;
}));
// Get content
app.get("/api/v1/content", middleware_1.UserMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield db_1.ContentModel.find({
        //@ts-ignore
        userId: req.userId,
    }).populate("userId", "username");
    res.status(200).json({
        content,
    });
    return;
}));
// Delete content
app.delete("/api/v1/content", middleware_1.UserMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId,
    });
    res.status(200).json({
        msg: "Deleted Content",
    });
    return;
}));
// Share brain
app.post("/api/v1/breain/share", middleware_1.UserMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userId,
        });
        if (existingLink) {
            res.status(200).json({
                hash: existingLink.hash,
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash,
        });
        res.status(200).json({
            msg: "/share/" + hash,
        });
        return;
    }
    else {
        yield db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId,
        });
        res.status(200).json({
            msg: "removed Link",
        });
        return;
    }
}));
// Get shared content
app.post("/api/v1/breain/share/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    const link = yield db_1.LinkModel.findOne({ hash });
    if (!link) {
        res.status(411).json({
            msg: "Sorry, link is invalid",
        });
        return;
    }
    const content = yield db_1.ContentModel.findOne({
        userId: link.userId,
    });
    const user = yield db_1.userModel.findById(link.userId);
    if (!user) {
        res.status(411).json({
            msg: "User not found — error should ideally not happen",
        });
        return;
    }
    res.status(200).json({
        username: user.username,
        content: content,
    });
    return;
}));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
