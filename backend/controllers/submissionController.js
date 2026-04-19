const Submission = require("../models/Submission");
const Problem = require("../models/Problem");
const User = require("../models/User");
const DriverTemplate = require("../models/DriverTemplate");
const { runBatch } = require("../services/dockerRunner");

// POST /api/submissions
const storeSubmission = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user._id;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    let status = "Accepted";
    let lastTime = "0";
    let lastMemory = "0";

    let executionCode = code;
    if (problem.driverTemplate) {
      const template = await DriverTemplate.findOne({ name: problem.driverTemplate });
      if (template && template.languages[language]) {
        executionCode = template.languages[language]
          .replace('USER_CODE', code)
          .replace(/FUNC/g, problem.functionName);
      }
    }

    const sampleCases = Array.isArray(problem.sampleTestCases)
      ? problem.sampleTestCases.map((tc) => ({
        input: tc.input || "",
        expectedOutput: typeof tc.output === "string" ? tc.output : "",
        isHidden: false,
      }))
      : [];

    const hiddenCases = Array.isArray(problem.testCases)
      ? problem.testCases.map((tc) => ({
        input: tc.input || "",
        expectedOutput: typeof tc.expectedOutput === "string" ? tc.expectedOutput : "",
        isHidden: tc.isHidden === true,
      }))
      : [];

    const allCases = [...sampleCases, ...hiddenCases];

    const batchResult = await runBatch(
      executionCode,
      language,
      allCases.map((tc) => tc.input)
    );

    const perCase = (batchResult.results || []).map((r, idx) => {
      const expected = (allCases[idx]?.expectedOutput || "").trim();
      const actual = (r.stdout || "").trim();
      const passed = actual === expected;

      lastTime = r.time || lastTime;
      lastMemory = r.memory || lastMemory;

      return {
        input: allCases[idx]?.input || "",
        expected,
        actual,
        passed,
        isHidden: allCases[idx]?.isHidden === true,
        status: r.status,
        time: r.time,
        memory: r.memory,
        stderr: r.stderr || "",
      };
    });

    const totalAllCount = perCase.length;
    const passedAllCount = perCase.filter((r) => r.passed).length;

    const compileError = batchResult.status?.description === "Compilation Error";
    if (compileError) {
      status = "Compilation Error";
    } else {
      const allPassed = perCase.length > 0 && perCase.every((r) => r.passed);
      status = allPassed ? "Accepted" : "Wrong Answer";
    }

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

    const sampleResultsOnly = perCase
      .filter((r) => !r.isHidden)
      .map((r) => ({
        input: r.input,
        expected: r.expected,
        actual: r.actual,
        passed: r.passed,
        status: r.status,
        time: r.time,
        memory: r.memory,
      }));

    const totalSampleCount = sampleResultsOnly.length;
    const passedSampleCount = sampleResultsOnly.filter((r) => r.passed).length;

    res.status(201).json({
      submission,
      summary: {
        passed: passedAllCount,
        total: totalAllCount,
        samplePassed: passedSampleCount,
        sampleTotal: totalSampleCount,
      },
      results: sampleResultsOnly,
    });
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

// GET /api/submissions/user/:userId/all
const getUserSubmissionsDetailed = async (req, res) => {
  try {
    const requestedUserId = req.params.userId;
    const currentUserId = req.user?._id?.toString();

    if (!currentUserId || currentUserId !== requestedUserId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const submissions = await Submission.find({ userId: requestedUserId })
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
  getUserSubmissionsDetailed,
  getProblemSubmissions,
};