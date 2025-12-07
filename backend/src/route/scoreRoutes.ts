import { Router } from "express";
import { ScoreController } from "@/interface/controller/scoreController";
import { ScoreUseCase } from "@/application/usecase/ScoreUseCase";
import { scoreRepository } from "@/infrastructure/repository/ScoreRepository";

const router = Router();
const scoreUseCase = new ScoreUseCase(scoreRepository);
const scoreController = new ScoreController(scoreUseCase);

router.post("/", (req, res) => scoreController.saveScore(req, res));
router.get("/top", (req, res) => scoreController.getTopScores(req, res));

export default router;
