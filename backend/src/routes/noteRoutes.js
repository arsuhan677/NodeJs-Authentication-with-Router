const express = require("express")
const NoteController = require("../controllers/noteController");
const { jwtLogin } = require("../controllers/authController");

const router = express.Router()

// auth jsonwebtoken

router.post("/jwt", jwtLogin, NoteController.createNoteHandler);
router.get("/jwt", jwtLogin, NoteController.getNoteHandler)
router.put("/jwt/:id", jwtLogin, NoteController.updateNoteHandler)
router.delete("/jwt/:id", jwtLogin, NoteController.deleteNoteHandler)



module.exports = router;