const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

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
},

/* =========================
   5. FIRST UNIQUE CHARACTER
========================= */
{
title: "First Unique Character in a String",
description: "Given a string, find the index of the first non-repeating character. If none exists, return -1.",
difficulty: "easy",
functionName: "firstUniqChar",
driverTemplate: "string",
tags: ["string","hashmap"],

functionSignatures: {
javascript: `function firstUniqChar(s) {
    // Write your code here
};`,

python: `def firstUniqChar(s):
    # Write your code here
    pass`,

java: `class Solution {
    public int firstUniqChar(String s) {
        // Write your code here
        return -1;
    }
}`,

cpp: `int firstUniqChar(char* s) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"leetcode", output:"0" },
{ input:"loveleetcode", output:"2" }
],

testCases: [
{ input:"aabb", expectedOutput:"-1", isHidden:true },
{ input:"z", expectedOutput:"0", isHidden:true },
{ input:"aabbccdde", expectedOutput:"8", isHidden:true },
{ input:"abcdabcdx", expectedOutput:"8", isHidden:true },
{ input:"xxyz", expectedOutput:"2", isHidden:true },
{ input:"aaaaa", expectedOutput:"-1", isHidden:true },
{ input:"abac", expectedOutput:"1", isHidden:true },
{ input:"abab", expectedOutput:"-1", isHidden:true },
{ input:"tleetcode", expectedOutput:"0", isHidden:true },
{ input:"ppqqrrssst", expectedOutput:"9", isHidden:true }
]
},

/* =========================
   6. MAX NESTING DEPTH
========================= */
{
title: "Maximum Nesting Depth of Parentheses",
description: "Given a valid parentheses string, return the maximum nesting depth.",
difficulty: "easy",
functionName: "maxDepth",
driverTemplate: "string",
tags: ["string","stack"],

functionSignatures: {
javascript: `function maxDepth(s) {
    // Write your code here
};`,

python: `def maxDepth(s):
    # Write your code here
    pass`,

java: `class Solution {
    public int maxDepth(String s) {
        // Write your code here
        return 0;
    }
}`,

cpp: `int maxDepth(char* s) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"(1+(2*3)+((8)/4))+1", output:"3" },
{ input:"(1)+((2))+(((3)))", output:"3" }
],

testCases: [
{ input:"()", expectedOutput:"1", isHidden:true },
{ input:"(())", expectedOutput:"2", isHidden:true },
{ input:"(((())))", expectedOutput:"4", isHidden:true },
{ input:"", expectedOutput:"0", isHidden:true },
{ input:"(()())", expectedOutput:"2", isHidden:true },
{ input:"((1))", expectedOutput:"2", isHidden:true },
{ input:"(a(b(c(d)e)f)g)", expectedOutput:"4", isHidden:true },
{ input:"()()()", expectedOutput:"1", isHidden:true },
{ input:"((())())", expectedOutput:"3", isHidden:true },
{ input:"((((((x))))))", expectedOutput:"6", isHidden:true }
]
},

/* =========================
   7. REVERSE STRING
========================= */
{
title: "Reverse String",
description: "Given a string, return its reverse.",
difficulty: "easy",
functionName: "reverseString",
driverTemplate: "inStringOpString",
tags: ["string"],

functionSignatures: {
javascript: `function reverseString(s) {
    // Write your code here
};`,

python: `def reverseString(s):
    # Write your code here
    pass`,

java: `class Solution {
    public String reverseString(String s) {
        // Write your code here
        return "";
    }
}`,

cpp: `char* reverseString(char* s) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"hello", output:"olleh" },
{ input:"abcd", output:"dcba" }
],

testCases: [
{ input:"a", expectedOutput:"a", isHidden:true },
{ input:"racecar", expectedOutput:"racecar", isHidden:true },
{ input:"xyz", expectedOutput:"zyx", isHidden:true },
{ input:"CodeArena", expectedOutput:"anerAedoC", isHidden:true },
{ input:"12345", expectedOutput:"54321", isHidden:true },
{ input:"aaaa", expectedOutput:"aaaa", isHidden:true },
{ input:"ab", expectedOutput:"ba", isHidden:true },
{ input:"zZ", expectedOutput:"Zz", isHidden:true },
{ input:"monaco", expectedOutput:"ocanom", isHidden:true },
{ input:"docker", expectedOutput:"rekcod", isHidden:true }
]
},

/* =========================
   8. REMOVE ADJ DUPLICATES
========================= */
{
title: "Remove All Adjacent Duplicates in String",
description: "Repeatedly remove adjacent duplicate characters until no duplicates remain.",
difficulty: "medium",
functionName: "removeDuplicates",
driverTemplate: "inStringOpString",
tags: ["string","stack"],

functionSignatures: {
javascript: `function removeDuplicates(s) {
    // Write your code here
};`,

python: `def removeDuplicates(s):
    # Write your code here
    pass`,

java: `class Solution {
    public String removeDuplicates(String s) {
        // Write your code here
        return "";
    }
}`,

cpp: `char* removeDuplicates(char* s) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"abbaca", output:"ca" },
{ input:"azxxzy", output:"ay" }
],

testCases: [
{ input:"a", expectedOutput:"a", isHidden:true },
{ input:"aa", expectedOutput:"", isHidden:true },
{ input:"abba", expectedOutput:"", isHidden:true },
{ input:"abcd", expectedOutput:"abcd", isHidden:true },
{ input:"aabcca", expectedOutput:"ba", isHidden:true },
{ input:"mississippi", expectedOutput:"m", isHidden:true },
{ input:"cccc", expectedOutput:"", isHidden:true },
{ input:"abccba", expectedOutput:"", isHidden:true },
{ input:"aabbccdde", expectedOutput:"e", isHidden:true },
{ input:"xyzzzy", expectedOutput:"xyy", isHidden:true }
]
},

/* =========================
   9. COUNT VOWELS
========================= */
{
title: "Count Vowels",
description: "Given a string, return the number of vowels (a,e,i,o,u) in it.",
difficulty: "easy",
functionName: "countVowels",
driverTemplate: "string",
tags: ["string"],

functionSignatures: {
javascript: `function countVowels(s) {
    // Write your code here
};`,

python: `def countVowels(s):
    # Write your code here
    pass`,

java: `class Solution {
    public int countVowels(String s) {
        // Write your code here
        return 0;
    }
}`,

cpp: `int countVowels(char* s) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"leetcode", output:"4" },
{ input:"xyz", output:"0" }
],

testCases: [
{ input:"aeiou", expectedOutput:"5", isHidden:true },
{ input:"AEIOU", expectedOutput:"5", isHidden:true },
{ input:"bcd", expectedOutput:"0", isHidden:true },
{ input:"aA", expectedOutput:"2", isHidden:true },
{ input:"CodeArena", expectedOutput:"5", isHidden:true },
{ input:"monaco", expectedOutput:"3", isHidden:true },
{ input:"docker", expectedOutput:"2", isHidden:true },
{ input:"queue", expectedOutput:"4", isHidden:true },
{ input:"rhythm", expectedOutput:"0", isHidden:true },
{ input:"education", expectedOutput:"5", isHidden:true }
]
},

/* =========================
   10. MERGE TWO SORTED LISTS
========================= */
{
title: "Merge Two Sorted Lists",
description: "Merge two sorted linked lists and return it as a sorted list.",
difficulty: "easy",
functionName: "mergeTwoLists",
driverTemplate: "linked-list",
tags: ["linked-list"],

functionSignatures: {
javascript: `function mergeTwoLists(l1, l2) {
    // Write your code here
};`,

python: `def mergeTwoLists(l1, l2):
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
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
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

struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"3\n1 2 4\n3\n1 3 4", output:"1 1 2 3 4 4" },
{ input:"0\n\n0\n", output:"" }
],

testCases: [
{ input:"1\n0\n1\n0", expectedOutput:"0 0", isHidden:true },
{ input:"2\n1 1\n1\n2", expectedOutput:"1 1 2", isHidden:true },
{ input:"3\n-3 -1 2\n2\n-2 4", expectedOutput:"-3 -2 -1 2 4", isHidden:true },
{ input:"5\n1 2 3 4 5\n0\n", expectedOutput:"1 2 3 4 5", isHidden:true },
{ input:"0\n\n4\n1 2 3 4", expectedOutput:"1 2 3 4", isHidden:true },
{ input:"3\n1 3 5\n3\n2 4 6", expectedOutput:"1 2 3 4 5 6", isHidden:true },
{ input:"1\n7\n2\n7 7", expectedOutput:"7 7 7", isHidden:true },
{ input:"2\n1 2\n2\n3 4", expectedOutput:"1 2 3 4", isHidden:true },
{ input:"2\n2 2\n2\n2 2", expectedOutput:"2 2 2 2", isHidden:true },
{ input:"3\n1 10 20\n3\n2 3 4", expectedOutput:"1 2 3 4 10 20", isHidden:true }
]
},

/* =========================
   11. AVERAGE OF TWO ARRAYS
========================= */
{
title: "Average of Two Arrays",
description: "Given two arrays, return the average of all elements.",
difficulty: "easy",
functionName: "averageTwoArrays",
driverTemplate: "two-arrays",
tags: ["math","array"],

functionSignatures: {
javascript: `function averageTwoArrays(a, b) {
    // Write your code here
};`,

python: `def averageTwoArrays(a, b):
    # Write your code here
    pass`,

java: `class Solution {
    public double averageTwoArrays(int[] a, int[] b) {
        // Write your code here
        return 0.0;
    }
}`,

cpp: `double averageTwoArrays(vector<int>& a, int n, vector<int>& b, int m) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"3\n1 2 3\n3\n4 5 6", output:"3.500000" },
{ input:"1\n10\n1\n20", output:"15.000000" }
],

testCases: [
{ input:"2\n0 0\n2\n0 0", expectedOutput:"0.000000", isHidden:true },
{ input:"4\n1 1 1 1\n0\n", expectedOutput:"1.000000", isHidden:true },
{ input:"0\n\n3\n1 2 3", expectedOutput:"2.000000", isHidden:true },
{ input:"2\n-1 -1\n2\n1 1", expectedOutput:"0.000000", isHidden:true },
{ input:"5\n1 2 3 4 5\n1\n6", expectedOutput:"3.500000", isHidden:true },
{ input:"1\n100\n1\n200", expectedOutput:"150.000000", isHidden:true },
{ input:"3\n2 2 2\n3\n2 2 2", expectedOutput:"2.000000", isHidden:true },
{ input:"2\n1 2\n2\n3 4", expectedOutput:"2.500000", isHidden:true },
{ input:"3\n10 20 30\n2\n40 50", expectedOutput:"30.000000", isHidden:true },
{ input:"1\n-5\n1\n5", expectedOutput:"0.000000", isHidden:true }
]
},

/* =========================
   12. TWO SUM (SORTED ARRAY)
========================= */
{
title: "Two Sum (Sorted Array)",
description: "Given a sorted array of integers, return indices of two numbers such that they add up to target.",
difficulty: "easy",
functionName: "twoSumSorted",
driverTemplate: "array-int",
tags: ["array","two-pointers"],

functionSignatures: {
javascript: `function twoSumSorted(nums, target) {
    // Write your code here
};`,

python: `def twoSumSorted(nums, target):
    # Write your code here
    pass`,

java: `class Solution {
    public int[] twoSumSorted(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`,

cpp: `int* twoSumSorted(int* nums, int n, int target) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"4\n2 7 11 15\n9", output:"0 1" },
{ input:"5\n1 2 3 4 6\n10", output:"3 4" }
],

testCases: [
{ input:"2\n1 2\n3", expectedOutput:"0 1", isHidden:true },
{ input:"6\n-5 -3 -1 0 2 4\n-8", expectedOutput:"0 1", isHidden:true },
{ input:"5\n0 1 2 3 4\n4", expectedOutput:"0 4", isHidden:true },
{ input:"7\n1 1 2 2 3 3 4\n6", expectedOutput:"4 6", isHidden:true },
{ input:"4\n5 25 75 100\n125", expectedOutput:"1 3", isHidden:true },
{ input:"5\n1 2 3 9 10\n19", expectedOutput:"3 4", isHidden:true },
{ input:"6\n10 20 30 40 50 60\n110", expectedOutput:"4 5", isHidden:true },
{ input:"5\n1 2 5 6 7\n8", expectedOutput:"0 4", isHidden:true },
{ input:"3\n1 2 3\n5", expectedOutput:"1 2", isHidden:true },
{ input:"4\n2 3 4 5\n6", expectedOutput:"0 2", isHidden:true }
]
},

/* =========================
   13. LONGEST RUN OF SAME CHAR
========================= */
{
title: "Longest Run of Same Character",
description: "Given a string, return the length of the longest contiguous run of the same character.",
difficulty: "easy",
functionName: "longestRun",
driverTemplate: "string",
tags: ["string"],

functionSignatures: {
javascript: `function longestRun(s) {
    // Write your code here
};`,

python: `def longestRun(s):
    # Write your code here
    pass`,

java: `class Solution {
    public int longestRun(String s) {
        // Write your code here
        return 0;
    }
}`,

cpp: `int longestRun(char* s) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"aaabbccccd", output:"4" },
{ input:"abcd", output:"1" }
],

testCases: [
{ input:"", expectedOutput:"0", isHidden:true },
{ input:"a", expectedOutput:"1", isHidden:true },
{ input:"bbbbbb", expectedOutput:"6", isHidden:true },
{ input:"abbbbcc", expectedOutput:"4", isHidden:true },
{ input:"aabbaa", expectedOutput:"2", isHidden:true },
{ input:"112233333", expectedOutput:"5", isHidden:true },
{ input:"zzzyyyx", expectedOutput:"3", isHidden:true },
{ input:"ppqqqrrrr", expectedOutput:"4", isHidden:true },
{ input:"aaaaab", expectedOutput:"5", isHidden:true },
{ input:"aba", expectedOutput:"1", isHidden:true }
]
},

/* =========================
   14. SUM OF DIGITS
========================= */
{
title: "Sum of Digits",
description: "Given a non-negative integer represented as a string, return the sum of its digits.",
difficulty: "easy",
functionName: "sumOfDigits",
driverTemplate: "string",
tags: ["string","math"],

functionSignatures: {
javascript: `function sumOfDigits(s) {
    // Write your code here
};`,

python: `def sumOfDigits(s):
    # Write your code here
    pass`,

java: `class Solution {
    public int sumOfDigits(String s) {
        // Write your code here
        return 0;
    }
}`,

cpp: `int sumOfDigits(char* s) {
    // Write your code here
}`
},

sampleTestCases: [
{ input:"12345", output:"15" },
{ input:"0", output:"0" }
],

testCases: [
{ input:"999", expectedOutput:"27", isHidden:true },
{ input:"100000", expectedOutput:"1", isHidden:true },
{ input:"42", expectedOutput:"6", isHidden:true },
{ input:"111111", expectedOutput:"6", isHidden:true },
{ input:"808", expectedOutput:"16", isHidden:true },
{ input:"13579", expectedOutput:"25", isHidden:true },
{ input:"24680", expectedOutput:"20", isHidden:true },
{ input:"7007", expectedOutput:"14", isHidden:true },
{ input:"123456789", expectedOutput:"45", isHidden:true },
{ input:"5005", expectedOutput:"10", isHidden:true }
]
}

];

async function seedDB() {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/leetcode-clone";
        await mongoose.connect(mongoUri);
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