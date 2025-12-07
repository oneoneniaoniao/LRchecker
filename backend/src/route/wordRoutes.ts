import { Router } from "express";
import { WordController } from "@/interface/controller/wordController";
import { WordUseCase } from "@/application/usecase/WordUseCase";
import { wordRepository } from "@/infrastructure/repository/WordRepository";

const router = Router();
const wordUseCase = new WordUseCase(wordRepository);
const wordController = new WordController(wordUseCase);

router.get("/random", (req, res) => wordController.getRandom(req, res));

export default router;
