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
const prisma = new PrismaClient();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/quotes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = req.query.page || 1;
    const listPerPage = 5;
    const offset = (Number(currentPage) - 1) * listPerPage;
    const allQuotes = yield prisma.quote.findMany({
        include: { author: true },
        skip: offset,
        take: listPerPage,
    });
    res.json({
        data: allQuotes,
        meta: { page: currentPage },
    });
}));
app.post('/quotes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorName = req.body.author;
    const quote = {
        quote: req.body.quote
    };
    if (!authorName || !quote.quote) {
        return res.status(400).json({ message: 'Either quote or author is missing' });
    }
    try {
        const message = 'quote created successfully';
        const author = yield prisma.author.findFirst({
            where: { name: authorName }
        });
        if (!author) {
            yield prisma.author.create({
                data: {
                    'name': authorName,
                    Quotes: {
                        create: quote
                    }
                }
            });
            console.log('Created author and then the related quote');
            return res.json({ message });
        }
        yield prisma.quote.create({
            data: {
                quote: quote.quote,
                author: { connect: { name: authorName } }
            }
        });
        console.log('Created quote for an existing author');
        return res.json({ message });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'something went wrong' });
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map