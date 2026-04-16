const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Problem = require('../models/Problem');

const problems = [

/* =========================
   1. TWO SUM
========================= */
{
title: "Two Sum",
description: "Given an array of integers, return indices of two numbers such that they add up to target.",
difficulty: "easy",
functionName: "twoSum",
driverTemplate: "array-int",
tags: ["array","hashmap"],

functionSignatures: {
javascript: `function twoSum(nums, target) {
    // Write your code here
};`,

python: `def twoSum(nums, target):
    # Write your code here
    pass`,

java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`,

cpp: `int* twoSum(int* nums, int n, int target) {
    // Write your code here
}`
},

sampleTestCases: [
{ input: "4\n2 7 11 15\n9", output: "0 1" },
{ input: "3\n3 2 4\n6", output: "1 2" }
],

testCases: [
{ input:"2\n3 3\n6", expectedOutput:"0 1", isHidden:true },
{ input:"5\n1 2 3 4 5\n9", expectedOutput:"3 4", isHidden:true },
{ input:"4\n0 4 3 0\n0", expectedOutput:"0 3", isHidden:true },
{ input:"6\n-1 -2 -3 -4 -5 -6\n-8", expectedOutput:"2 4", isHidden:true },
{ input:"3\n1 5 1\n2", expectedOutput:"0 2", isHidden:true },
{ input:"4\n2 5 5 11\n10", expectedOutput:"1 2", isHidden:true },
{ input:"5\n10 20 30 40 50\n90", expectedOutput:"3 4", isHidden:true },
{ input:"4\n1 3 4 2\n6", expectedOutput:"2 3", isHidden:true },
{ input:"3\n2 7 11\n9", expectedOutput:"0 1", isHidden:true },
{ input:"4\n5 75 25 10\n100", expectedOutput:"1 2", isHidden:true }
]
},

/* =========================
   2. ADD TWO NUMBERS
========================= */
{
title: "Add Two Numbers",
description: "Add two numbers represented by linked lists.",
difficulty: "medium",
functionName: "addTwoNumbers",
driverTemplate: "linked-list",
tags: ["linked-list"],

functionSignatures: {
javascript: `function addTwoNumbers(l1, l2) {
    // Write your code here
};`,

python: `def addTwoNumbers(l1, l2):
    # Write your code here
    pass`,

java: `/* 
ListNode format

class ListNode {
    int val;
    ListNode next;
    ListNode(int x){ val = x; }
}*/

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Write your code here
        return null;
    }
}`,

cpp: `/* ListNode format

struct ListNode {
    int val;
    struct ListNode* next;
};
createNode is already defined
struct ListNode* createNode(int val){
    struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
    node->val = val;
    node->next = NULL;
    return node;
}
*/

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"3\n2 4 3\n3\n5 6 4", output:"7 0 8" },
{ input:"1\n0\n1\n0", output:"0" }
],

testCases: [
{ input:"1\n9\n1\n1", expectedOutput:"0 1", isHidden:true },
{ input:"2\n9 9\n1\n1", expectedOutput:"0 0 1", isHidden:true },
{ input:"3\n1 8 3\n3\n7 1 6", expectedOutput:"8 9 9", isHidden:true },
{ input:"1\n5\n1\n5", expectedOutput:"0 1", isHidden:true },
{ input:"2\n0 1\n2\n0 1", expectedOutput:"0 2", isHidden:true },
{ input:"3\n2 4 9\n3\n5 6 4", expectedOutput:"7 0 4 1", isHidden:true },
{ input:"1\n1\n3\n9 9 9", expectedOutput:"0 0 0 1", isHidden:true },
{ input:"2\n5 6\n2\n5 4", expectedOutput:"0 1 1", isHidden:true },
{ input:"1\n0\n1\n7", expectedOutput:"7", isHidden:true },
{ input:"3\n9 9 9\n3\n9 9 9", expectedOutput:"8 9 9 1", isHidden:true }
]
},

/* =========================
   3. LONGEST SUBSTRING
========================= */
{
title: "Longest Substring Without Repeating Characters",
description: "Find length of longest substring without repeating characters.",
difficulty: "medium",
functionName: "lengthOfLongestSubstring",
driverTemplate: "string",
tags: ["string"],

functionSignatures: {
javascript: `function lengthOfLongestSubstring(s) {
    // Write your code here
};`,

python: `def lengthOfLongestSubstring(s):
    # Write your code here
    pass`,

java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }
}`,

cpp: `int lengthOfLongestSubstring(char* s) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"abcabcbb", output:"3" },
{ input:"bbbbb", output:"1" }
],

