var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.user.findMany();
    console.log(data);
    res.json(data);
}));
app.get("/:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.key) {
        const data = yield prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: req.params.key,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: req.params.key,
                            mode: "insensitive",
                        },
                    }
                ],
            },
        });
        console.log(data);
        res.json(data);
    }
    return;
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}));
//# sourceMappingURL=index.js.map