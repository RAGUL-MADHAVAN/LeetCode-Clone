const Submission = require("../models/Submission");
const Problem = require("../models/Problem");
const User = require("../models/User");
const { runCode } = require("../services/dockerRunner");

// POST /api/submissions
const storeSubmission = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user._id;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    let allPassed = true;
    let status = "Accepted";
    let lastTime = "0";
    let lastMemory = "0";

    const results = [];

    // Run code for each test case
    for (const testCase of problem.testCases) {
      const result = await runCode(code, language, testCase.input);

      const stdout = (result.stdout || "").trim();
      const expected = (testCase.expectedOutput || "").trim();

      const passed = stdout === expected;

      results.push({
        input: testCase.input,
        expected,
        actual: stdout,
        passed,
        status: result.status,
        time: result.time,
        memory: result.memory,
      });

      if (!passed) {
        allPassed = false;

        if (result.stderr && result.stderr.includes("error")) {
          status = "Compilation Error";
        } else {
          status = "Wrong Answer";
        }
      }

      lastTime = result.time || lastTime;
      lastMemory = result.memory || lastMemory;
    }

    if (allPassed) status = "Accepted";

    const submission = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status,
      runtime: `${lastTime} s`,
      memory: `${lastMemory} KB`,
    });

    // Mark problem as solved if accepted
    if (status === "Accepted") {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { solvedProblems: problemId },
      });
    }

    res.status(201).json({ submission, results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/submissions/user/:userId
const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.params.userId,
    })
      .populate("problemId", "title difficulty")
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/submissions/problem/:problemId
const getProblemSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      problemId: req.params.problemId,
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  storeSubmission,
  getUserSubmissions,
  getProblemSubmissions,
};