testCases: [
{ input:"pwwkew", expectedOutput:"3", isHidden:true },
{ input:"", expectedOutput:"0", isHidden:true },
{ input:"abcdef", expectedOutput:"6", isHidden:true },
{ input:"abba", expectedOutput:"2", isHidden:true },
{ input:"dvdf", expectedOutput:"3", isHidden:true },
{ input:"anviaj", expectedOutput:"5", isHidden:true },
{ input:"tmmzuxt", expectedOutput:"5", isHidden:true },
{ input:"aab", expectedOutput:"2", isHidden:true },
{ input:"abcdeafgh", expectedOutput:"8", isHidden:true },
{ input:"bbbbba", expectedOutput:"2", isHidden:true }
]
},

/* =========================
   4. MEDIAN
========================= */
{
title: "Median of Two Sorted Arrays",
description: "Find median of two sorted arrays.",
difficulty: "hard",
functionName: "findMedianSortedArrays",
driverTemplate: "two-arrays",
tags: ["binary-search"],

functionSignatures: {
javascript: `function findMedianSortedArrays(a, b) {
    // Write your code here
};`,

python: `def findMedianSortedArrays(a, b):
    # Write your code here
    pass`,

java: `class Solution {
    public double findMedianSortedArrays(int[] a, int[] b) {
        // Write your code here
        return 0.0;
    }
}`,

cpp: `double findMedianSortedArrays(vector<int>& a, int n, vector<int>& b, int m) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"2\n1 3\n1\n2", output:"2.000000" },
{ input:"2\n1 2\n2\n3 4", output:"2.500000" }
],

testCases: [
{ input:"1\n1\n1\n2", expectedOutput:"1.500000", isHidden:true },
{ input:"2\n1 3\n2\n2 4", expectedOutput:"2.500000", isHidden:true },
{ input:"3\n1 2 3\n3\n4 5 6", expectedOutput:"3.500000", isHidden:true },
{ input:"1\n0\n1\n0", expectedOutput:"0.000000", isHidden:true },
{ input:"2\n2 2\n2\n2 2", expectedOutput:"2.000000", isHidden:true },
{ input:"3\n1 3 5\n2\n2 4", expectedOutput:"3.000000", isHidden:true },
{ input:"2\n1 2\n3\n3 4 5", expectedOutput:"3.000000", isHidden:true },
{ input:"4\n1 2 3 4\n4\n5 6 7 8", expectedOutput:"4.500000", isHidden:true },
{ input:"1\n100\n1\n200", expectedOutput:"150.000000", isHidden:true },
{ input:"2\n-5 -3\n2\n-2 -1", expectedOutput:"-2.500000", isHidden:true }
]
},

/* =========================
   5. LONGEST PALINDROME
========================= */
{
title: "Longest Palindromic Substring",
description: "Find longest palindromic substring.",
difficulty: "medium",
functionName: "longestPalindrome",
driverTemplate: "inStringOpString",
tags: ["dp"],

functionSignatures: {
javascript: `function longestPalindrome(s) {
    // Write your code here
};`,

python: `def longestPalindrome(s):
    # Write your code here
    pass`,

java: `class Solution {
    public String longestPalindrome(String s) {
        // Write your code here
        return "";
    }
}`,

cpp: `char* longestPalindrome(char* s) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"babad", output:"bab" },
{ input:"cbbd", output:"bb" }
],

testCases: [
{ input:"a", expectedOutput:"a", isHidden:true },
{ input:"ac", expectedOutput:"a", isHidden:true },
{ input:"racecar", expectedOutput:"racecar", isHidden:true },
{ input:"abba", expectedOutput:"abba", isHidden:true },
{ input:"abcda", expectedOutput:"a", isHidden:true },
{ input:"forgeeksskeegfor", expectedOutput:"geeksskeeg", isHidden:true },
{ input:"abccba", expectedOutput:"abccba", isHidden:true },
{ input:"banana", expectedOutput:"anana", isHidden:true },
{ input:"abcd", expectedOutput:"a", isHidden:true },
{ input:"aaaabaaa", expectedOutput:"aaabaaa", isHidden:true }
]
}

];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");

        await Problem.deleteMany();
        console.log("Old problems removed");

        await Problem.insertMany(problems);
        console.log("Problems inserted successfully");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDB();